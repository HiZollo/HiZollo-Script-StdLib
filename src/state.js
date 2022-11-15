/***** State Module for HiZollo Script *****/
/***** Implemented by HiZollo Dev Team *****/

/***** State Class Implementation *****/
class _State {
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

  remove() {
    const __i = this.trans_valid_index()
    const __ls = this.states.length - 1
    for (let i = __i; i < __ls; ++i) {
      this.states[i] = this.states[i + 1];
    }

    this.pop()
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

}


/***** HiZollo Script Interface Function *****/
function newState() {
  return new _State()
}

function StateNext(s) { s.next() }
function StatePrev(s) { s.prev() }
function StateMove(s, n) { s.move(n) }
function StateGo(s, n) { s.go(n) }
function StateAccess(s) { return s.access() }
function StatePush(s, ...__k) { s.push(...__k) }
function StatePop(s) { s.pop() }
function StateAdd(s, ...__k) { s.add(...__k) }
function StateRemove(s) { s.remove() }
function StateStringify(s, __sep = ',') { return s.stringify(__sep) }
function StateNowPos(s) { return s.nowPosition() }
function SizeOfState(s) { return s.size() }
