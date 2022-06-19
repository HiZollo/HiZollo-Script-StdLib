import Uglify from 'uglify-js';
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';

const files = readdirSync(`./src`).filter(file => file.endsWith('.js'));

if (!existsSync('./build')) {
	mkdirSync('./build');
}

for (const file of files) {
	const code = readFileSync(`./src/${file}`, 'utf-8');
	const result = Uglify.minify(code);

	if (!result.error) writeFileSync(`./build/${file}`, result.code);
	else console.error(result.error);
}