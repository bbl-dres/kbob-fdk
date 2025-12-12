#!/usr/bin/env python3
"""
Image Optimizer for Web
-----------------------
Resizes images to a maximum width and optimizes for fast web loading.
Creates backups of original files before processing.

Usage:
    python optimize_images.py
    python optimize_images.py <folder_path> [--max-width 800] [--quality 85]
"""

import os
import sys
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


def create_backup_folder(source_folder: Path) -> Path:
    """Create a timestamped backup subfolder."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_folder = source_folder / f"backup_originals_{timestamp}"
    backup_folder.mkdir(exist_ok=True)
    return backup_folder


def get_image_files(folder: Path) -> list[Path]:
    """Get all supported image files in the folder (non-recursive)."""
    images = []
    for file in folder.iterdir():
        if file.is_file() and file.suffix.lower() in SUPPORTED_FORMATS:
            images.append(file)
    return sorted(images)


def optimize_image(
    image_path: Path,
    max_width: int = 800,
    quality: int = 85,
    convert_to_webp: bool = False
) -> dict:
    """
    Optimize a single image for web use.
    
    Returns dict with optimization results.
    """
    original_size = image_path.stat().st_size
    
    with Image.open(image_path) as img:
        original_dimensions = img.size
        
        # Convert RGBA to RGB for JPEG (preserve alpha for PNG/WebP)
        if img.mode == 'RGBA' and image_path.suffix.lower() in {'.jpg', '.jpeg'}:
            # Create white background and paste image
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        elif img.mode == 'P':
            # Convert palette mode to RGB/RGBA
            img = img.convert('RGBA' if 'transparency' in img.info else 'RGB')
        elif img.mode not in ('RGB', 'RGBA', 'L'):
            img = img.convert('RGB')
        
        # Calculate new dimensions (maintain aspect ratio)
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
        
        # Determine output format and settings
        suffix = image_path.suffix.lower()
        save_kwargs = {}
        
        if suffix in {'.jpg', '.jpeg'}:
            save_kwargs = {
                'format': 'JPEG',
                'quality': quality,
                'optimize': True,
                'progressive': True,  # Progressive JPEG for faster perceived loading
            }
        elif suffix == '.png':
            # For PNG, use compression but maintain quality
            save_kwargs = {
                'format': 'PNG',
                'optimize': True,
            }
            # If no transparency, convert to RGB for smaller size
            if img.mode == 'RGBA':
                # Check if image actually uses transparency
                if img.split()[3].getextrema() == (255, 255):
                    img = img.convert('RGB')
        elif suffix == '.webp':
            save_kwargs = {
                'format': 'WEBP',
                'quality': quality,
                'method': 6,  # Highest compression effort
            }
        elif suffix == '.gif':
            save_kwargs = {
                'format': 'GIF',
                'optimize': True,
            }
        else:
            # Convert other formats to JPEG
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
        
        # Save optimized image
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


def format_size(size_bytes: int) -> str:
    """Format file size in human-readable format."""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"


def main():
    parser = argparse.ArgumentParser(
        description='Optimize images for web use with backup.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    python optimize_images.py
    python optimize_images.py ./photos
    python optimize_images.py ./images --max-width 1200 --quality 80
    python optimize_images.py ./assets --no-backup
        """
    )
    parser.add_argument('folder', type=str, nargs='?', default=None,
                        help='Path to folder containing images (default: script location)')
    parser.add_argument('--max-width', type=int, default=800, 
                        help='Maximum width in pixels (default: 800)')
    parser.add_argument('--quality', type=int, default=85,
                        help='JPEG/WebP quality 1-100 (default: 85)')
    parser.add_argument('--no-backup', action='store_true',
                        help='Skip creating backup of original files')
    
    args = parser.parse_args()
    
    # Validate arguments
    if args.folder is None:
        # Default to the folder where the script is located
        folder = Path(__file__).parent.resolve()
    else:
        folder = Path(args.folder).resolve()
    if not folder.exists():
        print(f"Error: Folder '{folder}' does not exist.")
        sys.exit(1)
    if not folder.is_dir():
        print(f"Error: '{folder}' is not a directory.")
        sys.exit(1)
    
    if not 1 <= args.quality <= 100:
        print("Error: Quality must be between 1 and 100.")
        sys.exit(1)
    
    if args.max_width < 1:
        print("Error: Max width must be at least 1 pixel.")
        sys.exit(1)
    
    # Find images
    images = get_image_files(folder)
    if not images:
        print(f"No supported images found in '{folder}'")
        print(f"Supported formats: {', '.join(sorted(SUPPORTED_FORMATS))}")
        sys.exit(0)
    
    print(f"\n{'='*60}")
    print(f"Image Optimizer for Web")
    print(f"{'='*60}")
    print(f"Folder: {folder}")
    print(f"Images found: {len(images)}")
    print(f"Max width: {args.max_width}px")
    print(f"Quality: {args.quality}")
    print(f"{'='*60}\n")
    
    # Create backup
    if not args.no_backup:
        backup_folder = create_backup_folder(folder)
        print(f"Creating backup in: {backup_folder.name}/")
        for img_path in images:
            shutil.copy2(img_path, backup_folder / img_path.name)
        print(f"Backed up {len(images)} files.\n")
    
    # Process images
    total_original = 0
    total_new = 0
    results = []
    
    print("Optimizing images...")
    print("-" * 60)
    
    for i, img_path in enumerate(images, 1):
        try:
            result = optimize_image(img_path, args.max_width, args.quality)
            results.append((img_path.name, result))
            total_original += result['original_size']
            total_new += result['new_size']
            
            status = "resized" if result['resized'] else "optimized"
            dims = f"{result['new_dimensions'][0]}x{result['new_dimensions'][1]}"
            savings = f"{result['savings_percent']:.1f}%"
            
            print(f"[{i}/{len(images)}] {img_path.name}")
            print(f"         {status} to {dims}, saved {savings}")
            
        except Exception as e:
            print(f"[{i}/{len(images)}] {img_path.name}")
            print(f"         ERROR: {e}")
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Images processed: {len(results)}/{len(images)}")
    print(f"Original total:   {format_size(total_original)}")
    print(f"Optimized total:  {format_size(total_new)}")
    print(f"Total saved:      {format_size(total_original - total_new)}")
    if total_original > 0:
        print(f"Reduction:        {(1 - total_new/total_original)*100:.1f}%")
    if not args.no_backup:
        print(f"\nOriginal files backed up to: {backup_folder.name}/")
    print("=" * 60 + "\n")


if __name__ == '__main__':
    main()