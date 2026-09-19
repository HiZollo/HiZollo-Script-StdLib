(function () {
  const __maps = new WeakSet()

  class Map {
    static CONTAINER_NAME = "Map"
    constructor() {
      this.data = Object.create(null)
    }

    insert(k, v) {
      this.data[k] = v
    }

    get(k) {
      return this.data[k]
    }

    has(k) {
      return Object.prototype.hasOwnProperty.call(this.data, k)
    }

    remove(k) {
      delete this.data[k]
    }

    static is_valid(_Con) {
      return __maps.has(_Con)
    }

    static to_state(arr) {
      if (!globalThis.__hzs__.__module__.State) // State is not imported
        throw new HZSRuntimeError("MODULE_NOT_IMPORTED", { source: "Map.to_state", requires: "State" })

      const s = new globalThis.__hzs__.__data__.State()
      globalThis.__hzs__.__data__.__states.add(s)
      s.push(...arr)
      return s
    } 

    toState() {
      return Map.to_state(Object.values(this.data))
    }

    toStateKey() {
      return Map.to_state(Object.keys(this.data))
    }

    toString() {
      let _o = '{'
      let __ = false

      for (const [k, v] of Object.entries(this.data)) {
        if (__) _o += ', '
        _o += `${k}: ${v}`
        if (!__) __ = true
      }
      _o += '}'
      return _o
    }
  }

  function __assert_type(obj, ClassRef) {
    if (!ClassRef.is_valid(obj)) {
      throw new HZSRuntimeError("INCORRECT_CONTAINER", {
        expect: ClassRef.CONTAINER_NAME,
        received: obj?.constructor?.CONTAINER_NAME ?? (obj === null ? "null" : typeof obj)
      })
    }
  }

  globalThis.__hzs__.__data__.Map = Map


  __hzs_export("std.Map", {
    newMap: function() { const M = new Map(); __maps.add(M); return M; },
    MapInsert: function (_m, key, val) { __assert_type(_m, Map); _m.insert(key, val) },
    MapGet: function (_m, key) { __assert_type(_m, Map); return _m.get(key) },
    MapHas: function (_m, key) { __assert_type(_m, Map); return _m.has(key) },
    MapRemove: function (_m, key) { __assert_type(_m, Map); _m.remove(key) },
    MapToState: function (_m) { __assert_type(_m, Map); return _m.toState() },
    MapToStateKey: function (_m) { __assert_type(_m, Map); return _m.toStateKey() }
  })
})()
