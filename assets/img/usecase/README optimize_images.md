# Image Optimizer for Web

A Python script that optimizes images for fast web loading. Automatically resizes, compresses, and backs up your images.

## Features

- **Automatic backup** – Copies originals to a timestamped subfolder before processing
- **Smart resizing** – Scales images to max width while preserving aspect ratio
- **Web-optimized compression** – Progressive JPEGs, optimized PNGs
- **Batch processing** – Handles all images in a folder at once
- **Detailed reporting** – Shows file sizes and total savings

## Supported Formats

JPG, JPEG, PNG, WebP, GIF, BMP, TIFF

## Installation

Requires Python 3.9+ and Pillow:

```bash
pip install Pillow
```

## Usage

Place the script in your images folder and run:

```bash
python optimize_images.py
```

Or specify a folder:

```bash
python optimize_images.py /path/to/images
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `folder` | Script location | Path to folder containing images |
| `--max-width` | 800 | Maximum width in pixels |
| `--quality` | 85 | JPEG/WebP quality (1-100) |
| `--no-backup` | False | Skip creating backup |

### Examples

```bash
# Use all defaults (800px, quality 85, backup enabled)
python optimize_images.py

# Custom max width
python optimize_images.py --max-width 1200

# Custom quality (lower = smaller files)
python optimize_images.py --quality 75

# Process specific folder without backup
python optimize_images.py ./assets --no-backup

# Full custom settings
python optimize_images.py C:\Photos --max-width 1920 --quality 90
```

## Output

The script creates a backup folder named `backup_originals_YYYYMMDD_HHMMSS` and prints a summary:

```
============================================================
SUMMARY
============================================================
Images processed: 12/12
Original total:   24.5 MB
Optimized total:  4.2 MB
Total saved:      20.3 MB
Reduction:        82.9%

Original files backed up to: backup_originals_20241212_143022/
============================================================
```

## Quality Guidelines

| Quality | Use Case |
|---------|----------|
| 95 | Photography portfolios, print-quality |
| 85 | General web use (recommended) |
| 75 | Thumbnails, previews |
| 60 | Maximum compression, acceptable quality |

## License

MIT
