#!/usr/bin/env node
/* 日本ガイドの英訳カバー率を数える（訳し漏れを黙って見逃さないための道具） */
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const D = new Function(fs.readFileSync(path.join(ROOT, "data/japan_shops.js"), "utf8") + "\n;return JAPAN_GUIDE_DATA;")();
const EN = new Function(fs.readFileSync(path.join(ROOT, "data/en/japan_shops.js"), "utf8") + "\n;return JAPAN_EN;")();
let prefs = 0, prefsEn = 0, shops = 0, shopsEn = 0;
const missingPrefs = [], missingShops = [];
D.regions.forEach(r => r.prefectures.forEach(p => {
  prefs++;
  if (EN.prefNotes[p.code]) prefsEn++; else missingPrefs.push(p.code);
  (p.shops || []).forEach(s => {
    shops++;
    if (EN.shops[p.code + "|" + s.name]) shopsEn++; else missingShops.push(p.code + "|" + s.name);
  });
}));
const types = new Set(), sts = new Set();
D.regions.forEach(r => r.prefectures.forEach(p => (p.shops || []).forEach(s => { types.add(s.type); sts.add(s.status); })));
const tMiss = [...types].filter(t => !EN.types[t]);
const sMiss = [...sts].filter(t => !EN.statuses[t]);
console.log(`都道府県ノート: ${prefsEn}/${prefs}  店: ${shopsEn}/${shops}  業態: ${types.size - tMiss.length}/${types.size}  営業状況: ${sts.size - sMiss.length}/${sts.size}`);
if (missingPrefs.length) console.log("未訳の県:", missingPrefs.join(", "));
if (tMiss.length) console.log("未訳の業態:", tMiss.join(" / "));
if (sMiss.length) console.log("未訳の営業状況:", sMiss.join(" / "));
if (missingShops.length) console.log(`未訳の店 ${missingShops.length}件（先頭20）:\n  ` + missingShops.slice(0, 20).join("\n  "));
process.exit(missingShops.length || missingPrefs.length ? 1 : 0);
