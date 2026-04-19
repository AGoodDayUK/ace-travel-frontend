"""
Compress oversized images in client/public using PIL.
Converts JPGs to WebP and re-compresses large WebPs.
Skips logos and maps (need crisp quality).
"""
import os
from PIL import Image
from pathlib import Path

PUBLIC_DIR = Path(__file__).parent.parent / "client" / "public"

# Max dimensions for hero/full-width images (1920px wide is plenty)
MAX_WIDTH = 1920
MAX_HEIGHT = 1200
WEBP_QUALITY = 82

# Files to skip (logos, maps — need crispness)
SKIP_PATTERNS = ["logo", "map", "favicon"]

def should_skip(name):
    name_lower = name.lower()
    return any(p in name_lower for p in SKIP_PATTERNS)

def compress_image(path: Path):
    if should_skip(path.name):
        print(f"  SKIP  {path.name}")
        return

    original_size = path.stat().st_size
    if original_size < 80_000:  # Already small enough
        print(f"  OK    {path.name} ({original_size//1024}KB — already small)")
        return

    try:
        img = Image.open(path)
        # Convert to RGB if needed (for RGBA PNGs etc)
        if img.mode in ("RGBA", "P", "LA"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")

        # Resize if too large
        w, h = img.size
        if w > MAX_WIDTH or h > MAX_HEIGHT:
            img.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.LANCZOS)
            print(f"  RESIZE {path.name}: {w}x{h} → {img.size[0]}x{img.size[1]}")

        # Save as WebP
        out_path = path.with_suffix(".webp")
        img.save(out_path, "WEBP", quality=WEBP_QUALITY, method=6)
        new_size = out_path.stat().st_size

        saving = original_size - new_size
        pct = int(saving / original_size * 100)
        print(f"  SAVED {path.name} → {out_path.name}: {original_size//1024}KB → {new_size//1024}KB (-{pct}%)")

        # Remove original if it was a JPG (we now have the WebP)
        if path.suffix.lower() in (".jpg", ".jpeg") and out_path != path:
            path.unlink()
            print(f"  DEL   {path.name}")

    except Exception as e:
        print(f"  ERROR {path.name}: {e}")

def main():
    images = sorted(PUBLIC_DIR.glob("*"))
    images = [f for f in images if f.suffix.lower() in (".jpg", ".jpeg", ".webp", ".png") and f.is_file()]
    print(f"Processing {len(images)} images in {PUBLIC_DIR}\n")
    for img in images:
        compress_image(img)
    print("\nDone.")

if __name__ == "__main__":
    main()
