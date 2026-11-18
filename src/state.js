// #require "__std"
// #require "__container"
// #require "__array"
(function () {
  const __states = new WeakSet()

  function __assert_index(n, source) {
    if (!Number.isSafeInteger(n)) {
      throw new HZSRuntimeError("INVALID_STATE_INDEX", {
        received: n,
        source
      })
    }
  }

  function __assert_capacity(current, adding) {
    if (current + adding > __MAX_ARRAY_LENGTH) {
      throw new HZSRuntimeError("STATE_SIZE_LIMIT", {
        current,
        adding,
        max: __MAX_ARRAY_LENGTH
      })
    }
  }

  class State {
    static CONTAINER_NAME = "State"

    constructor() {
      this.states = []
      this.index = 0
    }

    trans_valid_index() {
      const __length = this.states.length
      if (__length === 0) return 0

      const k = this.index % __length
      return k < 0 ? k + __length : k
    }

    next() {
      this.move(1, "StateNext")
    }

    prev() {
      this.move(-1, "StatePrev")
    }

    move(n, source = "StateMove") {
      __assert_index(n, source)
      __assert_index(this.index + n, source)

      this.index += n
    }

    go(n) {
      __assert_index(n, "StateGo")

      this.index = n
    }

    access() {
      if (this.states.length === 0) {
        throw new HZSRuntimeError("EMPTY_STATE", {
          operation: "access"
        })
      }

      const k = this.trans_valid_index()

      return this.states[k]
    }

    set(n) {
      if (this.states.length === 0) {
        throw new HZSRuntimeError("EMPTY_STATE", {
          operation: "set"
        })
      }

      const k = this.trans_valid_index()

      this.states[k] = n
    }

    push(...__k) {
      __assert_capacity(this.states.length, __k.length)

      this.states = [...this.states, ...__k]
    }

    pop() {
      this.states.pop()
    }

    add(...__k) {
      const __i = this.trans_valid_index()
      const add_l = __k.length

      if (add_l === 0) return

      __assert_capacity(this.states.length, add_l)

      for (let i = this.states.length - 1; i >= __i; --i) {
        this.states[i + add_l] = this.states[i]
      }

      for (let i = 0; i < add_l; ++i) {
        this.states[__i + i] = __k[i]
      }
    }

    remove(n) {
      if (!Number.isSafeInteger(n) || n < 0) {
        throw new HZSRuntimeError("INVALID_STATE_REMOVE_COUNT", {
          received: n
        })
      }

      if (n === 0 || this.states.length === 0) return

      const __i = this.trans_valid_index()
      const __remove = Math.min(n, this.states.length - __i)

      if (__remove === 0) return

      const __new_length = this.states.length - __remove

      for (let i = __i; i < __new_length; ++i) {
        this.states[i] = this.states[i + __remove]
      }

      this.states.length = __new_length
    }

    stringify(__sep) {
      const __lg = this.states.length

      if (__lg === 0) return ""

      const __i = this.trans_valid_index()

      let _s = ""

      for (let i = 0; i < __lg; ++i) {
        if (i !== 0) _s += __sep

        _s += this.states[(__i + i) % __lg]
      }

      return _s
    }

    nowPosition() {
      return this.index
    }

    size() {
      return this.states.length
    }

    static is_valid(_Con) {
      return __states.has(_Con)
    }

    static to_state(arr) {
      if (!__hzs_has_module("State"))
        throw new HZSRuntimeError("MODULE_NOT_IMPORTED", {
          source: "Map.to_state",
          requires: "State"
        })

      const s = new State()
      __states.add(s)

      for (let i = 0; i < arr.length; ++i) {
        s.push(arr[i])
      }

      return s
    }

    toString() {
      let _o = '['
      const _i = this.trans_valid_index()

      for (let i = 0; i < this.states.length; ++i) {
        if (i !== 0) _o += ', '
        if (i === _i) _o += '*'

        _o += `${this.states[i]}`
      }

      _o += ']'

      return _o
    }
  }

  globalThis.__hzs__.__data__.State = State
  globalThis.__hzs__.__data__.__states = __states

  __hzs_export("std.State", {
    newState: function () {
      const S = new State()
      __states.add(S)
      return S
    },

    StateNext: function (_S) {
      __assert_type(_S, State)
      _S.next()
    },

    StatePrev: function (_S) {
      __assert_type(_S, State)
      _S.prev()
    },

    StateMove: function (_S, n) {
      __assert_type(_S, State)
      _S.move(n)
    },

    StateGo: function (_S, n) {
      __assert_type(_S, State)
      _S.go(n)
    },

    StateAccess: function (_S) {
      __assert_type(_S, State)
      return _S.access()
    },

    StateSet: function (_S, n) {
      __assert_type(_S, State)
      return _S.set(n)
    },

    StatePush: function (_S, ...__k) {
      __assert_type(_S, State)
      _S.push(...__k)
    },

    StatePop: function (_S) {
      __assert_type(_S, State)
      _S.pop()
    },

    StateAdd: function (_S, ...__k) {
      __assert_type(_S, State)
      _S.add(...__k)
    },

    StateRemove: function (_S, n = 1) {
      __assert_type(_S, State)
      _S.remove(n)
    },

    StateStringify: function (_S, __sep = ' ') {
      __assert_type(_S, State)
      return _S.stringify(__sep)
    },

    StateNowPos: function (_S) {
      __assert_type(_S, State)
      return _S.nowPosition()
    },

    SizeOfState: function (_S) {
      __assert_type(_S, State)
      return _S.size()
    }
  })
})()

