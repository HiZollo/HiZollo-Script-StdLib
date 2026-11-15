// #noimport
function __assert_type(obj, ClassRef) {
  if (!ClassRef.is_valid(obj)) {
    throw new HZSRuntimeError("INCORRECT_CONTAINER", {
      expect: ClassRef.CONTAINER_NAME,
      received: obj?.constructor?.CONTAINER_NAME ?? (obj === null ? "null" : typeof obj)
    })
  }
}
