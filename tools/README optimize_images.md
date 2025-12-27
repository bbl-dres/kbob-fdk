# Image Optimizer for Web (Enhanced)

A Python script that recursively optimizes images for fast web loading. Automatically resizes, compresses, creates thumbnails, and backs up your images.

## Features

- **Recursive processing** – Processes all subfolders automatically
- **Smart skip logic** – Skips backup folders (backup_*, *_backup, YYYYMMDD_*)
- **Automatic backup** – Copies originals to a timestamped subfolder before processing
- **Smart resizing** – Scales images to max width while preserving aspect ratio
- **Web-optimized compression** – Progressive JPEGs, optimized PNGs
- **Thumbnail generation** – Optional thumbnail creation for gallery views
- **Dry-run mode** – Preview changes without modifying files
- **Detailed reporting** – Shows file sizes and total savings

## Supported Formats

JPG, JPEG, PNG, WebP, GIF, BMP, TIFF

## Installation

Requires Python 3.9+ and Pillow:

```bash
pip install Pillow
```

## Usage

Specify a folder to process:

```bash
python optimize_images.py /path/to/images
```

Preview what would be optimized:

```bash
python optimize_images.py /path/to/images --dry-run
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `folder` | Required | Path to folder containing images |
| `--max-width` | 800 | Maximum width in pixels |
| `--quality` | 85 | JPEG/WebP quality (1-100) |
| `--thumbnails` | False | Also create thumbnail versions |
| `--thumb-width` | 400 | Thumbnail width in pixels |
| `--thumb-quality` | 80 | Thumbnail quality |
| `--thumb-folder` | _thumbs | Subfolder name for thumbnails |
| `--force` | False | Process all images, even if already optimized |
| `--dry-run` | False | Show what would be done without making changes |
| `--no-backup` | False | Skip creating backup |

### Examples

```bash
# Preview what would be optimized
python optimize_images.py ../assets/img --dry-run

# Optimize with defaults (800px, quality 85)
python optimize_images.py ../assets/img

# Also create thumbnails for gallery use
python optimize_images.py ../assets/img --thumbnails --thumb-width 400

# Force re-optimize all images
python optimize_images.py ../assets/img --force

# Custom max width and quality
python optimize_images.py ../assets/img --max-width 1200 --quality 90

# Process without creating backup
python optimize_images.py ../assets/img --no-backup
```

## Skip Patterns

The script automatically skips these folders:
- `backup_*` – Backup folders (e.g., backup_originals_20241212)
- `*_backup` – Folders ending with _backup
- `YYMMDD_*` or `YYYYMMDD_*` – Date-prefixed folders
- `_thumbs` – Thumbnail output folders

## Output

The script analyzes images first, then processes only those needing optimization:

```
============================================================
Image Optimizer for Web (Enhanced)
============================================================
Folder: /path/to/assets/img
Images found: 54
Max width: 800px
Quality: 85
Create thumbnails: False
Dry run: False
============================================================

Analyzing images...
  Need optimization: 4
  Already optimized: 50

Processing images...
------------------------------------------------------------
[1/4] api/rest.jpg
         resized to 800x450, saved 35.2%
[2/4] element/raum.jpg
         resized to 800x533, saved 28.7%
...

============================================================
SUMMARY
============================================================
Images optimized:    4/4
Original total:      2.1 MB
Optimized total:     1.4 MB
Space saved:         720.5 KB
Reduction:           34.2%
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
