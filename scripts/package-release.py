#!/usr/bin/env python3
"""Package the current Git worktree, excluding gallery and generated files."""
import argparse
import json
import os
import subprocess
import tempfile
import zipfile
from pathlib import Path

ROOT_FILES = {'SKILL.md', 'README.md', 'README.zh-CN.md', 'LICENSE', 'THIRD_PARTY_NOTICES.md',
              'package.json', 'package-lock.json', '.gitignore', '.gitattributes'}
ROOT_DIRS = {'assets', 'styles', 'templates', 'references', 'examples', 'runtime', 'docs', 'scripts'}
LOCAL_DIRS = {'node_modules', '.git', '.lvm', '.superpowers', '__pycache__', 'exports'}


def package(root, max_bytes):
    candidates = subprocess.check_output(
        ['git', '-C', str(root), 'ls-files', '--cached', '--others', '--exclude-standard', '-z']
    ).decode().split('\0')
    files = []
    for name in sorted(set(filter(None, candidates))):
        parts = Path(name).parts
        if name not in ROOT_FILES and not (len(parts) > 1 and parts[0] in ROOT_DIRS):
            continue
        if name.startswith('assets/gallery/') or any(
            p in LOCAL_DIRS or p.startswith('.lvm-') for p in parts
        ):
            continue
        path = root / name
        if any(root.joinpath(*parts[:i]).is_symlink() for i in range(1, len(parts) + 1)):
            raise ValueError(f'Symlink cannot be packaged: {name}')
        if path.is_file():  # Deleted tracked files are replaced by new worktree assets.
            files.append((name, path))
    if not any(name == 'SKILL.md' for name, _ in files):
        raise ValueError('SKILL.md is required in the release root')
    unpacked = sum(path.stat().st_size for _, path in files)
    if unpacked >= max_bytes:
        raise ValueError(f'Uncompressed payload {unpacked} bytes must be below {max_bytes}')
    output = root / 'dist' / 'launch-video-maker.zip'
    output.parent.mkdir(parents=True, exist_ok=True)
    fd, temp_name = tempfile.mkstemp(prefix='.release-', suffix='.zip', dir=output.parent)
    os.close(fd)
    temporary = Path(temp_name)
    try:
        with zipfile.ZipFile(temporary, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
            for name, path in files:
                archived_name = 'launch-video-maker/' + name
                if name in {'README.md', 'README.zh-CN.md'}:
                    # Keep repository README/gallery unchanged; adapt only the ZIP copy.
                    content = path.read_bytes().replace(
                        b'href="assets/gallery/',
                        b'href="https://github.com/SigmaMatrix-AI/launch-video-maker/blob/main/assets/gallery/'
                    ).replace(
                        b'src="assets/gallery/',
                        b'src="https://raw.githubusercontent.com/SigmaMatrix-AI/launch-video-maker/main/assets/gallery/'
                    )
                    archive.writestr(zipfile.ZipInfo.from_file(path, archived_name), content,
                                     compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
                else:
                    archive.write(path, archived_name)
        with zipfile.ZipFile(temporary) as archive:
            actual = sum(entry.file_size for entry in archive.infolist())
        if actual >= max_bytes:
            raise ValueError(f'Uncompressed payload {actual} bytes must be below {max_bytes}')
        size = temporary.stat().st_size
        if size >= max_bytes:
            raise ValueError(f'ZIP {size} bytes must be below {max_bytes}')
        os.replace(temporary, output)
        return {'archive': str(output), 'files': len(files), 'uncompressedBytes': actual,
                'zipBytes': size, 'limitBytes': max_bytes, 'excluded': ['assets/gallery/']}
    finally:
        temporary.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--max-bytes', type=int, default=100_000_000,
                        help='Both payload and ZIP must be strictly below this limit (at most 100 MB)')
    args = parser.parse_args()
    if not 0 < args.max_bytes <= 100_000_000:
        parser.error('--max-bytes must be between 1 and 100000000')
    try:
        print(json.dumps(package(args.root.resolve(), args.max_bytes), indent=2))
    except (ValueError, OSError, subprocess.CalledProcessError) as error:
        parser.exit(1, f'{error}\n')


if __name__ == '__main__':
    main()
