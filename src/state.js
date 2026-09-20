(function () {
  const __states = new WeakSet()

  class State {
    static CONTAINER_NAME = "State"
    constructor() {
      this.states = []
      this.index = 0
    }

    trans_valid_index() {
      const k = this.index % this.states.length
      return k < 0 ? k + this.states.length : k
    }

    next(n) {
      ++this.index
    }

    prev() {
      --this.index
    }

    move(n) {
      this.index += n
    }

    go(n) {
      this.index = n
    }

    access() {
      const k = this.trans_valid_index()

      return this.states[k]
    }

    set(n) {
      const k = this.trans_valid_index()

      this.states[k] = n
    }

    push(...__k) {
      this.states = [...this.states, ...__k]
    }

    pop() {
      this.states.pop()
    }

    add(...__k) {
      const __i = this.trans_valid_index()
      const add_l = __k.length
      for (let i = this.states.length - 1; i >= __i; --i) {
        this.states[i+add_l] = this.states[i]
        if (i - __i < add_l) this.states[i] = __k[i - __i]
      }
    }

    remove(n) {
      const __i = this.trans_valid_index()
      const __ls = this.states.length - 1
      for (let i = __i; i < __ls; ++i) {
        this.states[i] = this.states[i + n];
      }

      for (let i = 0; i < n; ++i) this.pop()
    }

    stringify(__sep) {
      const __i = this.trans_valid_index()
      const __lg = this.states.length
      let _s = ""
      for (let i = __i; i < __i + __lg; ++i) {
      if (i != __i) _s += __sep
        _s += this.states[i % __lg]
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

  function __assert_type(obj, ClassRef) {
    if (!ClassRef.is_valid(obj)) {
      throw new HZSRuntimeError("INCORRECT_CONTAINER", {
        expect: ClassRef.CONTAINER_NAME,
        received: obj?.constructor?.CONTAINER_NAME ?? (obj === null ? "null" : typeof obj)
      })
    }
  }

  globalThis.__hzs__.__data__.State = State
  globalThis.__hzs__.__data__.__states = __states

  __hzs_export("std.State", {
    newState: function () { const S = new State(); __states.add(S); return S; },
    StateNext: function (_S) { __assert_type(_S, State); _S.next() },
    StatePrev: function (_S) { __assert_type(_S, State); _S.prev() },
    StateMove: function (_S, n) { __assert_type(_S, State); _S.move(n) },
    StateGo: function (_S, n) { __assert_type(_S, State); _S.go(n) },
    StateAccess: function (_S) { __assert_type(_S, State); return _S.access() },
    StateSet: function (_S, n) { __assert_type(_S, State); return _S.set(n) },
    StatePush: function (_S, ...__k) { __assert_type(_S, State); _S.push(...__k) },
    StatePop: function (_S) { __assert_type(_S, State); _S.pop() },
    StateAdd: function (_S, ...__k) { __assert_type(_S, State); _S.add(...__k) },
    StateRemove: function (_S, n = 1) { __assert_type(_S, State); _S.remove(n) },
    StateStringify: function (_S, __sep = ',') { __assert_type(_S, State); return _S.stringify(__sep) },
    StateNowPos: function (_S) { __assert_type(_S, State); return _S.nowPosition() },
    SizeOfState: function (_S) { __assert_type(_S, State); return _S.size() }
  })
})()
