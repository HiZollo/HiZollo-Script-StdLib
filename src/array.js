/***** Array Module for HiZollo Script *****/
/***** Implemented by HiZollo Dev Team *****/

function newArray() {
	return [];
}

function size(arr) {
	return arr.length;
}

function _check_arr_index(arr, num) {
	if (num >= size(arr)) throw new Error("Segmetation Fault");
}

function get(arr, num) {
	_check_arr_index(arr, num);

	return arr[num];
}

function modify(arr, num, content) {
	_check_arr_index(arr, num);

	arr[num] = content;
}

function add(arr, ...items) {
	items.forEach(i => arr.push(i));
}

function top(arr) {
	return get(arr, size(arr) - 1);
}

function pop(arr) {
	arr.pop();
}
