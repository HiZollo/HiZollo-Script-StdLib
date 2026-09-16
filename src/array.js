(function () {
  function __assert_array_type(_Con) {
    if (!Array.isArray(_Con))
      throw new HZSRuntimeError("Not Raw Array")
  }

  __hzs_export("std.Array", {
    newArray: function () {
      return []
    },

    ArrayPush: function (_a, ...__k) {
      __assert_array_type(_a)
      _a.push(...__k)
    },

    ArrayPop: function (_a) {
      __assert_array_type(_a)
      return _a.pop()
    },

    ArrayGet: function (_a, n) {
      __assert_array_type(_a)
      return _a[n]
    },

    ArraySet: function (_a, n, v) {
      __assert_array_type(_a)
      _a[n] = v
    },

    ArrayInsert: function (_a, n, ...__k) {
      __assert_array_type(_a)
      _a.splice(n, 0, ...__k)
    },

    ArrayRemove: function (_a, n, l = 1) {
      __assert_array_type(_a)
      _a.splice(n, l)
    },

    ArraySize: function (_a) {
      __assert_array_type(_a)
      return _a.length
    },

    ArraySlice: function (_a, start, end) {
      __assert_array_type(_a)
      return _a.slice(start, end)
    },

    ArrayJoin: function (_a, __sep = ',') {
      __assert_array_type(_a)
      return _a.join(__sep)
    }
  })
})()
