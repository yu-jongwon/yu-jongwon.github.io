import * as Node from '../2_parser/node.js'
import * as Scope from './scope.js'

export default function resolve (ast) {
  const global = Scope.Global.create()
  const local = Scope.Local.create()
  ast.declares.forEach(v => v.resolve(global, local))
  ast.classes.forEach(v => v.resolve(global, local))
  ast.main.resolve(global, local)
  global.set(ast.main)
  return {
    signatures: global.signatures,
    strings: global.strings,
    callables: global.callables
  }
}

Node.VoidType.resolve = function (global, local) {}

Node.NullType.resolve = function (global, local) {}

Node.BooleanType.resolve = function (global, local) {}

Node.NumberType.resolve = function (global, local) {}

Node.StringType.resolve = function (global, local) {}

Node.ArrayType.resolve = function (global, local) {
  this.base.resolve(global, local)
}

Node.FuncType.resolve = function (global, local) {
  global.setSignature(this)
  this.params.forEach(v => v.type.resolve(global, local))
  this.result.resolve(global, local)
}

Node.ClassType.resolve = function (global, local) {
  const symbol = global.get(this.name)
  if (symbol.of(Node.Class)) return
  throw new Error(`${this.name} 정의되지 않은 클래스입니다.`)
}

Node.Declare.resolve = function (global, local) {
  global.set(this)
  this.type.resolve(global, local)
}

Node.Class.resolve = function (global, local) {
  global.set(this)
  const _this = {
    name: 'this',
    type: Node.ClassType.create({ name: this.name })
  }
  this.methods.forEach(v => v.type.params.unshift(_this))
  this.fields.forEach(v => v.type.resolve(global, local))
  this.methods.forEach(v => global.set(v))
  this.methods.forEach(v => v.resolve(global, local))
}

Node.Method.resolve =
Node.Func.resolve = function (global, local) {
  local = Scope.Local.create(this.type.result)
  this.type.params.forEach(v => local.set(v.name, v.type))
  this.type.resolve(global, local)
  this.block.resolve(global, local)
  this.locals = local.locals()
}

Node.Let.resolve = function (global, local) {
  this.type?.resolve(global, local)
  this.expr = this.expr?.resolve(global, local)
  if (!this.type) this.type = this.expr?.type
  if (!this.type) {
    throw new Error(`${this.name} 변수의 타입을 알 수 없습니다.`)
  }
  if (this.expr && !this.type.assign(this.expr.type)) {
    throw new Error(`let ${this.type} = ${this.expr.type}`)
  }
  this.index = local.set(this.name, this.type)
}

Node.For.resolve = function (global, local) {
  local = local.expand()
  this.init.resolve(global, local)
  this.cond = this.cond.resolve(global, local)
  this.expr = this.expr.resolve(global, local)
  this.stmt.resolve(global, local)
  local.collapse()
  if (this.cond.type.of(Node.BooleanType)) return
  throw new Error(`for (${this.cond.type})`)
}

Node.While.resolve = function (global, local) {
  this.cond = this.cond.resolve(global, local)
  this.stmt.resolve(global, local)
  if (this.cond.type.of(Node.BooleanType)) return
  throw new Error(`while (${this.cond.type})`)
}

Node.If.resolve = function (global, local) {
  local.depth += 1
  this.cond = this.cond.resolve(global, local)
  this.then.resolve(global, local)
  this._else?.resolve(global, local)
  local.depth -= 1
  if (this.cond.type.of(Node.BooleanType)) return
  throw new Error(`if (${this.cond.type})`)
}

Node.Block.resolve = function (global, local) {
  global = global.expand()
  local = local.expand()
  for (const node of this.stmts) {
    if (node.of(Node.Func)) {
      global.set(node)
    }
  }
  this.stmts.forEach(v => v.resolve(global, local))
  this.stmts = this.stmts.filter(v => !v.of(Node.Func))
  local.collapse()
}

Node.Return.resolve = function (global, local) {
  this.expr = this.expr?.resolve(global, local)
  if (!this.expr && local.result.of(Node.VoidType)) return
  if (this.expr && local.result.assign(this.expr.type)) return
  throw new Error(`return ${this.expr?.type} in ${local.result}`)
}

Node.Break.resolve = function (global, local) {
  this.depth = local.depth + 2
}

Node.Continue.resolve = function (global, local) {
  this.depth = local.depth
}

Node.Delete.resolve = function (global, local) {
  this.expr = this.expr.resolve(global, local)
  if (this.expr.type.of(Node.ArrayType)) {
    return
  }
  if (this.expr.type.of(Node.ClassType)) {
    const node = global.get(this.expr.type.name)
    if (!node.of(Node.Class)) throw new Error('internal error')
    this.index = node.methods.find(v => v.name === 'destructor')?.index
    return
  }
  throw new Error(`delete ${this.expr.type}`)
}

Node.Print.resolve = function (global, local) {
  const allowed = [
    Node.BooleanType,
    Node.NumberType,
    Node.StringType
  ]
  this.args = this.args.map(v => v.resolve(global, local))
  for (const arg of this.args) {
    if (arg.type.of(...allowed)) {
      continue
    }
    throw new Error(`print ${arg.type}`)
  }
}

Node.PrintLine.resolve = function (global, local) {
  this.print.resolve(global, local)
}

Node.ExprStmt.resolve = function (global, local) {
  this.expr = this.expr.resolve(global, local)
}

Node.Assign.resolve = function (global, local) {
  const left = this.left.resolve(global, local)
  const right = this.right.resolve(global, local)
  if (!left.type.assign(right.type)) {
    throw new Error(`${left.type} = ${right.type}`)
  }
  if (left.of(Node.GetLocal)) {
    return Node.SetLocal.create({
      type: left.type,
      name: left.name,
      index: left.index,
      right
    })
  }
  if (left.of(Node.GetField)) {
    return Node.SetField.create({
      type: left.type,
      left: left.left,
      name: left.name,
      right,
      index: left.index,
      offset: left.offset
    })
  }
  if (left.of(Node.GetElement)) {
    return Node.SetElement.create({
      type: left.type,
      left: left.left,
      index: left.index,
      right
    })
  }
  throw new Error(`${left} = ${right.type}`)
}

Node.Or.resolve = function (global, local) {
  const type = Node.BooleanType.create()
  const left = this.left.resolve(global, local)
  const right = this.right.resolve(global, local)
  if (left.type.of(Node.BooleanType) && right.type.of(Node.BooleanType)) {
    return Node.Or.create({ type, left, right })
  }
  throw new Error(`${left.type} && ${right.type}`)
}

Node.And.resolve = function (global, local) {
  const type = Node.BooleanType.create()
  const left = this.left.resolve(global, local)
  const right = this.right.resolve(global, local)
  if (left.type.of(Node.BooleanType) && right.type.of(Node.BooleanType)) {
    return Node.And.create({ type, left, right })
  }
  throw new Error(`${left.type} && ${right.type}`)
}

Node.Binary.resolve = function (global, local) {
  const op = this.op
  const left = this.left.resolve(global, local)
  const right = this.right.resolve(global, local)
  if (!left.type.binary(op, right.type)) {
    throw new Error(`${left.type} ${op} ${right.type}`)
  }
  if (['+', '-', '*', '/', '%'].includes(op)) {
    const type = Node.NumberType.create()
    return Node.Binary.create({ type, op, left, right })
  }
  if (['<', '>', '<=', '>=', '==', '!='].includes(op)) {
    const type = Node.BooleanType.create()
    return Node.Binary.create({ type, op, left, right })
  }
  throw new Error('internal error')
}

Node.Unary.resolve = function (global, local) {
  const type = Node.NumberType.create()
  const op = this.op
  const expr = this.expr.resolve(global, local)
  if (!expr.type.unary(op)) {
    throw new Error(`${this.op}${this.expr.type}`)
  }
  return Node.Unary.create({ type, op, expr })
}

Node.Literal.resolve = function (global, local) {
  const type = this.type
  const value = this.value
  if (this.type.of(Node.StringType)) {
    const index = global.setString(value)
    return Node.Literal.create({ type, value, index })
  }
  return Node.Literal.create({ type, value })
}

Node.Iden.resolve = function (global, local) {
  const localSymbol = local.get(this.name)
  if (localSymbol) {
    const name = this.name
    const type = localSymbol.type
    const index = localSymbol.index
    return Node.GetLocal.create({ type, name, index })
  }
  const globalSymbol = global.get(this.name)
  if (globalSymbol &&
      globalSymbol.of(Node.Declare, Node.Func, Node.Lambda)) {
    const name = this.name
    const type = globalSymbol.type
    const index = globalSymbol.index
    return Node.GetFunc.create({ type, name, index })
  }
  throw new Error(`cannot found ${this.name}`)
}

Node.Dot.resolve = function (global, local) {
  const left = this.left.resolve(global, local)
  const name = this.name
  if (left.type.of(Node.ArrayType)) {
    if (name === 'length') {
      const type = Node.NumberType.create()
      return Node.Length.create({ type, expr: left })
    }
  }
  if (left.type.of(Node.ClassType)) {
    const node = global.get(left.type.name)
    if (!node.of(Node.Class)) {
      throw new Error(`${left.type.name}.${name}`)
    }
    const fieldIndex = node.fields.findIndex(v => v.name === name)
    if (fieldIndex !== -1) {
      const type = node.fields[fieldIndex].type
      const index = fieldIndex
      const fn = (size, member) => size + (member.type.of(Node.NumberType) ? 8 : 4)
      const offset = node.fields.slice(0, fieldIndex).reduce(fn, 0)
      return Node.GetField.create({ type, left, name, index, offset })
    }
    const methodIndex = node.methods.findIndex(v => v.name === name)
    if (methodIndex !== -1) {
      const type = node.methods[methodIndex].type
      const index = node.methods[methodIndex].index
      return Node.GetMethod.create({ type, left, name, index })
    }
  }
  throw new Error(`${left.type.name}.${name}`)
}

Node.Index.resolve = function (global, local) {
  const left = this.left.resolve(global, local)
  const index = this.index.resolve(global, local)
  if (left.type.of(Node.ArrayType) && index.type.of(Node.NumberType)) {
    const type = left.type.base
    return Node.GetElement.create({ type, left, index })
  }
  throw new Error(`${left.type}[${index.type}]`)
}

Node.New.resolve = function (global, local) {
  const type = this.type
  const args = this.args.map(v => v.resolve(global, local))
  if (this.type.of(Node.ArrayType) &&
      args.length === 1 &&
      args[0].type.of(Node.NumberType)) {
    const expr = args[0]
    return Node.NewArray.create({ type, expr })
  }
  if (this.type.of(Node.ClassType)) {
    const node = global.get(this.type.name)
    if (!node.of(Node.Class)) {
      throw new Error(`new ${this.type}()`)
    }
    const fn = (size, member) => size + (member.type.of(Node.NumberType) ? 8 : 4)
    const size = node.fields.reduce(fn, 0)
    const length = node.fields.length
    const index = node.methods.find(v => v.name === 'constructor')?.index
    return Node.NewClass.create({ type, args, size, length, index })
  }
  throw new Error(`new ${this.type}()`)
}

Node.Lambda.resolve = function (global, local) {
  global.set(this)
  local = Scope.Local.create(this.type.result)
  this.type.params.forEach(v => local.set(v.name, v.type))
  this.type.resolve(global, local)
  this.block.resolve(global, local)
  this.locals = local.locals()
  const name = this.name
  const type = this.type
  const index = this.index
  return Node.GetFunc.create({ type, name, index })
}

Node.Call.resolve = function (global, local) {
  const left = this.left.resolve(global, local)
  const args = this.args.map(v => v.resolve(global, local))
  if (!left.type.of(Node.FuncType)) {
    throw new Error(`${left.type}()`)
  }
  if (left.of(Node.GetMethod)) {
    args.unshift(left.left)
  }
  if (left.type.params.length !== args.length) {
    throw new Error(`needs ${left.type.params.length} arguments`)
  }
  for (let i = 0; i < args.length; i++) {
    const param = left.type.params[i].type
    const arg = args[i].type
    if (param.assign(arg)) continue
    throw new Error(`(${param} = ${arg})`)
  }
  const type = left.type.result
  return Node.Call.create({ type, left, args })
}
