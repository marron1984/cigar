#!/usr/bin/env python3
# ============================================================
#   ページごとのSNSカード画像を作る（assets/og/*.jpg）
#   ------------------------------------------------------------
#   SNSやチャットにリンクを貼ったとき、これまでは全ページ同じ1枚が出ていた。
#   そのページの写真とページ名を載せた画像を用意して、何のページか一目で
#   分かるようにする。
#
#   ・下敷きの写真は、そのページが本文で使っているものに合わせる
#     （使っていないページだけ、雰囲気の近いものを当てる）
#   ・1200×630 に切り抜き、下から暗いぼかしを重ねて文字を載せる
#   ・日本語版と英語版で、載せる題を変える
#
#   写真や題を変えたときだけ動かせばよい（ビルドのたびには走らせない）。
#     python3 tools/build_og.py
# ============================================================
import json, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets/og")
W, H = 1200, 630

CREAM = (247, 241, 231)
GOLD = (201, 149, 83)
INK = (26, 18, 11)

FONT_JA = "/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf"
FONT_EN = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
FONT_KICKER = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"

# ページ → 下敷きにする写真。本文で使っているものに合わせてある。
PHOTO = {
    "home":        "hero-welcome.webp",
    "basics":      "basics-hero.webp",
    "countries":   "Earth.webp",
    "sizes":       "Futosa.webp",
    "prices":      "hero-portrait.jpg",
    "tools":       "Cutter.webp",
    "humidor":     "Fumi.webp",
    "advanced":    "Factory.webp",
    "phd":         "Master.webp",
    "world":       "Town.webp",
    "brands":      "Cigar.webp",
    "note":        "Wakamono.webp",
    # 本文に写真を置いていないページ。雰囲気の近いものを当てる
    # （解説図は文字だらけでカードに向かないので使わない）。
    "japan":       "hero-lounge.webp",
    "news":        "hero-welcome.webp",
}


def page_meta():
    """data/pages.js から題を読む（node に評価させる）"""
    js = 'const fs=require("fs");' \
         'const M=new Function(fs.readFileSync("data/pages.js","utf8")+"\\n;return PAGE_META;")();' \
         'console.log(JSON.stringify(M));'
    out = subprocess.run(["/opt/node22/bin/node", "-e", js], cwd=ROOT,
                         capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def page_name(title):
    """「葉巻ブランド大全 — 世界の銘柄…｜Cigar Cafe」→「葉巻ブランド大全」"""
    t = re.split(r"[｜|]", title)[0]
    return re.split(r"\s+[—-]\s+", t)[0].strip()


def cover(im, w, h):
    """縦横比を保ったまま、はみ出す分を切り落として w×h に収める"""
    r = max(w / im.width, h / im.height)
    im = im.resize((max(w, round(im.width * r)), max(h, round(im.height * r))), Image.LANCZOS)
    left = (im.width - w) // 2
    top = int((im.height - h) * 0.34)          # やや上寄りで切る（本文の見せ方に合わせる）
    return im.crop((left, top, left + w, top + h))


def veil():
    """下から上へ、だんだん薄くなる暗い膜。文字を読めるようにするため。"""
    g = Image.new("L", (1, H))
    for y in range(H):
        t = y / (H - 1)
        g.putpixel((0, y), int(255 * min(1.0, 0.16 + 0.86 * (t ** 1.7))))
    return g.resize((W, H))


def wrap(draw, text, font, max_w):
    """日本語は文字単位、英語は語単位で折り返す"""
    if re.search(r"[぀-ヿ㐀-鿿]", text):
        lines, cur = [], ""
        for ch in text:
            if draw.textlength(cur + ch, font=font) > max_w and cur:
                lines.append(cur); cur = ch
            else:
                cur += ch
        if cur: lines.append(cur)
        return lines
    lines, cur = [], ""
    for word in text.split():
        t = (cur + " " + word).strip()
        if draw.textlength(t, font=font) > max_w and cur:
            lines.append(cur); cur = word
        else:
            cur = t
    if cur: lines.append(cur)
    return lines


def build(view, lang, title, photo):
    src = os.path.join(ROOT, "assets", photo)
    if not os.path.exists(src):
        print(f"  ! 写真が無い: {photo}（{view}/{lang}）"); return None
    base = cover(Image.open(src).convert("RGB"), W, H)
    dark = Image.new("RGB", (W, H), INK)
    base = Image.composite(dark, base, veil())
    base = base.filter(ImageFilter.GaussianBlur(0.4))

    d = ImageDraw.Draw(base)
    is_ja = lang == "ja"
    f_title = ImageFont.truetype(FONT_JA if is_ja else FONT_EN, 66 if is_ja else 72)
    f_kick = ImageFont.truetype(FONT_KICKER, 24)
    f_tag = ImageFont.truetype(FONT_JA if is_ja else FONT_KICKER, 24)

    pad = 74
    # 上：サイト名（字間を空けて小さく）
    kick = "CIGAR CAFE"
    x = pad
    for ch in kick:
        d.text((x, pad), ch, font=f_kick, fill=GOLD)
        x += d.textlength(ch, font=f_kick) + 6

    # 下：ページ名（長ければ折り返す。3行までに収める）
    lines = wrap(d, title, f_title, W - pad * 2)[:3]
    lh = (f_title.size + 18)
    tag = "葉巻をたのしむ" if is_ja else "Enjoy the cigar"
    y = H - pad - 34 - lh * len(lines)
    for ln in lines:
        d.text((pad, y), ln, font=f_title, fill=CREAM)
        y += lh
    d.text((pad, H - pad - 6), tag, font=f_tag, fill=(198, 186, 170))

    os.makedirs(OUT, exist_ok=True)
    name = f"{view}.jpg" if is_ja else f"{view}-en.jpg"
    path = os.path.join(OUT, name)
    base.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    return name, os.path.getsize(path)


def main():
    META = page_meta()
    made = total = 0
    for view, m in META.items():
        photo = PHOTO.get(view)
        if not photo:
            print(f"  ! 下敷きの写真を決めていない: {view}"); continue
        for lang in ("ja", "en"):
            r = build(view, lang, page_name(m[lang]["title"]), photo)
            if r:
                made += 1; total += r[1]
                print(f"  {r[0]:<18} {r[1] // 1024}KB")
    print(f"assets/og/ に {made}枚 作りました（合計 {total // 1024}KB）")


if __name__ == "__main__":
    main()
