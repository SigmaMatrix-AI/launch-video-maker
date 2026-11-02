"""Exercise the release CLI against real temporary Git working trees."""
import json
import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

SCRIPT = Path(__file__).with_name('package-release.py').resolve()


class ReleasePackageTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        subprocess.run(['git', 'init', '-q', str(self.root)], check=True)
        self.put('.gitignore', 'node_modules/\n.lvm/\n/dist/\n')
        self.put('SKILL.md', '# Skill\n')

    def put(self, name, value):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(value)
        return path

    def package(self, *args):
        return subprocess.run([sys.executable, str(SCRIPT), '--root', str(self.root), *args],
                              capture_output=True, text=True)

    def test_packages_current_assets_without_gallery_or_local_artifacts(self):
        old = self.put('assets/old.png', 'original')
        self.put('assets/gallery/demo.gif', 'gallery')
        subprocess.run(['git', '-C', str(self.root), 'add', '.'], check=True)
        old.unlink()
        self.put('assets/new.webp', 'compressed')
        self.put('templates/demo/assets/audio/music.flac', 'audio')
        self.put('node_modules/dependency.js', 'local')
        self.put('templates/demo/.lvm/frame.png', 'cache')
        self.put('dist/previous.zip', 'old package')
        self.put('notes-private.txt', 'unrelated')
        self.put('README.md', 'readme')
        result = self.package()
        self.assertEqual(result.returncode, 0, result.stderr)
        report = json.loads(result.stdout)
        with zipfile.ZipFile(report['archive']) as archive:
            self.assertEqual(set(archive.namelist()), {
                'launch-video-maker/.gitignore', 'launch-video-maker/SKILL.md',
                'launch-video-maker/README.md', 'launch-video-maker/assets/new.webp',
                'launch-video-maker/templates/demo/assets/audio/music.flac'})
            self.assertEqual(archive.read('launch-video-maker/assets/new.webp'), b'compressed')
            self.assertEqual(report['uncompressedBytes'], sum(i.file_size for i in archive.infolist()))

    def test_release_gallery_links_work_without_changing_source_readmes(self):
        source = ('<a href="assets/gallery/demo.gif"><img src="assets/gallery/demo.gif"></a>\n'
                  '<img src="assets/tapvid-cta.svg">\n')
        self.put('assets/gallery/demo.gif', 'gallery')
        for name in ['README.md', 'README.zh-CN.md']:
            self.put(name, source)
        result = self.package()
        self.assertEqual(result.returncode, 0, result.stderr)
        expected = ('<a href="https://github.com/SigmaMatrix-AI/launch-video-maker/blob/main/assets/gallery/demo.gif">'
                    '<img src="https://raw.githubusercontent.com/SigmaMatrix-AI/launch-video-maker/main/assets/gallery/demo.gif"></a>\n'
                    '<img src="assets/tapvid-cta.svg">\n')
        with zipfile.ZipFile(json.loads(result.stdout)['archive']) as archive:
            for name in ['README.md', 'README.zh-CN.md']:
                self.assertEqual(archive.read('launch-video-maker/' + name).decode(), expected)
                self.assertEqual((self.root / name).read_text(), source)
            self.assertNotIn('launch-video-maker/assets/gallery/demo.gif', archive.namelist())

    def test_includes_project_and_third_party_license_notices(self):
        self.put('LICENSE', 'Project license')
        self.put('THIRD_PARTY_NOTICES.md', 'Third-party notices')
        self.put('templates/demo/assets/fonts/Font-OFL.txt', 'Font license')
        result = self.package()
        self.assertEqual(result.returncode, 0, result.stderr)
        with zipfile.ZipFile(json.loads(result.stdout)['archive']) as archive:
            self.assertEqual(archive.read('launch-video-maker/LICENSE'), b'Project license')
            self.assertIn('launch-video-maker/THIRD_PARTY_NOTICES.md', archive.namelist())
            self.assertEqual(archive.read('launch-video-maker/THIRD_PARTY_NOTICES.md'), b'Third-party notices')
            self.assertEqual(archive.read('launch-video-maker/templates/demo/assets/fonts/Font-OFL.txt'), b'Font license')

    def test_rejects_uncompressed_limit_even_when_data_compresses_well(self):
        self.put('assets/large.txt', 'x' * 1000)
        previous = self.put('dist/launch-video-maker.zip', 'previous valid package')
        result = self.package('--max-bytes', '1000')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Uncompressed', result.stderr)
        self.assertEqual(previous.read_text(), 'previous valid package')

    def test_rejects_zip_overhead_exceeding_limit(self):
        # Payload is below 100 bytes, but ZIP headers put the archive over it.
        result = self.package('--max-bytes', '100')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('ZIP', result.stderr)
        self.assertFalse((self.root / 'dist/launch-video-maker.zip').exists())

    def test_rejects_symlink_assets(self):
        (self.root / 'assets').mkdir()
        (self.root / 'assets/link').symlink_to(self.root / 'SKILL.md')
        result = self.package()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Symlink', result.stderr)

    def test_rejects_tracked_assets_under_symlinked_directories(self):
        asset = self.put('assets/private.txt', 'tracked asset')
        subprocess.run(['git', '-C', str(self.root), 'add', '.'], check=True)
        asset.unlink()
        asset.parent.rmdir()
        external = tempfile.TemporaryDirectory()
        self.addCleanup(external.cleanup)
        (Path(external.name) / 'private.txt').write_text('outside repository')
        asset.parent.symlink_to(external.name, target_is_directory=True)
        result = self.package()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Symlink', result.stderr)
        self.assertFalse((self.root / 'dist/launch-video-maker.zip').exists())


if __name__ == '__main__':
    unittest.main()
