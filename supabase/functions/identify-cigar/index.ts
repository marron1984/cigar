// ============================================================
//  identify-cigar — 葉巻の写真から銘柄・ブランド・産地・サイズを推定する
//  Supabase Edge Function（Deno）。外部ライブラリ不使用（fetchで直接呼び出し）。
//
//  ブラウザ（記録ノート）から写真（dataURL）を受け取り、Claude の
//  画像認識でバンド等を読み取って構造化した結果を返す。
//  ANTHROPIC_API_KEY は Supabase のシークレットとしてサーバー側に保管し、
//  ブラウザやリポジトリには絶対に置かないこと（VISION_SETUP.md 参照）。
//
//  デプロイ:  ダッシュボードのエディタに貼り付けて Deploy
//  シークレット: ダッシュボードの Edge Functions → Secrets に
//                ANTHROPIC_API_KEY を登録
// ============================================================

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });

// dataURL（"data:image/jpeg;base64,....."）を media_type と base64 データに分解
function parseDataUrl(s: string): { media_type: string; data: string } | null {
  const m = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([\s\S]+)$/.exec(s || "");
  if (!m) return null;
  return { media_type: m[1], data: m[2] };
}

// 認識結果のツールスキーマ（強制ツール使用で必ずこの形のJSONを得る）
const TOOL = {
  name: "record_cigar",
  description:
    "写真から読み取った葉巻の情報を記録する。読み取れない項目は空文字にする。推測で埋めない。",
  input_schema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description:
          "銘柄名（できるだけ具体的に。例: モンテクリスト No.4）。バンドの表記を優先。読めなければ空文字。",
      },
      brand: {
        type: "string",
        description: "ブランド（マルカ）名。例: モンテクリスト。読めなければ空文字。",
      },
      country: {
        type: "string",
        description:
          "産地（日本語）。allowed_countries のいずれかに一致させる。分からなければ空文字。",
      },
      vitola: {
        type: "string",
        description:
          "サイズ／ビトラ（日本語）。allowed_vitolas のいずれかに一致させる。写真だけでは断定しづらいので、自信がなければ空文字。",
      },
      strength: {
        type: "string",
        description:
          "強さ。ライト / ミディアムライト / ミディアム / ミディアムフル / フル のいずれか。分からなければ空文字。",
        enum: ["", "ライト", "ミディアムライト", "ミディアム", "ミディアムフル", "フル"],
      },
      band_readable: {
        type: "boolean",
        description: "バンド（ラベル）の文字が読み取れたかどうか。",
      },
      confidence: {
        type: "string",
        description: "全体的な確信度。",
        enum: ["high", "medium", "low"],
      },
      notes: {
        type: "string",
        description:
          "読み取りの根拠や不確実な点の短いメモ（日本語、1〜2文）。無ければ空文字。",
      },
    },
    required: ["name", "brand", "country", "vitola", "confidence"],
    additionalProperties: false,
  },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "POST で呼び出してください" }, 405);

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return json(
      { error: "サーバーに ANTHROPIC_API_KEY が設定されていません（管理者向け: Edge Functions の Secrets に登録してください）" },
      500,
    );
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "リクエスト本文（JSON）を読み取れませんでした" }, 400);
  }

  // ---- モード3: 翻訳（日本語の記録テキストを自然な英語にする） ----
  if (payload?.mode === "translate") {
    const text = String(payload.text || "").slice(0, 2000);
    if (!text) return json({ error: "翻訳するテキストが空です" }, 400);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({
          model: "claude-opus-4-8",
          max_tokens: 1024,
          system:
            "You translate a Japanese cigar tasting note into natural, fluent English. " +
            "Keep cigar brand names, marca names, and vitola/size names as they are normally written in English (romanize Japanese katakana brand names to their standard Latin spelling when known). " +
            "Preserve the line structure and any star rating. Output ONLY the English translation — no preamble, no notes, no quotation marks.",
          messages: [{ role: "user", content: text }],
        }),
      });
      const data: any = await resp.json().catch(() => null);
      if (!resp.ok) {
        const detail = data?.error?.message || "HTTP " + resp.status;
        return json({ error: "翻訳に失敗しました: " + detail }, 502);
      }
      const outText = (data?.content || []).filter((b: any) => b.type === "text").map((b: any) => b.text).join("").trim();
      if (!outText) return json({ error: "翻訳結果が空でした" }, 502);
      return json({ text: outText });
    } catch (err) {
      const msg = err && (err as any).message ? (err as any).message : String(err);
      return json({ error: "Anthropic API に接続できませんでした: " + msg }, 502);
    }
  }

  // ---- モード2: AI講評（テキストのみ。保存済みの記録に一言解説を付ける） ----
  if (payload?.mode === "comment") {
    const en = payload.entry || {};
    const info = [
      en.name ? `銘柄: ${en.name}` : "",
      en.brand ? `ブランド: ${en.brand}` : "",
      en.country ? `産地: ${en.country}` : "",
      en.vitola ? `サイズ: ${en.vitola}` : "",
      en.strength ? `強さ: ${en.strength}` : "",
      en.rating ? `本人の評価: ★${en.rating}/5` : "",
      en.price ? `価格: ¥${en.price}` : "",
      en.note ? `本人の感想メモ: ${String(en.note).slice(0, 400)}` : "",
    ].filter(Boolean).join("\n");
    if (!info) return json({ error: "記録の内容が空です" }, 400);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-opus-4-8",
          max_tokens: 400,
          system:
            "あなたは葉巻に非常に詳しい、温かみのあるソムリエです。愛好家の喫煙記録を読み、" +
            "その銘柄の背景・味わいの特徴に触れつつ、記録者の感想に寄り添う短い講評を日本語で書きます。" +
            "最後に「次の一本」のおすすめを1銘柄だけ添えてください。全体で2〜3文、120字以内。" +
            "確実に知っていることだけを述べ、不確かな断定はしないこと。",
          messages: [{ role: "user", content: "この喫煙記録に講評をお願いします。\n\n" + info }],
        }),
      });
      const data: any = await resp.json().catch(() => null);
      if (!resp.ok) {
        const detail = data?.error?.message || "HTTP " + resp.status;
        return json({ error: "講評の生成に失敗しました: " + detail }, 502);
      }
      const text = (data?.content || []).filter((b: any) => b.type === "text").map((b: any) => b.text).join("").trim();
      if (!text) return json({ error: "講評を生成できませんでした" }, 502);
      return json({ comment: text });
    } catch (err) {
      const msg = err && (err as any).message ? (err as any).message : String(err);
      return json({ error: "Anthropic API に接続できませんでした: " + msg }, 502);
    }
  }

  const img = parseDataUrl(payload?.image || "");
  if (!img) {
    return json({ error: "画像（dataURL）が正しく渡されていません" }, 400);
  }

  const countries: string[] = Array.isArray(payload?.countries) ? payload.countries.slice(0, 60) : [];
  const vitolas: string[] = Array.isArray(payload?.vitolas) ? payload.vitolas.slice(0, 80) : [];
  const brands: string[] = Array.isArray(payload?.brands) ? payload.brands.slice(0, 400) : [];

  const guide = [
    countries.length ? `allowed_countries（産地はこの中から選ぶ）: ${countries.join(" / ")}` : "",
    vitolas.length ? `allowed_vitolas（サイズはこの中から選ぶ）: ${vitolas.join(" / ")}` : "",
    brands.length ? `known_brands（ブランド名の表記はできるだけこれに合わせる）: ${brands.join(" / ")}` : "",
  ].filter(Boolean).join("\n");

  const system =
    "あなたは葉巻（シガー）に非常に詳しい鑑定士です。渡された写真（多くはバンド＝ラベル、または本体）を見て、" +
    "銘柄・ブランド・産地・サイズ（ビトラ）を可能な範囲で特定します。\n" +
    "重要な原則:\n" +
    "・写真から確実に読み取れる情報だけを答える。読めない項目は空文字にし、推測で埋めない。\n" +
    "・バンドの文字（ブランド名・銘柄名）を最優先で読む。\n" +
    "・サイズ（ビトラ）は、基準となる物差しが写っていない写真だけでは断定が難しい。バンド表記や既知の銘柄から判断できる場合のみ答え、それ以外は空文字にする。\n" +
    "・産地とサイズは必ず allowed_* のいずれかの表記に合わせる（一致するものが無ければ空文字）。\n" +
    "・出力は必ず record_cigar ツールで返す。";

  const body = {
    model: "claude-opus-4-8",
    max_tokens: 1024,
    system,
    tools: [TOOL],
    tool_choice: { type: "tool", name: "record_cigar" },
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: img.media_type, data: img.data },
          },
          {
            type: "text",
            text:
              "この葉巻の写真から、銘柄・ブランド・産地・サイズ（ビトラ）を読み取って record_cigar で記録してください。" +
              (guide ? "\n\n" + guide : ""),
          },
        ],
      },
    ],
  };

  let resp: Response;
  try {
    resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    const msg = err && (err as any).message ? (err as any).message : String(err);
    return json({ error: "Anthropic API に接続できませんでした: " + msg }, 502);
  }

  const data: any = await resp.json().catch(() => null);
  if (!resp.ok) {
    const detail = data && data.error && data.error.message ? data.error.message : "HTTP " + resp.status;
    return json({ error: "画像認識に失敗しました: " + detail }, 502);
  }

  const block = (data?.content || []).find((b: any) => b.type === "tool_use");
  if (!block) {
    return json({ error: "写真から情報を読み取れませんでした" }, 502);
  }
  const out = block.input || {};
  return json({
    name: out.name || "",
    brand: out.brand || "",
    country: out.country || "",
    vitola: out.vitola || "",
    strength: out.strength || "",
    band_readable: !!out.band_readable,
    confidence: out.confidence || "low",
    notes: out.notes || "",
  });
});
