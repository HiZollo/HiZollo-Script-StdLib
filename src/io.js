(function () {
  function format(str, ...args) {
    let index = 0;
    return str.replace(/%s/g, () => (index < args.length ? args[index++] : '%s'));
  }
  __hzs_export("std.io", {
    print: function(fmt = '', ...args) { _write(format(fmt, ...args)) },
    println: function(fmt = '', ...args) { _write(format(`${fmt}\n`, ...args)) },
  })
})()
