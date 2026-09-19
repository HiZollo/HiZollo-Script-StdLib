(function () {
  const ArrayRef = {
    CONTAINER_NAME = "Array",
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

  __hzs_export("std.Array", {
    newArray: function () {
      return []
    },

    ArrayPush: function (_a, ...__k) {
      __assert_type(_a, ArrayRef)
      _a.push(...__k)
    },

    ArrayPop: function (_a) {
      __assert_type(_a, ArrayRef)
      return _a.pop()
    },

    ArrayGet: function (_a, n) {
      __assert_type(_a, ArrayRef)
      return _a[n]
    },

    ArraySet: function (_a, n, v) {
      __assert_type(_a, ArrayRef)
      _a[n] = v
    },

    ArrayInsert: function (_a, n, ...__k) {
      __assert_type(_a, ArrayRef)
      _a.splice(n, 0, ...__k)
    },

    ArrayRemove: function (_a, n, l = 1) {
      __assert_type(_a, ArrayRef)
      _a.splice(n, l)
    },

    ArraySize: function (_a) {
      __assert_type(_a, ArrayRef)
      return _a.length
    },

    ArraySlice: function (_a, start, end) {
      __assert_type(_a, ArrayRef)
      return _a.slice(start, end)
    },

    ArrayJoin: function (_a, __sep = ',') {
      __assert_type(_a, ArrayRef)
      return _a.join(__sep)
    }, 

    ArrayToState: function (_a) {
      if (!globalThis.__hzs__.__module__.State)
        throw new HZSRuntimeError("MODULE_NOT_IMPORTED", { source: "ArrayToState", requires: "State" })

      const s = new globalThis.__hzs__.__data__.State()
      globalThis.__hzs__.__data__.__states.add(s)
      s.push(..._a)
      return s
    }
  })
})()
