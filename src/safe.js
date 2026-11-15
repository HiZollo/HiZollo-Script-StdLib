// #require "__container"
(function () {
  const __safeContainers = new WeakSet();

  class Safe {
    static CONTAINER_NAME = "Safe"
    constructor(hasVal, value, error) {
      this.hasVal = hasVal
      this.val = value
      this.err = error
    }

    hasError() {
      return !this.hasVal
    }

    hasValue() {
      return this.hasVal
    }

    value() {
      if (!this.hasVal) {
        const originalCode = this.err?.code ?? "UNKNOWN_ERROR"
        throw new HZSRuntimeError("UNSAFE_UNWRAP", { 
          originalCode, 
        })
      }
      return this.val;
    }

    valueOf() {
      return this.value();
    }

    toString() {
      return String(this.value());
    }

    static make_ok(value) {
      const s = new Safe(true, value, null);
      __safeContainers.add(s);
      return s;
    }

    static make_err(error) {
      const s = new Safe(false, null, error);
      __safeContainers.add(s);
      return s;
    }

    static is_valid(obj) {
      return __safeContainers.has(obj);
    }
  }

  function safe(fnName, ...args) {
    try {
      const result = __hzs_invoke(fnName, ...args);
      return Safe.make_ok(result);
    } catch (e) {
      return Safe.make_err(e);
    }
  }

  function valueOr(safeObj, defaultValue) {
    __assert_type(safeObj, Safe)
    return safeObj.hasValue() ? safeObj.val : defaultValue;
  }

  function safeOr(defaultValue, fnName, ...args) {
    return valueOr(safe(fnName, ...args), defaultValue);
  }

  __hzs_export("std.safe", {
    safe: safe,
    safeOr: function (defaultValue, fnName, ...args) { return valueOr(safe(fnName, ...args), defaultValue) },
    hasError: function(obj) { __assert_type(obj, Safe); return obj.hasError(); },
    hasValue: function(obj) { __assert_type(obj, Safe); return obj.hasValue(); },
    value: function(obj) { __assert_type(obj, Safe); return obj.value(); },
    valueOr: valueOr
  });
})();
