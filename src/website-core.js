/***** Core Module for HiZollo Script *****/
/***** Implemented by HiZollo Dev Team *****/

/***** This core module is for HiZollo Script Online Playground *****/
/***** https://hizollo.ddns.net/playground/hzscript *****/

const node = document.getElementById("result-2");

function _start() {
	node.innerText = "";
}

function _write(text) {
	node.innerText += String(text);
}

function _end() {}