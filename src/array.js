(function () {
  const ArrayRef = {
    CONTAINER_NAME: "Array",
    is_valid(obj) { return Array.isArray(obj) }
  }

  function __assert_type(obj, ClassRef) {
    if (!ClassRef.is_valid(obj)) {
      throw new HZSRuntimeError("INCORRECT_CONTAINER", {
        expect: ClassRef.CONTAINER_NAME,
        received: obj?.constructor?.CONTAINER_NAME ?? (obj === null ? "null" : typeof obj)
      })
    }
  }

  function __to_index(key) {
    if (typeof key === "number" && Number.isSafeInteger(key) && key >= 0) return key;
    if (typeof key === "string" && Number.isSafeInteger(parseInt(key, 10))) return Number(key)

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
      Reflect.apply(Array.prototype.push, _a, __k)
    },

    ArrayPop: function (_a) {
      __assert_type(_a, ArrayRef)
      return Reflect.apply(Array.prototype.pop, _a, [])
    },

    ArrayGet: function (_a, n) {
      __assert_type(_a, ArrayRef)
      const index = __to_index(n);
      const descriptor = Object.getOwnPropertyDescriptor(_a, String(index));
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
      Reflect.apply(Array.prototype.splice, _a, [n, 0].concat(__k))
    },

    ArrayRemove: function (_a, n, l = 1) {
      __assert_type(_a, ArrayRef)
      Reflect.apply(Array.prototype.splic, _a, [n, l])
    },

    ArraySize: function (_a) {
      __assert_type(_a, ArrayRef)
      return _a.length
    },

    ArraySlice: function (_a, start, end) {
      __assert_type(_a, ArrayRef)
      return Reflect.apply(Array.prototype.slice, _a, [start, end])
    },

    ArrayJoin: function (_a, __sep = ',') {
      __assert_type(_a, ArrayRef)
      return Reflect.apply(Array.prototype.join, _a, [__sep])
      return _a.join(__sep)
    }, 

    ArrayToState: function (_a) {
      if (!globalThis.__hzs__.__module__.State)
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
