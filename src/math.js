/***** Math Module for HiZollo Script *****/
/***** Implemented by HiZollo Dev Team *****/

/***** Constants *****/
function PI() {
	return Math.PI;
}

function E() {
	return Math.E;
}
/**/

/***** Exponential & Logarithm *****/
function pow(base, exp) {
	return base**exp;
}

function exp(p) {
	return pow(E(), p);
}

const { log: ln, log10, log2 } = Math;

function log(num, base = 10) {
	if (base === 10) return log10(num);
	if (base === 2) return log2(num);
	return ln(num)/ln(base);
}
/**/
 
/***** Roots *****/
const { sqrt, cbrt } = Math;
function root(num, root = 2) {
	if (root === 2) return sqrt(num);
	if (root === 3) return cbrt(num);
	return pow(num, 1/root);
}
/**/


/***** Degree and Radian *****/
var __default_angle_unit = "deg";

function setDefaultAngleUnit(unit) {
	if (unit === "deg" || unit == "rad")
		return __default_angle_unit = unit;

	throw Error("INVALID_UNIT");
}

function deg2rad(deg) {
	return deg*PI()/180
}

function rad2deg(rad) {
	return rad*180/PI();
}
/**/

/***** Trigonometric Functions *****/
function _trig_factory(method) {
	return function (num, unit = __default_angle_unit) {
		if (unit === "deg") {
			num = deg2rad(num);
		}

		return Math[method](num);
	}
}

function _inv_trig_factory(method) {
	return function (num, unit = __default_angle_unit) {
		const result = Math[method](num);

		if (unit === "deg") return rad2deg(result);
		return result;
	}
}

const sin = _trig_factory("sin");
const cos = _trig_factory("cos");
const tan = _trig_factory("tan");
function cot(...args) { return 1/tan(...args); }
function sec(...args) { return 1/cos(...args); }
function csc(...args) { return 1/sin(...args); }

const arcsin = _inv_trig_factory("asin");
const arccos = _inv_trig_factory("acos");
const arctan = _inv_trig_factory("atan");
function arccot(num, unit) { return arctan(1/num, unit); }
function arcsec(num, unit) { return arccos(1/num, unit); }
function arccsc(num, unit) { return arcsin(1/num, unit); }
/**/

/***** Hyperbolic Functions *****/
const sinh = Math.sinh;
const cosh = Math.cosh;
const tanh = Math.tanh;
function coth(num) { return 1 / tanh(num); }
function sech(num) { return 1 / cosh(num); }
function csch(num) { return 1 / sinh(num); }

const arcsinh = Math.asinh;
const arccosh = Math.acosh;
const arctanh = Math.atanh;
function arccoth(num) { return arctanh(1/num); }
function arcsech(num) { return arccosh(1/num); }
function arccsch(num) { return arcsinh(1/num); }
/**/

/***** Utilities *****/
const { abs, random, ceil, floor, round } = Math;

function mod(a, b) {
	return a % b;
}

function gcd(a, b) {
  if (b === 0) return a;
  else return gcd(b, mod(a, b));
}

function lcm(a, b) {
	return a * b / gcd(a, b);
}

function factorial(num) {
	let result = 1;
	for (let i = 2; i <= num; ++i) result *= i;
	return result;
}

function isPrime(num) {
	if (num < 2) return false;
	for (let i = 2; i <= sqrt(num); ++i) {
		if (mod(num, i) === 0) return false;
	}
	return true;
}

function randomInt(min, max) {
	return ~~(random() * (max - min + 1) + min);
}
/**/