// #require "__std"
// #require "__container"
(function () {
  const _push = Array.prototype.push;
  const _pop = Array.prototype.pop;
  const _splice = Array.prototype.splice;
  const _slice = Array.prototype.slice;
  const _join = Array.prototype.join;

  const _getPropDescriptor = Object.getOwnPropertyDescriptor;

  const ArrayRef = {
    CONTAINER_NAME: "Array",
    is_valid(obj) { return Array.isArray(obj) }
  }

  function __to_index(key) {
    if (typeof key === "number" && Number.isInteger(key) && key >= 0 && key < 0xFFFFFFFF) return key;
    if (typeof key === "string") {
      const index = parseInt(key, 10)
      if (Number.isInteger(index) && index >= 0 && index < 0xFFFFFFFF) return index
    }

    throw new HZSRuntimeError("INVALID_ARRAY_INDEX", {
      received: typeof key === "string" ? key : typeof key
    });
  }

  __hzs_export("std.Array", {
    newArray: function () {
      return []
    },

    ArrayPush: function (_a, ...__k) {
      __assert_type(_a, ArrayRef)
      __apply(_push, _a, __k)
    },

    ArrayPop: function (_a) {
      __assert_type(_a, ArrayRef)
      return __apply(_pop, _a, [])
    },

    ArrayGet: function (_a, n) {
      __assert_type(_a, ArrayRef)
      const index = __to_index(n);
      const descriptor = _getPropDescriptor(_a, String(index));
      return descriptor ? descriptor.value : undefined;
    },

    ArraySet: function (_a, n, v) {
      __assert_type(_a, ArrayRef)
      const index = __to_index(n);
      Object.defineProperty(_a, String(index), {
        value: v,
        writable: true,
        enumerable: true,
        configurable: true
      });
    },

    ArrayInsert: function (_a, n, ...__k) {
      __assert_type(_a, ArrayRef)
      __apply(_splice, _a, [n, 0].concat(__k))
    },

    ArrayRemove: function (_a, n, l = 1) {
      __assert_type(_a, ArrayRef)
      __apply(_splice, _a, [n, l])
    },

    ArraySize: function (_a) {
      __assert_type(_a, ArrayRef)
      return _a.length
    },

    ArraySlice: function (_a, start, end) {
      __assert_type(_a, ArrayRef)
      return __apply(_slice, _a, [start, end])
    },

    ArrayJoin: function (_a, __sep = ',') {
      __assert_type(_a, ArrayRef)
      return __apply(_join, _a, [__sep])
    }, 

    ArrayToState: function (_a) {
      __assert_type(_a, ArrayRef)
      if (!__hzs_has_module("State"))
        throw new HZSRuntimeError("MODULE_NOT_IMPORTED", { source: "ArrayToState", requires: "State" })

      const s = new globalThis.__hzs__.__data__.State()
      globalThis.__hzs__.__data__.__states.add(s)
      for (let i = 0; i < _a.length; i++) {
        s.push(_a[i]);
      }
      return s
    }
  })
})()
