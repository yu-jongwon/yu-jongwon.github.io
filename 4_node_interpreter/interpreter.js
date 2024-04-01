import * as Node from '../2_parser/node.js'

export default function interpret (module, imports = {}) {
  for (const callable of module.callables) {
    if (!callable.of(Node.Declare)) continue
    callable.func = imports[callable.name]
    if (!callable.func) {
      throw new Error(`${callable.name}() 함수의 정의를 찾을 수 없습니다.`)
    }
  }

  try {
    const main = module.callables[module.callables.length - 1]
    main.interpret(module.callables, [])
  } catch (err) {
    if (err instanceof Result) return
    throw err
  }
}

Node.Declare.interpret = function (callables, locals) {
  const result = this.func(...locals)
  throw new Result(result)
}

Node.Method.interpret =
Node.Func.interpret =
Node.Lambda.interpret = function (callables, locals) {
  this.block.interpret(callables, locals)
}

Node.Let.interpret = function (callables, locals) {
  if (!this.expr) return
  const index = this.index
  const expr = this.expr.interpret(callables, locals)
  locals[index] = expr
}

Node.For.interpret = function (callables, locals) {
  this.init.interpret(callables, locals)
  while (true) {
    const cond = this.cond.interpret(callables, locals)
    if (!cond) break
    try {
      this.stmt.interpret(callables, locals)
    } catch (err) {
      if (err instanceof Break) break
      else if (err instanceof Continue) ;
      else throw err
    }
    this.expr.interpret(callables, locals)
  }
}

Node.While.interpret = function (callables, locals) {
  while (true) {
    const cond = this.cond.interpret(callables, locals)
    if (!cond) break
    try {
      this.stmt.interpret(callables, locals)
    } catch (err) {
      if (err instanceof Break) break
      if (err instanceof Continue) continue
      throw err
    }
  }
}

Node.If.interpret = function (callables, locals) {
  const expr = this.cond.interpret(callables, locals)
  if (expr) {
    this.then.interpret(callables, locals)
  } else if (this._else) {
    this._else.interpret(callables, locals)
  }
}

Node.Block.interpret = function (callables, locals) {
  this.stmts.forEach(v => v.interpret(callables, locals))
}

class Result extends Error {
  constructor (result) {
    super()
    this.result = result
  }
}
Node.Return.interpret = function (callables, locals) {
  const expr = this.expr?.interpret(callables, locals)
  throw new Result(expr)
}

class Break extends Error {}
Node.Break.interpret = function (callables, locals) {
  throw new Break()
}

class Continue extends Error {}
Node.Continue.interpret = function (callables, locals) {
  throw new Continue()
}

Node.Delete.interpret = function (callables, locals) { }

Node.Print.interpret = function (callables, locals) {
  // const args = this.args.map(v => v.interpret(callables, locals))
  // process.stdout.write(args.join(' '))
  // process.stdout.write(' ')

  for (const arg of this.args) {
    const value = arg.interpret(callables, locals)
    // process.stdout.write(value.toString() + ' ')
    if (typeof window === 'undefined') {
      switch (arg.type.kind) {
        case Node.BooleanType.kind: process.stdout.write(`\x1b[${value ? 34 : 31}m${value}\x1b[0m `); break
        case Node.NumberType.kind: process.stdout.write(`\x1b[33m${value.toString()}\x1b[0m `); break
        case Node.StringType.kind: process.stdout.write(`\x1b[32m${value}\x1b[0m `); break
        default: throw new Error('internal error')
      }
    } else {
      const output = document.querySelector('#output')
      if (!output) throw new Error('internal error')
      switch (arg.type.kind) {
        case Node.BooleanType.kind: output.innerHTML += `<span style="color: ${value ? '#569cd6' : '#be1100'}">${value ? 'true' : 'false'} </span>`; break
        case Node.NumberType.kind: output.innerHTML += `<span style="color: #b5cea8">${value.toString()} </span>`; break
        case Node.StringType.kind: output.innerHTML += `<span style="color: #ce9178">${value} </span>`; break
        default: throw new Error('internal error')
      }
    }
  }
}

Node.PrintLine.interpret = function (callables, locals) {
  this.print.interpret(callables, locals)
  if (typeof window === 'undefined') {
    process.stdout.write('\n')
  } else {
    const output = document.querySelector('#output')
    if (!output) throw new Error('internal error')
    output.innerHTML += '<br>'
  }
}

Node.ExprStmt.interpret = function (callables, locals) {
  this.expr.interpret(callables, locals)
}

Node.SetLocal.interpret = function (callables, locals) {
  const index = this.index
  const right = this.right.interpret(callables, locals)
  locals[index] = right
  return right
}

Node.SetField.interpret = function (callables, locals) {
  const left = this.left.interpret(callables, locals)
  const index = this.index
  const right = this.right.interpret(callables, locals)
  left[index] = right
  return right
}

Node.SetElement.interpret = function (callables, locals) {
  const left = this.left.interpret(callables, locals)
  const index = this.index.interpret(callables, locals)
  const right = this.right.interpret(callables, locals)
  left[Math.floor(index)] = right
  return right
}

Node.Or.interpret = function (callables, locals) {
  const left = this.left.interpret(callables, locals)
  if (left) return true
  return this.right.interpret(callables, locals)
}

Node.And.interpret = function (callables, locals) {
  const left = this.left.interpret(callables, locals)
  if (!left) return false
  return this.right.interpret(callables, locals)
}

Node.Binary.interpret = function (callables, locals) {
  const left = this.left.interpret(callables, locals)
  const right = this.right.interpret(callables, locals)
  switch (this.op) {
    case '+': return left + right
    case '-': return left - right
    case '*': return left * right
    case '/': return left / right
    case '%': return left % right
    case '<': return left < right
    case '>': return left > right
    case '<=': return left <= right
    case '>=': return left >= right
    case '==': return left === right
    case '!=': return left !== right
  }
  throw new Error('internal error')
}

Node.Unary.interpret = function (callables, locals) {
  const expr = this.expr.interpret(callables, locals)
  switch (this.op) {
    case '-': return -expr
  }
  throw new Error('internal error')
}

Node.Literal.interpret = function (callables, locals) {
  return this.value
}

Node.GetLocal.interpret = function (callables, locals) {
  const index = this.index
  return locals[index]
}

Node.GetFunc.interpret =
Node.GetMethod.interpret = function (callables, locals) {
  return this.index
}

Node.GetField.interpret = function (callables, locals) {
  const left = this.left.interpret(callables, locals)
  const index = this.index
  return left[index]
}

Node.GetElement.interpret = function (callables, locals) {
  const left = this.left.interpret(callables, locals)
  const index = this.index.interpret(callables, locals)
  return left[Math.floor(index)]
}

Node.Length.interpret = function (callables, locals) {
  const expr = this.expr.interpret(callables, locals)
  return expr.length
}

Node.NewArray.interpret = function (callables, locals) {
  const expr = this.expr.interpret(callables, locals)
  const len = Math.floor(expr)
  return new Array(len)
}

Node.NewClass.interpret = function (callables, locals) {
  const instance = new Array(this.length)
  if (this.index !== undefined) {
    const func = callables[this.index]
    const args = this.args.map(v => v.interpret(callables, locals))
    func.interpret(callables, [instance, ...args])
  }
  return instance
}

Node.Call.interpret = function (callables, locals) {
  const left = this.left.interpret(callables, locals)
  const args = this.args.map(v => v.interpret(callables, locals))
  const func = callables[left]
  try {
    func.interpret(callables, args)
  } catch (err) {
    if (err instanceof Result) return err.result
    throw err
  }
}
