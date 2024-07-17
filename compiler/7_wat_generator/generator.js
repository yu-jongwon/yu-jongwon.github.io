import * as Node from '../2_parser/node.js'

export default function generate (module) {
  const types = module.signatures.map(v => v.generate(module)).join('\n')
  const funcs = module.callables.map(v => v.generate(module)).join('\n')
  const tableLength = module.callables.length
  const mainFuncIndex = module.callables[module.callables.length - 1].index
  const elements = module.callables.map((_, i) => i).join(' ')
  const data = module.strings.map(v => {
    const buf = new Uint32Array(v.length + 3) // memhdr + strlen + str + memftr
    buf[0] = buf[buf.length - 1] = buf.byteLength + 1 // memhdr, memftr (bytes length)
    buf[1] = v.length // string length
    buf.set(v.split('').map(v => v.codePointAt(0) || 0), 2)
    return Array.from(new Uint8Array(buf.buffer))
      .map(v => '\\' + v.toString(16).padStart(2, '0'))
      .join('')
  }).join('')

  return `
    (module
      ${types}
      (import "" "mem" (memory 1))
      ${funcs}
      (global (mut i32) (i32.const 0))
      (global (mut f64) (f64.const 0))
      (table ${tableLength} funcref)
      (export "main" (func ${mainFuncIndex}))
      (elem (i32.const 0) ${elements})
      (data (i32.const 0) "${data}")
    )
  `
}

Node.FuncType.generate = function (module) {
  const params = this.params.map(v => v.type.of(Node.NumberType) ? 'f64' : 'i32').join(' ')
  const result = this.result.of(Node.VoidType)
    ? ''
    : this.result.of(Node.NumberType) ? 'f64' : 'i32'
  return `(type (func (param ${params}) (result ${result})))`
}

Node.Declare.generate = function (module) {
  const funcName = this.name
  const index = this.type.index
  return `(import "" "${funcName}" (func (type ${index})))`
}

Node.Method.generate =
Node.Func.generate =
Node.Lambda.generate = function (module) {
  const index = this.type.index
  const types = this.locals.slice(this.type.params.length)
    .map(v => v.of(Node.NumberType) ? 'f64' : 'i32').join(' ')
  const block = this.block.generate(module)
  return `
    (func (type ${index})
      (local ${types})
      ${block}
    )
  `
}

Node.Let.generate = function (module) {
  if (!this.expr) return ''
  const expr = this.expr.generate(module)
  const index = this.index
  return `
    ${expr}
    (local.set ${index})
  `
}

Node.For.generate = function (module) {
  const init = this.init.generate(module)
  const cond = this.cond.generate(module)
  const expr = this.expr.generate(module)
  const drop = this.expr.type.of(Node.VoidType) ? '' : '(drop)'
  const stmt = this.stmt.generate(module)
  return `
    ${init}
    (block
      (loop
        ${cond}
        (if
          (then ${stmt})
          (else (br 2))
        )
        ${expr}
        ${drop}
        (br 0)
      )
    )
  `
}

Node.While.generate = function (module) {
  const cond = this.cond.generate(module)
  const stmt = this.stmt.generate(module)
  return `
    (block
      (loop
        ${cond}
        (if
          (then ${stmt})
          (else (br 2))
        )
        (br 0)
      )
    )
  `
}

Node.If.generate = function (module) {
  const cond = this.cond.generate(module)
  const then = this.then.generate(module)
  const _else = this._else ? this._else.generate(module) : ''
  return `
    ${cond}
    (if
      (then ${then})
      (else ${_else})
    )
  `
}

Node.Block.generate = function (module) {
  return this.stmts.map(v => v.generate(module)).join('')
}

Node.Return.generate = function (module) {
  const expr = this.expr ? this.expr.generate(module) : ''
  return `${expr} (return)`
}

Node.Break.generate = function (module) {
  const depth = this.depth
  return `(br ${depth})`
}

Node.Continue.generate = function (module) {
  const depth = this.depth
  return `(br ${depth})`
}

Node.Delete.generate = function (module) {
  const freeFunc = module.callables.find(v => v.name === 'free')
  if (!freeFunc) throw new Error('internal error')
  const expr = this.expr.generate(module)
  const callDestructor = this.index === undefined
    ? ''
    : `
      (global.set 0)
      (global.get 0)
      (call ${this.index})
      (global.get 0)
    `
  const freeFuncIndex = freeFunc.index
  return `
    ${expr}
    ${callDestructor}
    (f64.convert_i32_u)
    (call ${freeFuncIndex})
  `
}

Node.Print.generate = function (module) {
  const func = module.callables.find(v => v.name === 'write')
  if (!func) throw new Error('internal error')
  const funcIndex = func.index
  return this.args.map(v => {
    if (v && v.type.of(Node.NumberType)) {
      const expr = v.generate(module)
      return `
        ${expr}
        (call ${funcIndex})
      `
    }
    const expr = v.generate(module)
    const header = {
      [Node.BooleanType.kind]: 0x7ff90000,
      [Node.StringType.kind]: 0x7ffa0000
    }[v.type.kind]
    return `
      ${expr}
      (i64.extend_i32_u)
      (i64.const ${header})
      (i64.const 32)
      (i64.shl)
      (i64.or)
      (f64.reinterpret_i64)
      (call ${funcIndex})
    `
  }).join('\n')
}

Node.PrintLine.generate = function (module) {
  const func = module.callables.find(v => v.name === 'write')
  if (!func) throw new Error('internal error')
  const funcIndex = func.index
  const print = this.print.generate(module)
  return `
    ${print}
    (i64.const ${0x7ffb0000})
    (i64.const 32)
    (i64.shl)
    (f64.reinterpret_i64)
    (call ${funcIndex})
  `
}

Node.ExprStmt.generate = function (module) {
  const expr = this.expr.generate(module)
  const drop = this.expr.type.of(Node.VoidType) ? '' : '(drop)'
  return `${expr} ${drop}`
}

Node.SetLocal.generate = function (module) {
  const expr = this.right.generate(module)
  const index = this.index
  return `
    ${expr}
    (local.tee ${index})
  `
}

Node.SetField.generate = function (module) {
  const left = this.left.generate(module)
  const offset = this.offset
  const right = this.right.generate(module)
  const globalIndex = this.type.of(Node.NumberType) ? 0x01 : 0x00
  const store = this.type.of(Node.NumberType) ? '(f64.store)' : '(i32.store)'
  return `
    ${left}
    (i32.const ${offset})
    (i32.add)
    (global.set 0)
    (global.get 0)
    ${right}
    (global.set ${globalIndex})
    (global.get ${globalIndex})
    ${store}

    (global.get ${globalIndex})
  `
}

Node.SetElement.generate = function (module) {
  const left = this.left.generate(module)
  const index = this.index.generate(module)
  const right = this.right.generate(module)
  const globalIndex = this.type.of(Node.NumberType) ? 0x01 : 0x00
  const size = this.type.of(Node.NumberType) ? 8 : 4
  const store = this.type.of(Node.NumberType) ? '(f64.store)' : '(i32.store)'
  return `
    ${left}
    ${index}
    (i32.trunc_f64_u)
    (i32.const ${size})
    (i32.mul)
    (i32.add)
    ${right}
    (global.set ${globalIndex})
    (global.get ${globalIndex})
    ${store}

    (global.get ${globalIndex})
  `
}

Node.Or.generate = function (module) {
  const left = this.left.generate(module)
  const right = this.right.generate(module)
  return `
    ${left}
    (if (result i32)
      (then (i32.const 1))
      (else ${right})
    )
  `
}

Node.And.generate = function (module) {
  const left = this.left.generate(module)
  const right = this.right.generate(module)
  return `
    ${left}
    (i32.const 0)
    (i32.eq)
    (if (result i32)
      (then (i32.const 0))
      (else ${right})
    )
  `
}

Node.Binary.generate = function (module) {
  const left = this.left.generate(module)
  const right = this.right.generate(module)
  let op
  switch (this.op) {
    case '+': op = '(f64.add)'; break
    case '-': op = '(f64.sub)'; break
    case '*': op = '(f64.mul)'; break
    case '/': op = '(f64.div)'; break
    case '%': {
      const func = module.callables.find(v => v.name === 'fmod')
      if (!func) throw new Error('internal error')
      const funcIndex = func.index
      op = `(call ${funcIndex})`
      break
    }
    case '<': op = '(f64.lt)'; break
    case '>': op = '(f64.gt)'; break
    case '<=': op = '(f64.le)'; break
    case '>=': op = '(f64.ge)'; break
    case '==': {
      if (this.left.type.of(Node.NumberType) &&
          this.right.type.of(Node.NumberType)) {
        op = '(f64.eq)'
        break
      } else {
        op = '(i32.eq)'
      }
      break
    }
    case '!=': {
      if (this.left.type.of(Node.NumberType) &&
          this.right.type.of(Node.NumberType)) {
        op = '(f64.ne)'
      } else {
        op = '(i32.ne)'
      }
      break
    }
    default: throw new Error('internal error')
  }
  return `${left} ${right} ${op}`
}

Node.Unary.generate = function (module) {
  const expr = this.expr.generate(module)
  switch (this.op) {
    case '-': return `${expr} (f64.neg)`
  }
  throw new Error('internal error')
}

Node.Literal.generate = function (module) {
  switch (this.type.kind) {
    case Node.NullType.kind: return '(i32.const 0)'
    case Node.BooleanType.kind: return `(i32.const ${this.value ? 1 : 0})`
    case Node.NumberType.kind: return `(f64.const ${this.value})`
    case Node.StringType.kind: {
      // memhdr(1) + strhdr(1) + strlen + memftr(1), memhdr(1)
      const fn = (p, c) => p + c.length + 3
      const index = module.strings.slice(0, this.index).reduce(fn, 1)
      return `(i32.const ${index})`
    }
  }
  throw new Error('internal error')
}

Node.GetLocal.generate = function (module) {
  const index = this.index
  return `(local.get ${index})`
}

Node.GetFunc.generate =
Node.GetMethod.generate = function (module) {
  const index = this.index
  return `(i32.const ${index})`
}

Node.GetField.generate = function (module) {
  const left = this.left.generate(module)
  const offset = this.offset
  const load = this.type.of(Node.NumberType) ? '(f64.load)' : '(i32.load)'
  return `
    ${left}
    (i32.const ${offset})
    (i32.add)
    ${load}
  `
}

Node.GetElement.generate = function (module) {
  const left = this.left.generate(module)
  const index = this.index.generate(module)
  const size = this.type.of(Node.NumberType) ? 8 : 4
  const load = this.type.of(Node.NumberType) ? '(f64.load)' : '(i32.load)'
  return `
    ${left}
    ${index}
    (i32.trunc_f64_u)
    (i32.const ${size})
    (i32.mul)
    (i32.add)
    ${load}
  `
}

Node.Length.generate = function (module) {
  const expr = this.expr.generate(module)
  if (this.expr.type.of(Node.ArrayType)) {
    const size = this.expr.type.base.of(Node.NumberType) ? 0x08 : 0x04
    return `
      ${expr}
      (i32.const 4)
      (i32.sub)
      (i32.load)
      (i32.const 9)
      (i32.sub)
      (i32.const ${size})
      (i32.div_u)
      (f64.convert_i32_u)
    `
  }
  if (this.expr.type.of(Node.StringType)) {
    return `
      ${expr}
      (i32.const 4)
      (i32.mul)
      (i32.load)
      (f64.convert_i32_u)
    `
  }
  throw new Error('internal error')
}

Node.NewArray.generate = function (module) {
  const func = module.callables.find(v => v.name === 'alloc')
  if (!func) throw new Error('internal error')
  const expr = this.expr.generate(module)
  const size = this.type.base.of(Node.NumberType) ? 8 : 4
  const funcIndex = func.index
  return `
    ${expr}
    (f64.const ${size})
    (f64.mul)
    (call ${funcIndex})
    (i32.trunc_f64_u)
  `
}

Node.NewClass.generate = function (module) {
  const allocFunc = module.callables.find(v => v.name === 'alloc')
  if (!allocFunc) throw new Error('internal error')
  const size = this.size
  const allocFuncIndex = allocFunc.index
  const args = this.args.map(v => v.generate(module)).join('')
  const callConstructor = this.index === undefined
    ? ''
    : `
      (global.set 0)
      (global.get 0)
      (global.get 0)
      ${args}
      (call ${this.index})
    `
  return `
    (f64.const ${size})
    (call ${allocFuncIndex})
    (i32.trunc_f64_u)
    ${callConstructor}
  `
}

Node.Call.generate = function (module) {
  if (!this.left.type.of(Node.FuncType)) throw new Error('internal error')
  const args = this.args.map(v => v.generate(module)).join('')
  const left = this.left.generate(module)
  const index = this.left.type.index
  return `${args} ${left} (call_indirect (type ${index}))`
}
