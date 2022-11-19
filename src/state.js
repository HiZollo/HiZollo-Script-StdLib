/***** State Module for HiZollo Script *****/
/***** Implemented by HiZollo Dev Team *****/

/***** State Class Implementation *****/
class _State {
  constructor() {
    this.states = []
    this.index = 0
    
    /***** Standard Library Container Tag *****/
    this.__std = {
      container: true,
      container_type: "std.state"
    }
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

  static is_state_con(_Con) {
    return _Con.__std && _Con.__std.container && _Con.__std.container_type === "std.state"
  }
}

function __check_con_type(_S) {
  if (!_State.is_state_con(_S)) throw Error("Not State Container")
}


/***** HiZollo Script Interface Function *****/
function newState() {
  return new _State()
}

function StateNext(_S) { __check_con_type(_S); _S.next() }
function StatePrev(_S) { __check_con_type(_S); _S.prev() }
function StateMove(_S, n) { __check_con_type(_S); _S.move(n) }
function StateGo(_S, n) { __check_con_type(_S); _S.go(n) }
function StateAccess(_S) { __check_con_type(_S); return _S.access() }
function StateSet(_S, n) { __check_con_type(_S); return _S.set(n) }
function StatePush(_S, ...__k) { __check_con_type(_S); _S.push(...__k) }
function StatePop(_S) { __check_con_type(_S); _S.pop() }
function StateAdd(_S, ...__k) { __check_con_type(_S); _S.add(...__k) }
function StateRemove(_S, n = 1) { __check_con_type(_S); s.remove(n) }
function StateStringify(_S, __sep = ',') { __check_con_type(_S); return _S.stringify(__sep) }
function StateNowPos(_S) { __check_con_type(_S); return _S.nowPosition() }
function SizeOfState(s) { __check_con_type(s); return s.size() }
