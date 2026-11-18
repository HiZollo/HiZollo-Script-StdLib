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

      return this.states[this.trans_valid_index()]
    }

    set(n) {
      if (this.states.length === 0) {
        throw new HZSRuntimeError("EMPTY_STATE", {
          operation: "set"
        })
      }

      this.states[this.trans_valid_index()] = n
    }

    push(...__k) {
      __assert_capacity(this.states.length, __k.length)
      __apply(__push, this.states, __k)
    }

    pop() {
      __apply(__pop, this.states, [])
    }

    add(...__k) {
      const add_l = __k.length
      if (add_l === 0) return

      __assert_capacity(this.states.length, add_l)

      __apply(
        __splice,
        this.states,
        [this.trans_valid_index(), 0].concat(__k)
      )
    }

    remove(n) {
      if (!Number.isSafeInteger(n) || n < 0) {
        throw new HZSRuntimeError("INVALID_STATE_REMOVE_COUNT", {
          received: n
        })
      }

      __apply(
        __splice,
        this.states,
        [this.trans_valid_index(), n]
      )
    }

    stringify(__sep) {
      const __lg = this.states.length
      if (__lg === 0) return ""

      const __i = this.trans_valid_index()

      const __ordered = __apply(__slice, this.states, [__i])
        .concat(__apply(__slice, this.states, [0, __i]))

      for (let i = 0; i < __lg; ++i) {
        __ordered[i] += ""
      }

      if (__lg === 1) return __ordered[0]

      return __apply(__join, __ordered, [__sep + ""])
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
          source: "State.to_state",
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
      const __values = __apply(__slice, this.states, [])
      const __i = this.trans_valid_index()

      for (let i = 0; i < __values.length; ++i) {
        __values[i] = `${__values[i]}`
      }

      if (__values.length !== 0) {
        __values[__i] = `*${__values[__i]}`
      }

      return `[${__apply(__join, __values, [", "])}]`
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

