import {access, cp, readFile, writeFile} from 'node:fs/promises';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {initProject} from '../../runtime/src/project.js';
import {resolveStudy} from './src/catalog.js';
import type {StudyVariant} from './src/types.js';

const source = dirname(fileURLToPath(import.meta.url));

export async function createStudy(target: string, options: {caseId: string; variant: StudyVariant}): Promise<string> {
  const study = resolveStudy(options.caseId);
  if (!['good', 'bad'].includes(options.variant)) throw Error(`Unknown variant: ${options.variant}`);
  // Check required assets before initProject performs any filesystem/network work.
  for (const name of ['film.tsx', 'src', 'assets/NotoSansSC-Study-700.ttf', 'assets/OFL.txt', 'SOURCES.md']) await access(join(source, name));
  const dest = await initProject(target);
  for (const name of ['film.tsx', 'src', 'assets', 'SOURCES.md']) await cp(join(source, name), join(dest, name), {recursive: true});
  await writeFile(join(dest, 'study-config.ts'), `export const caseId = ${JSON.stringify(study.id)};\nexport const variant = ${JSON.stringify(options.variant)} as const;\n`);
  const fontSource = JSON.parse(await readFile(join(source, 'assets/font-source.json'), 'utf8'));
  await writeFile(join(dest, 'brand-kit/sources.json'), JSON.stringify({kind: 'fictional-method-study', font: fontSource, license: 'assets/OFL.txt'}, null, 2) + '\n');
  await writeFile(join(dest, 'records/brief.md'), `# ${study.id} method study\nFictional content for comparing one motion method. No product claims or user approvals. Not a commercial quality benchmark.\n`);
  await writeFile(join(dest, 'records/direction.md'), '# Direction\nSame typography, palette, assets, copy and duration for both variants; silent 1920×1080 at 30 fps.\n');
  await writeFile(join(dest, 'records/storyboard.md'), `# Study\nCase: ${study.id}; variant: ${options.variant}; frames: [0, ${study.durationInFrames}).\nCompare normal-speed attention, reading and handoff before judging. Source: examples/motion-language.\n`);
  return dest;
}

async function main(args: string[]) {
  if (args.length !== 5 || args[1] !== '--case' || args[3] !== '--variant') {
    throw Error('Usage: npx tsx examples/motion-language/create-study.ts <new-directory> --case R01 --variant good');
  }
  console.log(await createStudy(resolve(args[0]), {caseId: args[2], variant: args[4] as StudyVariant}));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch(error => {console.error(error.message); process.exitCode = 1;});
}
