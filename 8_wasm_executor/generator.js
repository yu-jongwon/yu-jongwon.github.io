import * as Node from '../2_parser/node.js'
import inst from './inst.js'

export default function generateWasm (module) {
  const typeSection = generateTypeSection(module)
  const importSection = generateImportSection(module)
  const funcSection = generateFuncSection(module)
  const tableSection = generateTableSection(module)
  const globalSection = generateGlobalSection(module)
  const exportSection = generateExportSection(module)
  const elementSection = generateElementSection(module)
  const codeSection = generateCodeSection(module)
  const dataSection = generateDataSection(module)

  return Uint8Array.from([
    0x00, 0x61, 0x73, 0x6d, // magic number: \0asm
    0x01, 0x00, 0x00, 0x00, // version: 1
    inst.section.type, encodeLeb128(typeSection.length), typeSection,
    inst.section.import, encodeLeb128(importSection.length), importSection,
    inst.section.func, encodeLeb128(funcSection.length), funcSection,
    inst.section.table, encodeLeb128(tableSection.length), tableSection,
    inst.section.global, encodeLeb128(globalSection.length), globalSection,
    inst.section.export, encodeLeb128(exportSection.length), exportSection,
    inst.section.element, encodeLeb128(elementSection.length), elementSection,
    inst.section.code, encodeLeb128(codeSection.length), codeSection,
    inst.section.data, encodeLeb128(dataSection.length), dataSection
  ].flat())
}

function generateTypeSection (module) {
  const length = module.signatures.length
  const signatures = module.signatures.map(v => v.generateWasm(module))
  return [
    length,
    signatures
  ].flat(2)
}

function generateImportSection (module) {
  const memName = Array.from((new TextEncoder().encode('mem')))
  const memNameLength = memName.length
  const length = module.callables.filter(v => v.of(Node.Declare)).length + 1
  const declares = module.callables.filter(v => v.of(Node.Declare)).map(v => v.generateWasm(module))
  return [
    length,
    0x00, memNameLength, memName, inst.desc.mem, 0x00, 0x01, // limits: flags, initial
    declares
  ].flat(2)
}

function generateFuncSection (module) {
  const callables = module.callables.filter(v => v.of(Node.Func, Node.Lambda, Node.Method))
  const length = callables.length
  const indices = callables.map(v => v.type.index)
  return [
    length,
    indices
  ].flat()
}

function generateTableSection (module) {
  const length = module.callables.length
  return [
    0x01, // number of tables
    inst.type.funcref,
    inst.limits.min,
    length
  ].flat()
}

function generateMemorySection (module) { } // eslint-disable-line

function generateGlobalSection (module) {
  return [
    0x02, // number of globals
    inst.type.i32,
    inst.mut.const,
    inst.i32.const, 0x00,
    inst.ctrl.end,
    inst.type.f64,
    inst.mut.const,
    inst.f64.const, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    inst.ctrl.end
  ].flat()
}

function generateExportSection (module) {
  const name = Array.from((new TextEncoder().encode('main')))
  const index = module.callables[module.callables.length - 1].index
  return [
    0x01, // number of exports
    name.length,
    name,
    inst.desc.func,
    index
  ].flat()
}

function generateStartSection (module) { } // eslint-disable-line

function generateElementSection (module) {
  const length = module.callables.length
  const indices = module.callables.map((_, i) => i)
  return [
    0x01, // number of elements
    0x00, // table index
    inst.i32.const, 0x00, // element starts offset
    inst.ctrl.end,
    length,
    indices
  ].flat()
}

function generateCodeSection (module) {
  const funcs = module.callables.filter(v => v.of(Node.Func, Node.Lambda, Node.Method))
  const length = funcs.length
  const codes = funcs.map(v => v.generateWasm(module))
  const sizeAndCodes = codes.map(v => [encodeLeb128(v.length), v])
  return [
    length,
    sizeAndCodes
  ].flat(3)
}

function generateDataSection (module) {
  const data = module.strings.flatMap(v => {
    const buf = new Uint32Array(v.length + 3)
    buf[0] = buf[buf.length - 1] = buf.byteLength + 1 // memhdr, memftr (bytes length)
    buf[1] = v.length // string length
    buf.set(v.split('').map(v => v.codePointAt(0) || 0), 2)
    return Array.from(new Uint8Array(buf.buffer))
  })
  const length = encodeLeb128(data.length)
  return [
    0x01, // number of data segments
    0x00, // memory index
    inst.i32.const, 0x00,
    inst.ctrl.end,
    length,
    data
  ].flat(2)
}

Node.FuncType.generateWasm = function (module) {
  const length = this.params.length
  const params = this.params.map(v => v.type.of(Node.NumberType) ? inst.type.f64 : inst.type.i32)
  const result = this.result.of(Node.VoidType)
    ? 0x00
    : [0x01, this.result.of(Node.NumberType) ? inst.type.f64 : inst.type.i32]
  return [
    inst.type.func,
    length,
    params,
    result
  ].flat()
}

Node.Declare.generateWasm = function (module) {
  const funcName = new TextEncoder().encode(this.name)
  const funcNameLength = funcName.length
  const funcNameString = Array.from(funcName)
  const typeIndex = this.type.index
  return [
    0x00, // module name length
    funcNameLength,
    funcNameString,
    inst.desc.func,
    typeIndex
  ].flat()
}

Node.Method.generateWasm =
Node.Func.generateWasm =
Node.Lambda.generateWasm = function (module) {
  const length = this.locals.length - this.type.params.length
  const locals = this.locals.slice(this.type.params.length)
    .map(v => [0x01, v.of(Node.NumberType) ? inst.type.f64 : inst.type.i32])
  const block = this.block.generateWasm(module)
  return [
    length,
    locals,
    block,
    inst.ctrl.end
  ].flat(2)
}

Node.Let.generateWasm = function (module) {
  if (!this.expr) return []
  const expr = this.expr.generateWasm(module)
  const index = this.index
  return [
    expr,
    inst.local.set, index
  ].flat()
}

Node.For.generateWasm = function (module) {
  const init = this.init.generateWasm(module)
  const cond = this.cond.generateWasm(module)
  const expr = this.expr.generateWasm(module)
  const drop = this.expr.type.of(Node.VoidType) ? [] : inst.ctrl.drop
  const stmt = this.stmt.generateWasm(module)
  return [
    init,
    inst.ctrl.block, inst.type.void,
    inst.ctrl.loop, inst.type.void,
    cond,
    inst.ctrl.if, inst.type.void,
    stmt,
    inst.ctrl.else,
    inst.ctrl.br, 0x02,
    inst.ctrl.end,
    expr,
    drop,
    inst.ctrl.br, 0x00,
    inst.ctrl.end,
    inst.ctrl.end
  ].flat()
}

Node.While.generateWasm = function (module) {
  const cond = this.cond.generateWasm(module)
  const stmt = this.stmt.generateWasm(module)
  return [
    inst.ctrl.block, inst.type.void,
    inst.ctrl.loop, inst.type.void,
    cond,
    inst.ctrl.if, inst.type.void,
    stmt,
    inst.ctrl.else,
    inst.ctrl.br, 0x02,
    inst.ctrl.end,
    inst.ctrl.br, 0x00,
    inst.ctrl.end,
    inst.ctrl.end
  ].flat()
}

Node.If.generateWasm = function (module) {
  const cond = this.cond.generateWasm(module)
  const then = this.then.generateWasm(module)
  const _else = this._else ? this._else.generateWasm(module) : []
  return [
    cond,
    inst.ctrl.if, inst.type.void,
    then,
    inst.ctrl.else,
    _else,
    inst.ctrl.end
  ].flat(2)
}

Node.Block.generateWasm = function (module) {
  return this.stmts.map(v => v.generateWasm(module)).flat()
}

Node.Return.generateWasm = function (module) {
  const expr = this.expr ? this.expr.generateWasm(module) : []
  return [expr, inst.ctrl.return].flat()
}

Node.Break.generateWasm = function (module) {
  const depth = this.depth
  return [inst.ctrl.br, depth]
}

Node.Continue.generateWasm = function (module) {
  const depth = this.depth
  return [inst.ctrl.br, depth]
}

Node.Delete.generateWasm = function (module) {
  const freeFunc = module.callables.find(v => v.name === 'free')
  if (!freeFunc) throw new Error('internal error')
  const expr = this.expr.generateWasm(module)
  const callDestructor = this.index === undefined
    ? []
    : [
        inst.global.set, 0x00,
        inst.global.get, 0x00,
        inst.ctrl.call, this.index,
        inst.global.get, 0x00
      ]
  const freeFuncIndex = freeFunc.index
  return [
    expr,
    callDestructor,
    inst.f64.convert_i32_u,
    inst.ctrl.call, freeFuncIndex
  ].flat()
}

Node.Print.generateWasm = function (module) {
  const func = module.callables.find(v => v.name === 'write')
  if (!func) throw new Error('internal error')
  const funcIndex = func.index
  return this.args.map(v => {
    if (v.type.of(Node.NumberType)) {
      const expr = v.generateWasm(module)
      return [
        expr,
        inst.ctrl.call, funcIndex
      ]
    }
    const expr = v.generateWasm(module)
    const header = {
      [Node.BooleanType.kind]: 0x7ff90000,
      [Node.StringType.kind]: 0x7ffa0000
    }[v.type.kind]
    return [
      expr,
      inst.i64.extend_i32_u,
      inst.i64.const, encodeLeb128(header),
      inst.i64.const, encodeLeb128(0x20),
      inst.i64.shl,
      inst.i64.or,
      inst.f64.reinterpret_i64,
      inst.ctrl.call, funcIndex
    ]
  }).flat(2)
}

Node.PrintLine.generateWasm = function (module) {
  const func = module.callables.find(v => v.name === 'write')
  if (!func) throw new Error('internal error')
  const funcIndex = func.index
  const print = this.print.generateWasm(module)
  return [
    print,
    inst.i64.const, encodeLeb128(0x7ffb0000),
    inst.i64.const, encodeLeb128(0x20),
    inst.i64.shl,
    inst.f64.reinterpret_i64,
    inst.ctrl.call, funcIndex
  ].flat()
}

Node.ExprStmt.generateWasm = function (module) {
  const expr = this.expr.generateWasm(module)
  const drop = this.expr.type.of(Node.VoidType) ? [] : inst.ctrl.drop
  return [expr, drop].flat()
}

Node.SetLocal.generateWasm = function (module) {
  const expr = this.right.generateWasm(module)
  const index = this.index
  return [
    expr,
    inst.local.tee, index
  ].flat()
}

Node.SetField.generateWasm = function (module) {
  const left = this.left.generateWasm(module)
  const right = this.right.generateWasm(module)
  const globalIndex = this.type.of(Node.NumberType) ? 0x01 : 0x00
  const store = this.type.of(Node.NumberType) ? inst.f64.store : inst.i32.store
  const align = this.type.of(Node.NumberType) ? 0x03 : 0x02
  const offset = this.offset
  return [
    left,
    right,
    inst.global.set, globalIndex,
    inst.global.get, globalIndex,
    store, align, offset,

    inst.global.get, globalIndex
  ].flat()
}

Node.SetElement.generateWasm = function (module) {
  const left = this.left.generateWasm(module)
  const index = this.index.generateWasm(module)
  const right = this.right.generateWasm(module)
  const globalIndex = this.type.of(Node.NumberType) ? 0x01 : 0x00
  const size = this.type.of(Node.NumberType) ? 0x08 : 0x04
  const store = this.type.of(Node.NumberType) ? inst.f64.store : inst.i32.store
  const align = this.type.of(Node.NumberType) ? 0x03 : 0x02
  const offset = 0x00
  return [
    left,
    index,
    inst.i32.trunc_f64_u,
    inst.i32.const, size,
    inst.i32.mul,
    inst.i32.add,
    right,
    inst.global.set, globalIndex,
    inst.global.get, globalIndex,
    store, align, offset,

    inst.global.get, globalIndex
  ].flat()
}

Node.Or.generateWasm = function (module) {
  const left = this.left.generateWasm(module)
  const right = this.right.generateWasm(module)
  return [
    left,
    inst.ctrl.if, inst.type.i32,
    inst.i32.const, 0x01,
    inst.ctrl.else,
    right,
    inst.ctrl.end
  ].flat()
}

Node.And.generateWasm = function (module) {
  const left = this.left.generateWasm(module)
  const right = this.right.generateWasm(module)
  return [
    left,
    inst.i32.const, 0x00,
    inst.i32.eq,
    inst.ctrl.if, inst.type.i32,
    inst.i32.const, 0x00,
    inst.ctrl.else,
    right,
    inst.ctrl.end
  ].flat()
}

Node.Binary.generateWasm = function (module) {
  const left = this.left.generateWasm(module)
  const right = this.right.generateWasm(module)
  let op
  switch (this.op) {
    case '+': op = inst.f64.add; break
    case '-': op = inst.f64.sub; break
    case '*': op = inst.f64.mul; break
    case '/': op = inst.f64.div; break
    case '%': {
      const func = module.callables.find(v => v.name === 'fmod')
      if (!func) throw new Error('internal error')
      const funcIndex = func.index
      op = [inst.ctrl.call, funcIndex]
      break
    }
    case '<': op = inst.f64.lt; break
    case '>': op = inst.f64.gt; break
    case '<=': op = inst.f64.le; break
    case '>=': op = inst.f64.ge; break
    case '==': {
      if (this.left.type.of(Node.NumberType) &&
          this.right.type.of(Node.NumberType)) {
        op = inst.f64.eq
      } else {
        op = inst.i32.eq
      }
      break
    }
    case '!=': {
      if (this.left.type.of(Node.NumberType) &&
        this.right.type.of(Node.NumberType)) {
        op = inst.f64.ne
      } else {
        op = inst.i32.ne
      }
      break
    }
    default: throw new Error('internal error')
  }
  return [left, right, op].flat()
}

Node.Unary.generateWasm = function (module) {
  const expr = this.expr.generateWasm(module)
  switch (this.op) {
    case '-': return [expr, inst.f64.neg].flat()
  }
  throw new Error('internal error')
}

Node.Literal.generateWasm = function (module) {
  switch (this.type.kind) {
    case Node.NullType.kind: {
      const value = 0x00
      return [inst.i32.const, value]
    }
    case Node.BooleanType.kind: {
      const value = this.value ? 0x01 : 0x00
      return [inst.i32.const, value]
    }
    case Node.NumberType.kind: {
      const value = float64bytes(this.value)
      return [inst.f64.const, value].flat()
    }
    case Node.StringType.kind: {
      // memhdr(1) + strhdr(1) + strlen + memftr(1), memhdr(1)
      const fn = (p, c) => p + c.length + 3
      const index = module.strings.slice(0, this.index).reduce(fn, 1)
      const value = encodeLeb128(index)
      return [inst.i32.const, value].flat()
    }
  }
  throw new Error('internal error')
}

Node.GetLocal.generateWasm = function (module) {
  const index = this.index
  return [inst.local.get, index]
}

Node.GetFunc.generateWasm =
Node.GetMethod.generateWasm = function (module) {
  const index = this.index
  return [inst.i32.const, index]
}

Node.GetField.generateWasm = function (module) {
  const left = this.left.generateWasm(module)
  const load = this.type.of(Node.NumberType) ? inst.f64.load : inst.i32.load
  const align = this.type.of(Node.NumberType) ? 0x03 : 0x02
  const offset = this.offset
  return [
    left,
    load, align, offset
  ].flat()
}

Node.GetElement.generateWasm = function (module) {
  const left = this.left.generateWasm(module)
  const index = this.index.generateWasm(module)
  const size = this.type.of(Node.NumberType) ? 0x08 : 0x04
  const load = this.type.of(Node.NumberType) ? inst.f64.load : inst.i32.load
  const align = this.type.of(Node.NumberType) ? 0x03 : 0x02
  const offset = 0x00
  return [
    left,
    index,
    inst.i32.trunc_f64_u,
    inst.i32.const, size,
    inst.i32.mul,
    inst.i32.add,
    load, align, offset
  ].flat()
}

Node.Length.generateWasm = function (module) {
  const expr = this.expr.generateWasm(module)
  if (this.expr.type.of(Node.ArrayType)) {
    const align = 0x02
    const offset = 0x00
    const size = this.expr.type.base.of(Node.NumberType) ? 0x08 : 0x04
    return [
      expr,
      inst.i32.const, 0x04,
      inst.i32.sub,
      inst.i32.load, align, offset,
      inst.i32.const, 0x09,
      inst.i32.sub,
      inst.i32.const, size,
      inst.i32.div_u,
      inst.f64.convert_i32_u
    ].flat()
  }
  if (this.expr.type.of(Node.StringType)) {
    const align = 0x02
    const offset = 0x00
    return [
      expr,
      inst.i32.const, 0x04,
      inst.i32.mul,
      inst.i32.load, align, offset,
      inst.f64.convert_i32_u
    ].flat()
  }
  throw new Error('internal error')
}

Node.NewArray.generateWasm = function (module) {
  const func = module.callables.find(v => v.name === 'alloc')
  if (!func) throw new Error('internal error')
  const expr = this.expr.generateWasm(module)
  const size = float64bytes(this.type.base.of(Node.NumberType) ? 0x08 : 0x04)
  const funcIndex = func.index
  return [
    expr,
    inst.f64.const, size,
    inst.f64.mul,
    inst.ctrl.call, funcIndex,
    inst.i32.trunc_f64_u
  ].flat()
}

Node.NewClass.generateWasm = function (module) {
  const allocFunc = module.callables.find(v => v.name === 'alloc')
  if (!allocFunc) throw new Error('internal error')
  const size = float64bytes(this.size)
  const allocFuncIndex = allocFunc.index
  const args = this.args.map(v => v.generateWasm(module)).flat()
  const callConstructor = this.index === undefined
    ? []
    : [
        inst.global.set, 0x00,
        inst.global.get, 0x00,
        inst.global.get, 0x00,
        args,
        inst.ctrl.call, this.index
      ].flat()
  return [
    inst.f64.const, size,
    inst.ctrl.call, allocFuncIndex,
    inst.i32.trunc_f64_u,
    callConstructor
  ].flat()
}

Node.Call.generateWasm = function (module) {
  if (!this.left.type.of(Node.FuncType)) throw new Error('internal error')
  const args = this.args.map(v => v.generateWasm(module)).flat()
  const left = this.left.generateWasm(module)
  const typeIndex = this.left.type.index
  return [
    args,
    left,
    inst.ctrl.call_indirect, typeIndex, 0x00 // table index
  ].flat()
}

function encodeLeb128 (value) {
  value |= 0
  const result = []
  while (true) {
    const byte = value & 0x7f
    value >>= 7
    if ((value === 0 && (byte & 0x40) === 0) || (value === -1 && (byte & 0x40) !== 0)) {
      result.push(byte)
      return result
    }
    result.push(byte | 0x80)
  }
}

function float64bytes (value) {
  const buf = new ArrayBuffer(8)
  new DataView(buf).setFloat64(0, value, true)
  return Array.from(new Uint8Array(buf))
}
