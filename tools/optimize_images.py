#!/usr/bin/env python3
"""
Image Optimizer for Web (Enhanced)
-----------------------------------
Recursively optimizes images for fast web loading.
- Skips backup folders and already-optimized images
- Optionally creates thumbnails for gallery views
- Supports WebP generation with JPEG fallback

Usage:
    python optimize_images.py <folder_path>
    python optimize_images.py ../assets/img --max-width 800 --quality 85
    python optimize_images.py ../assets/img --thumbnails --thumb-width 400
"""

import os
import sys
import re
import shutil
import argparse
from pathlib import Path
from datetime import datetime

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is required. Install with: pip install Pillow")
    sys.exit(1)


# Supported image formats
SUPPORTED_FORMATS = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.tif'}

# Patterns to skip (backup folders, dated folders, thumbnails)
SKIP_PATTERNS = [
    r'^backup',           # backup_*, backup_originals_*
    r'_backup$',          # *_backup
    r'^\d{6}_',           # YYMMDD_* (e.g., 251126_realistic)
    r'^\d{8}_',           # YYYYMMDD_* (e.g., 20251212_backup)
    r'^_thumbs$',         # _thumbs folder (our thumbnail output)
]


def should_skip_folder(folder_name: str) -> bool:
    """Check if folder should be skipped based on naming patterns."""
    for pattern in SKIP_PATTERNS:
        if re.search(pattern, folder_name, re.IGNORECASE):
            return True
    return False


def is_thumbnail(filename: str) -> bool:
    """Check if file is already a thumbnail."""
    name = Path(filename).stem.lower()
    return name.endswith('_thumb') or name.endswith('_sm') or name.endswith('_preview')


def get_image_files_recursive(folder: Path, skip_thumbs: bool = True) -> list[tuple[Path, Path]]:
    """
    Get all supported image files recursively.
    Returns list of (file_path, relative_folder) tuples.
    """
    images = []

    for root, dirs, files in os.walk(folder):
        root_path = Path(root)
        rel_path = root_path.relative_to(folder)

        # Filter out folders to skip
        dirs[:] = [d for d in dirs if not should_skip_folder(d)]

        for file in files:
            file_path = root_path / file
            if file_path.suffix.lower() in SUPPORTED_FORMATS:
                # Skip existing thumbnails if requested
                if skip_thumbs and is_thumbnail(file):
                    continue
                images.append((file_path, rel_path))

    return sorted(images, key=lambda x: x[0])


def needs_optimization(image_path: Path, max_width: int, size_threshold_kb: int = 50) -> tuple[bool, str]:
    """
    Check if image needs optimization.
    Returns (needs_opt, reason).
    """
    try:
        file_size_kb = image_path.stat().st_size / 1024

        with Image.open(image_path) as img:
            width, height = img.size

            # Check if image is larger than max width
            if width > max_width:
                return True, f"width {width}px > {max_width}px"

            # Check if file is suspiciously large for its dimensions
            pixels = width * height
            bytes_per_pixel = (file_size_kb * 1024) / pixels if pixels > 0 else 0

            # JPEG should be ~0.5-2 bytes per pixel when optimized
            if image_path.suffix.lower() in {'.jpg', '.jpeg'} and bytes_per_pixel > 2.5:
                return True, f"high compression ratio ({bytes_per_pixel:.1f} bytes/pixel)"

            return False, "already optimized"

    except Exception as e:
        return True, f"error checking: {e}"


def optimize_image(
    image_path: Path,
    max_width: int = 800,
    quality: int = 85,
) -> dict:
    """
    Optimize a single image for web use.
    Returns dict with optimization results.
    """
    original_size = image_path.stat().st_size

    with Image.open(image_path) as img:
        original_dimensions = img.size

        # Convert color modes as needed
        if img.mode == 'RGBA' and image_path.suffix.lower() in {'.jpg', '.jpeg'}:
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        elif img.mode == 'P':
            img = img.convert('RGBA' if 'transparency' in img.info else 'RGB')
        elif img.mode not in ('RGB', 'RGBA', 'L'):
            img = img.convert('RGB')

        # Calculate new dimensions
        width, height = img.size
        if width > max_width:
            ratio = max_width / width
            new_width = max_width
            new_height = int(height * ratio)
            img = img.resize((new_width, new_height), Image.LANCZOS)
            resized = True
        else:
            new_width, new_height = width, height
            resized = False

        # Save with optimization
        suffix = image_path.suffix.lower()
        if suffix in {'.jpg', '.jpeg'}:
            save_kwargs = {
                'format': 'JPEG',
                'quality': quality,
                'optimize': True,
                'progressive': True,
            }
        elif suffix == '.png':
            save_kwargs = {
                'format': 'PNG',
                'optimize': True,
            }
            if img.mode == 'RGBA' and img.split()[3].getextrema() == (255, 255):
                img = img.convert('RGB')
        elif suffix == '.webp':
            save_kwargs = {
                'format': 'WEBP',
                'quality': quality,
                'method': 6,
            }
        else:
            if img.mode == 'RGBA':
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3])
                img = background
            save_kwargs = {
                'format': 'JPEG',
                'quality': quality,
                'optimize': True,
                'progressive': True,
            }

        img.save(image_path, **save_kwargs)

    new_size = image_path.stat().st_size

    return {
        'original_size': original_size,
        'new_size': new_size,
        'original_dimensions': original_dimensions,
        'new_dimensions': (new_width, new_height),
        'resized': resized,
        'savings_percent': (1 - new_size / original_size) * 100 if original_size > 0 else 0
    }


def create_thumbnail(
    image_path: Path,
    output_folder: Path,
    thumb_width: int = 400,
    quality: int = 80,
) -> dict:
    """
    Create a thumbnail version of an image.
    Returns dict with thumbnail info.
    """
    output_folder.mkdir(parents=True, exist_ok=True)

    # Generate thumbnail filename
    stem = image_path.stem
    suffix = image_path.suffix.lower()
    thumb_name = f"{stem}_thumb{suffix}"
    thumb_path = output_folder / thumb_name

    with Image.open(image_path) as img:
        original_dimensions = img.size
        width, height = img.size

        # Convert color modes
        if img.mode == 'RGBA' and suffix in {'.jpg', '.jpeg'}:
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        elif img.mode not in ('RGB', 'RGBA', 'L'):
            img = img.convert('RGB')

        # Resize to thumbnail
        if width > thumb_width:
            ratio = thumb_width / width
            new_width = thumb_width
            new_height = int(height * ratio)
            img = img.resize((new_width, new_height), Image.LANCZOS)
        else:
            new_width, new_height = width, height

        # Save thumbnail
        if suffix in {'.jpg', '.jpeg'}:
            img.save(thumb_path, format='JPEG', quality=quality, optimize=True, progressive=True)
        elif suffix == '.png':
            img.save(thumb_path, format='PNG', optimize=True)
        else:
            img.save(thumb_path, format='JPEG', quality=quality, optimize=True)

    return {
        'thumb_path': thumb_path,
        'original_dimensions': original_dimensions,
        'thumb_dimensions': (new_width, new_height),
        'thumb_size': thumb_path.stat().st_size,
    }


def format_size(size_bytes: int) -> str:
    """Format file size in human-readable format."""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"


def main():
    parser = argparse.ArgumentParser(
        description='Recursively optimize images for web use.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    python optimize_images.py ../assets/img
    python optimize_images.py ../assets/img --max-width 800 --quality 85
    python optimize_images.py ../assets/img --thumbnails --thumb-width 400
    python optimize_images.py ../assets/img --dry-run
        """
    )
    parser.add_argument('folder', type=str,
                        help='Path to folder containing images')
    parser.add_argument('--max-width', type=int, default=800,
                        help='Maximum width in pixels (default: 800)')
    parser.add_argument('--quality', type=int, default=85,
                        help='JPEG/WebP quality 1-100 (default: 85)')
    parser.add_argument('--thumbnails', action='store_true',
                        help='Also create thumbnail versions')
    parser.add_argument('--thumb-width', type=int, default=400,
                        help='Thumbnail width in pixels (default: 400)')
    parser.add_argument('--thumb-quality', type=int, default=80,
                        help='Thumbnail quality (default: 80)')
    parser.add_argument('--thumb-folder', type=str, default='_thumbs',
                        help='Subfolder name for thumbnails (default: _thumbs)')
    parser.add_argument('--force', action='store_true',
                        help='Process all images, even if already optimized')
    parser.add_argument('--dry-run', action='store_true',
                        help='Show what would be done without making changes')
    parser.add_argument('--no-backup', action='store_true',
                        help='Skip creating backup of original files')

    args = parser.parse_args()

    # Validate folder
    folder = Path(args.folder).resolve()
    if not folder.exists():
        print(f"Error: Folder '{folder}' does not exist.")
        sys.exit(1)
    if not folder.is_dir():
        print(f"Error: '{folder}' is not a directory.")
        sys.exit(1)

    # Validate arguments
    if not 1 <= args.quality <= 100:
        print("Error: Quality must be between 1 and 100.")
        sys.exit(1)
    if args.max_width < 1:
        print("Error: Max width must be at least 1 pixel.")
        sys.exit(1)

    # Find images
    images = get_image_files_recursive(folder)
    if not images:
        print(f"No supported images found in '{folder}'")
        print(f"Supported formats: {', '.join(sorted(SUPPORTED_FORMATS))}")
        sys.exit(0)

    print(f"\n{'='*60}")
    print(f"Image Optimizer for Web (Enhanced)")
    print(f"{'='*60}")
    print(f"Folder: {folder}")
    print(f"Images found: {len(images)}")
    print(f"Max width: {args.max_width}px")
    print(f"Quality: {args.quality}")
    print(f"Create thumbnails: {args.thumbnails}")
    if args.thumbnails:
        print(f"Thumbnail width: {args.thumb_width}px")
    print(f"Dry run: {args.dry_run}")
    print(f"{'='*60}\n")

    # Analyze images
    to_optimize = []
    already_optimized = []

    print("Analyzing images...")
    for img_path, rel_folder in images:
        if args.force:
            to_optimize.append((img_path, rel_folder, "forced"))
        else:
            needs_opt, reason = needs_optimization(img_path, args.max_width)
            if needs_opt:
                to_optimize.append((img_path, rel_folder, reason))
            else:
                already_optimized.append((img_path, rel_folder))

    print(f"  Need optimization: {len(to_optimize)}")
    print(f"  Already optimized: {len(already_optimized)}")
    print()

    if not to_optimize and not args.thumbnails:
        print("Nothing to do. All images are already optimized.")
        sys.exit(0)

    if args.dry_run:
        print("DRY RUN - No changes will be made\n")
        print("-" * 60)
        if to_optimize:
            print("Would optimize:")
            for img_path, rel_folder, reason in to_optimize:
                print(f"  {img_path.relative_to(folder)} ({reason})")
        if args.thumbnails:
            print(f"\nWould create thumbnails in {args.thumb_folder}/ subfolders")
        print("-" * 60)
        sys.exit(0)

    # Create backup if needed
    if to_optimize and not args.no_backup:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_folder = folder / f"backup_originals_{timestamp}"
        backup_folder.mkdir(exist_ok=True)
        print(f"Creating backup in: {backup_folder.name}/")
        for img_path, rel_folder, _ in to_optimize:
            backup_dest = backup_folder / rel_folder
            backup_dest.mkdir(parents=True, exist_ok=True)
            shutil.copy2(img_path, backup_dest / img_path.name)
        print(f"Backed up {len(to_optimize)} files.\n")

    # Process images
    total_original = 0
    total_new = 0
    optimized_count = 0
    thumb_count = 0

    print("Processing images...")
    print("-" * 60)

    for i, (img_path, rel_folder, reason) in enumerate(to_optimize, 1):
        try:
            result = optimize_image(img_path, args.max_width, args.quality)
            optimized_count += 1
            total_original += result['original_size']
            total_new += result['new_size']

            status = "resized" if result['resized'] else "optimized"
            dims = f"{result['new_dimensions'][0]}x{result['new_dimensions'][1]}"
            savings = f"{result['savings_percent']:.1f}%"

            print(f"[{i}/{len(to_optimize)}] {img_path.relative_to(folder)}")
            print(f"         {status} to {dims}, saved {savings}")

        except Exception as e:
            print(f"[{i}/{len(to_optimize)}] {img_path.relative_to(folder)}")
            print(f"         ERROR: {e}")

    # Create thumbnails
    if args.thumbnails:
        print("\n" + "-" * 60)
        print("Creating thumbnails...")
        print("-" * 60)

        all_images = to_optimize + [(p, f, None) for p, f in already_optimized]

        for i, (img_path, rel_folder, _) in enumerate(all_images, 1):
            try:
                # Put thumbnails in _thumbs subfolder within same directory
                thumb_folder = img_path.parent / args.thumb_folder
                result = create_thumbnail(img_path, thumb_folder, args.thumb_width, args.thumb_quality)
                thumb_count += 1

                dims = f"{result['thumb_dimensions'][0]}x{result['thumb_dimensions'][1]}"
                size = format_size(result['thumb_size'])

                print(f"[{i}/{len(all_images)}] {result['thumb_path'].relative_to(folder)} ({dims}, {size})")

            except Exception as e:
                print(f"[{i}/{len(all_images)}] {img_path.relative_to(folder)}")
                print(f"         THUMB ERROR: {e}")

    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Images optimized:    {optimized_count}/{len(to_optimize)}")
    if optimized_count > 0:
        print(f"Original total:      {format_size(total_original)}")
        print(f"Optimized total:     {format_size(total_new)}")
        print(f"Space saved:         {format_size(total_original - total_new)}")
        if total_original > 0:
            print(f"Reduction:           {(1 - total_new/total_original)*100:.1f}%")
    if args.thumbnails:
        print(f"Thumbnails created:  {thumb_count}")
    print("=" * 60 + "\n")


if __name__ == '__main__':
    main()
