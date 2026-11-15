import { minify } from 'uglify-js';
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve('./src');
const BUILD_DIR = path.resolve('./build');

function extractPreamble(source) {
  const lines = source.split(/\r?\n/);
  let preambleEnd = 0;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      preambleEnd = i + 1;
      continue;
    }

    if (!trimmed.startsWith('//')) break;

    preambleEnd = i + 1;
  }

  return {
    preamble: lines.slice(0, preambleEnd).join('\n'),
    body: lines.slice(preambleEnd).join('\n'),
  };
}

function minifyModule(source, filename) {
  const { preamble, body } = extractPreamble(source);

  const result = minify(body);

  if (result.error) {
    throw new Error(`Failed to minify "${filename}": ${result.error.message}`, { cause: result.error },);
  }

  if (typeof result.code !== 'string') {
    throw new Error(`UglifyJS produced no output for "${filename}".`);
  }

  return preamble
    ? `${preamble}\n${result.code}\n`
    : `${result.code}\n`;
}

function build() {
  mkdirSync(BUILD_DIR, { recursive: true });

  const files = readdirSync(SRC_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
    .map((entry) => entry.name)
    .sort();

  if (!files.length) {
    console.warn('No JavaScript modules found in src/.');
    return;
  }

  for (const filename of files) {
    const sourcePath = path.join(SRC_DIR, filename);
    const outputPath = path.join(BUILD_DIR, filename);

    const source = readFileSync(sourcePath, 'utf8');
    const output = minifyModule(source, filename);

    writeFileSync(outputPath, output, 'utf8');

    console.log(`Built: ${filename}`);
  }

  console.log(`\nBuild completed: ${files.length} module(s).`);
}

try {
  build();
} catch (error) {
  console.error('\nBuild failed:');
  console.error(error);
  process.exitCode = 1;
}

