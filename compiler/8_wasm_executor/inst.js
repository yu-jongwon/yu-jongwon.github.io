export default {
  section: {
    type: 0x01,
    import: 0x02,
    func: 0x03,
    table: 0x04,
    mem: 0x05,
    global: 0x06,
    export: 0x07,
    start: 0x08,
    element: 0x09,
    code: 0x0a,
    data: 0x0b
  },
  type: {
    f64: 0x7c,
    i32: 0x7f,
    void: 0x40,
    func: 0x60,
    funcref: 0x70
  },
  limits: {
    min: 0x00,
    minmax: 0x01
  },
  desc: {
    func: 0x00,
    table: 0x01,
    mem: 0x02,
    global: 0x03
  },
  mut: {
    const: 0x01,
    var: 0x02
  },
  i32: {
    const: 0x41,
    eq: 0x46,
    ne: 0x47,
    gt_s: 0x4a,
    lt_s: 0x48,
    ge_s: 0x4e,
    le_s: 0x4C,
    add: 0x6a,
    sub: 0x6b,
    mul: 0x6c,
    div_s: 0x6d,
    div_u: 0x6e,
    rem_s: 0x6f,
    trunc_f64_u: 0xab,
    load: 0x28,
    store: 0x36
  },
  i64: {
    const: 0x42,
    extend_i32_u: 0xad,
    shl: 0x86,
    or: 0x84
  },
  f64: {
    const: 0x44,
    eq: 0x61,
    ne: 0x62,
    gt: 0x64,
    lt: 0x63,
    ge: 0x66,
    le: 0x65,
    add: 0xa0,
    sub: 0xa1,
    mul: 0xa2,
    div: 0xa3,
    convert_i32_u: 0xb8,
    neg: 0x9a,
    load: 0x2b,
    store: 0x39,
    reinterpret_i64: 0xbf
  },
  local: {
    get: 0x20,
    set: 0x21,
    tee: 0x22
  },
  global: {
    get: 0x23,
    set: 0x24
  },
  ctrl: {
    nop: 0x01,
    block: 0x02,
    loop: 0x03,
    if: 0x04,
    else: 0x05,
    end: 0x0b,
    br: 0x0c,
    br_if: 0x0d,
    return: 0x0f,
    drop: 0x1a,
    call: 0x10,
    call_indirect: 0x11
  }
}