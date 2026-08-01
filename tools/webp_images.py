#!/usr/bin/env python3
# ============================================================
# assets/ の写真PNGをWebPに変換する
# ------------------------------------------------------------
# 写真をPNGで置くとファイルが2MB前後になる（PNGは写真に向かない）。
# WebPなら見た目を保ったまま1/10以下になるので、大きいPNGを見つけて
# 変換し、置き換え済みの元PNGを消す。
#
# ・対象：assets/ 直下の 300KB を超える PNG
# ・図版（文字の多い anatomy-guide / gauge-size-chart）は質を高めに
# ・ロゴ・ファビコンは対象外（小さく、PNGのままでよい）
# ・変換だけを行う。HTMLやJSの参照の書き換えは行わないので、
#   新しい画像を足したときは参照側も .webp にすること
#
# 使い方：  python3 tools/webp_images.py          … 変換して元PNGを削除
#           python3 tools/webp_images.py --keep   … 元PNGを残す
# ============================================================
import os, sys, glob
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")
KEEP = "--keep" in sys.argv
SKIP = {"logo.png", "favicon-32.png"}          # 小物はPNGのまま
HIGH_Q = {"anatomy-guide.png", "gauge-size-chart.png"}   # 文字の多い図版

total_before = total_after = 0
for src in sorted(glob.glob(os.path.join(ASSETS, "*.png"))):
    name = os.path.basename(src)
    size = os.path.getsize(src)
    if name in SKIP or size < 300 * 1024:
        continue
    dst = src[:-4] + ".webp"
    im = Image.open(src)
    im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
    q = 90 if name in HIGH_Q else 82
    im.save(dst, "WEBP", quality=q, method=6)
    out = os.path.getsize(dst)
    total_before += size
    total_after += out
    print(f"{size/1048576:6.2f}MB → {out/1024:6.0f}KB  (q{q})  {name}")
    if not KEEP:
        os.remove(src)

if total_before:
    print(f"\n合計 {total_before/1048576:.1f}MB → {total_after/1048576:.2f}MB"
          f"（{100 - total_after/total_before*100:.0f}%減）")
    if not KEEP:
        print("元のPNGは削除しました。参照側（index.html / js）は .webp を指すこと。")
else:
    print("変換するPNGはありませんでした。")
