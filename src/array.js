// #require "__std"
// #require "__container"
// #require "__array"
(function () {
  const ArrayRef = {
    CONTAINER_NAME: "Array",
    is_valid(obj) { return Array.isArray(obj) }
  }

  __hzs_export("std.Array", {
    newArray: function () {
      return []
    },

    ArrayPush: function (_a, ...__k) {
      __assert_type(_a, ArrayRef)
      __apply(__push, _a, __k)
    },

    ArrayPop: function (_a) {
      __assert_type(_a, ArrayRef)
      return __apply(__pop, _a, [])
    },

    ArrayGet: function (_a, n) {
      __assert_type(_a, ArrayRef)
      const index = __to_index(n);
      const descriptor = __getOwnPropertyDescriptor(_a, String(index));
      return descriptor ? descriptor.value : undefined;
    },

    ArraySet: function (_a, n, v) {
      __assert_type(_a, ArrayRef)
      const index = __to_index(n);
      __defineProperty(_a, String(index), {
        value: v,
        writable: true,
        enumerable: true,
        configurable: true
      });
    },

    ArrayInsert: function (_a, n, ...__k) {
      __assert_type(_a, ArrayRef)
      __apply(__splice, _a, [n, 0].concat(__k))
    },

    ArrayRemove: function (_a, n, l = 1) {
      __assert_type(_a, ArrayRef)
      __apply(__splice, _a, [n, l])
    },

    ArraySize: function (_a) {
      __assert_type(_a, ArrayRef)
      return _a.length
    },

    ArraySlice: function (_a, start, end) {
      __assert_type(_a, ArrayRef)
      return __apply(__slice, _a, [start, end])
    },

    ArrayJoin: function (_a, __sep = ',') {
      __assert_type(_a, ArrayRef)
      return __apply(__join, _a, [__sep])
    }, 

    ArrayToState: function (_a) {
      __assert_type(_a, ArrayRef)
      if (!__hzs_has_module("State"))
        throw new HZSRuntimeError("MODULE_NOT_IMPORTED", { source: "ArrayToState", requires: "State" })

      const s = new globalThis.__hzs__.__data__.State()
      globalThis.__hzs__.__data__.__states.add(s)
      for (let i = 0; i < _a.length; i++) s.push(_a[i]);
      return s
    }
  })
})()
