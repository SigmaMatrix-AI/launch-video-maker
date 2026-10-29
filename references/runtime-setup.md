# Runtime setup

Technical setup instructions for agents and developers. For the simplest installation, use the natural-language prompt in the [README](../README.md#install).

Keep the repository intact: the root `SKILL.md`, references, templates, and runtime are installed together.

## Requirements

Node.js 24+, npm, FFmpeg with ffprobe and H.264/AAC support, and Playwright Chromium. The current validation target is macOS on Apple Silicon; other platforms have not been validated. Dependency and browser installation requires an internet connection. FFmpeg must be installed separately.

## Setup and project initialization

Clone the repository and prepare the runtime:

```bash
git clone https://github.com/SigmaMatrix-AI/launch-video-maker.git
cd launch-video-maker
npm ci
npm run build
npx playwright install chromium
node runtime/dist/cli.js doctor
```

Ask your agent to register this checkout as a skill, using the root `SKILL.md` as its entry point. The commands above prepare the runtime; they do not register the skill with your agent.

To create a film project manually, run these commands from the repository root:

```bash
node runtime/dist/cli.js init films/my-film
cd films/my-film
npm ci
npm run setup
npm run prepare
```

Film projects include their own source, assets directory, runtime snapshot, and dependency lockfile. They can be moved and installed independently of the skill checkout. Generated films live in `films/`, which is ignored by Git.

`npm ci` in a film project also runs its `prepare` lifecycle script. Use `npm ci --ignore-scripts` if you need to install dependencies before preparing media, then run `npm run prepare` explicitly.
