// #noimport
const __push = Array.prototype.push;
const __pop = Array.prototype.pop;
const __splice = Array.prototype.splice;
const __slice = Array.prototype.slice;
const __join = Array.prototype.join;
const __MAX_ARRAY_LENGTH = 0xFFFFFFFF

function __to_index(key, container = "Array") {
  if (typeof key === "number" && Number.isInteger(key) && key >= 0 && key < __MAX_ARRAY_LENGTH) return key;
  if (typeof key === "string") {
    const index = parseInt(key, 10)
    if (Number.isInteger(index) && index >= 0 && index < 0xFFFFFFFF) return index
  }

  throw new HZSRuntimeError(`INVALID_${container.toString().toUpperCase()}_INDEX`, {
    container,
    received: typeof key === "string" ? key : typeof key
  });
}
