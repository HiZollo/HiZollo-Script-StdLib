(function () {
  __hzs_export("std.io", {
    print: function(str) { _write(`${str}`) },
    println: function(str) { _write(`${str}\n`) },
  })
})()
