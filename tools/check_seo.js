#!/usr/bin/env node
/* ============================================================
   公開まわりの取りこぼしを確かめる
   ------------------------------------------------------------
   ページを増やしたのに sitemap に載っていない、題が他ページと同じ、
   正規URLがずれている——といった、気づきにくい抜けを機械で見つける。

   確かめること：
   ・sitemap.xml のURLすべてに、実体のHTMLがある
   ・data/pages.js の全ページが sitemap に載っている（日英とも）
   ・題と説明文がページごとに違う（重複は検索順位を下げる）
   ・canonical が自分自身を指している
   ・hreflang が日英で互いを指し合っている
   ・robots.txt が sitemap を案内している

   使い方： /opt/node22/bin/node tools/check_seo.js
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://cigar.cafe";
const META = new Function(fs.readFileSync(path.join(ROOT, "data/pages.js"), "utf8") + "\n;return PAGE_META;")();

const problems = [];
const bad = (m) => problems.push(m);
const pick = (html, re) => { const m = re.exec(html); return m ? m[1] : null; };

/* ---------- sitemap.xml ---------- */
const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const want = [];
for (const view of Object.keys(META)) {
  const p = META[view].path;
  want.push(SITE + "/" + (p ? p + "/" : ""));
  want.push(SITE + "/en/" + (p ? p + "/" : ""));
}
want.forEach(u => { if (!locs.includes(u)) bad(`sitemap.xml に ${u} がありません`); });
locs.forEach(u => { if (!want.includes(u)) bad(`sitemap.xml に見覚えのないURL: ${u}`); });

/* ---------- 各ページの実体と head ---------- */
const titles = new Map(), descs = new Map();
for (const u of locs) {
  const rel = u.replace(SITE + "/", "");
  const file = path.join(ROOT, rel, "index.html");
  if (!fs.existsSync(file)) { bad(`${u} の実体がありません（${path.relative(ROOT, file)}）`); continue; }
  const html = fs.readFileSync(file, "utf8");

  const title = pick(html, /<title>([^<]*)<\/title>/);
  const desc = pick(html, /<meta name="description" content="([^"]*)"/);
  const canon = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const hrefJa = pick(html, /<link rel="alternate" hreflang="ja" href="([^"]*)"/);
  const hrefEn = pick(html, /<link rel="alternate" hreflang="en" href="([^"]*)"/);
  const ogUrl = pick(html, /<meta property="og:url" content="([^"]*)"/);
  const ogImg = pick(html, /<meta property="og:image" content="([^"]*)"/);

  if (!title) bad(`${u}: <title> がありません`);
  if (!desc) bad(`${u}: description がありません`);
  if (canon !== u) bad(`${u}: canonical が ${canon}`);
  if (ogUrl !== u) bad(`${u}: og:url が ${ogUrl}`);
  const isEn = rel.startsWith("en/");
  const pairJa = isEn ? u.replace("/en/", "/") : u;
  const pairEn = isEn ? u : u.replace(SITE + "/", SITE + "/en/");
  if (hrefJa !== pairJa) bad(`${u}: hreflang=ja が ${hrefJa}（期待 ${pairJa}）`);
  if (hrefEn !== pairEn) bad(`${u}: hreflang=en が ${hrefEn}（期待 ${pairEn}）`);
  const wantImg = SITE + (isEn ? "/assets/og-en.jpg" : "/assets/og.jpg");
  if (ogImg !== wantImg) bad(`${u}: og:image が ${ogImg}`);
  if (!fs.existsSync(path.join(ROOT, wantImg.replace(SITE + "/", "")))) bad(`共有画像がありません: ${wantImg}`);

  if (title) { if (titles.has(title)) bad(`題が重複: ${u} と ${titles.get(title)}`); else titles.set(title, u); }
  if (desc) { if (descs.has(desc)) bad(`説明文が重複: ${u} と ${descs.get(desc)}`); else descs.set(desc, u); }
}

/* ---------- index.html のメニューのリンク先 ----------
   メニューは手書きなので、data/pages.js の道筋を変えたときに直し忘れやすい。
   <a data-view="…"> の href が対応表とずれていないか確かめる。 */
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
for (const m of indexHtml.matchAll(/<a\s+href="([^"]+)"[^>]*data-view="([a-z]+)"|<a[^>]*data-view="([a-z]+)"[^>]*href="([^"]+)"/g)) {
  const href = m[1] || m[4], view = m[2] || m[3];
  if (!META[view]) { bad(`index.html: data-view="${view}" は data/pages.js にありません`); continue; }
  const wantHref = META[view].path ? META[view].path + "/" : "./";
  if (href !== wantHref) bad(`index.html: ${view} のリンク先が "${href}"（期待 "${wantHref}"）`);
}

/* ---------- robots.txt ---------- */
const robots = fs.readFileSync(path.join(ROOT, "robots.txt"), "utf8");
if (!robots.includes(SITE + "/sitemap.xml")) bad("robots.txt が sitemap.xml を案内していません");

/* ---------- 結果 ---------- */
if (problems.length) {
  console.log(`公開まわりの問題 ${problems.length}件:`);
  problems.forEach(p => console.log("  ✗ " + p));
  process.exit(1);
}
console.log(`公開まわり: 問題なし（${locs.length}ページ / 題も説明文もすべて固有）`);
