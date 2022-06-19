import Uglify from 'uglify-js';
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';

const n = Date.now();

const files = readdirSync(`./src`).filter(file => file.endsWith('.js'));

if (!existsSync('./build')) {
	mkdirSync('./build');
}

for (const file of files) {
	console.log(`[${file}] 讀取檔案中⋯⋯`);
	const code = readFileSync(`./src/${file}`, 'utf-8');
	console.log(`[${file}] 檔案讀取完畢`);
	console.log(`[${file}] 最小化中⋯⋯`);
	const result = Uglify.minify(code);

	if (!result.error) {
		console.log(`[${file}] 最小化完畢`);
		console.log(`[${file}] 輸出至 /build/${file}⋯⋯`);
		writeFileSync(`./build/${file}`, result.code);
		console.log(`[${file}] 已輸出`);
	} else {
		console.log(`[${file}] 出現錯誤，錯誤內容：`);
		console.error(result.error);
	}
}

console.log(`\nBuild Step Complete\nTime: ${Date.now() - n}ms`);