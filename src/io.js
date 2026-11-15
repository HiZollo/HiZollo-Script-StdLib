// #require "__std"
(function () {
  const _replace = String.prototype.replace;
  function format(str, ...args) {
    if (typeof str !== "string") throw new HZSRuntimeError("INVALID_FORMAT_TEMPLATE", { received: typeof str })
    let index = 0;
    return __apply(_replace, str, [/%s/g, () => (index < args.length ? args[index++] : '%s')])
  }
  __hzs_export("std.io", {
    print: function(fmt = '', ...args) { _write(format(fmt, ...args)) },
    println: function(fmt = '', ...args) { _write(format(fmt, ...args) + "\n") },
  })
})()
