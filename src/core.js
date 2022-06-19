/***** Core Module for HiZollo Script *****/
/***** Implemented by HiZollo Dev Team *****/

var _buffer = '';

function _start() {};

function _write(content) {
	_buffer += content;
	if (_buffer.length > 2**20) _flush();
}

function _flush() {
	process.stdout.write(_buffer);
	_buffer = '';
}

function _end() {
	_flush();
}