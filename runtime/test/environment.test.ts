import {test} from 'node:test';import assert from 'node:assert/strict';import {createRequire} from 'node:module';import {join,dirname} from 'node:path';import {access} from 'node:fs/promises';
import {browserInstaller} from '../src/project.js';
test('setup resolves actual Playwright CLI entrypoint through exported package metadata',async()=>{const path=browserInstaller();await access(path);assert.ok(path.endsWith('cli.js'));});
