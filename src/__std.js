// #noimport
const __apply = Reflect.apply;
const __defineProperty = Object.defineProperty;
const __getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const __hasOwn = Object.hasOwn;
const __freeze = Object.freeze;

(function hardenIntrinsics() {
  const __frezze_intrinsic = [
    Object, Array, Function, String, Number, Boolean, RegExp, Symbol, Date,
    Map, Set, Promise, Error, BigInt, WeakMap, WeakSet, ArrayBuffer
  ];

  for (const obj of __frezze_intrinsic) {
    __freeze(obj);
    if (obj.prototype) __freeze(obj.prototype);
  }
})();
