import * as Node from '../2_parser/node.js'
import Env from './env.js'

export default function generate (module) {
  const env = Env.create()
  module.callables.forEach(v => v.generateCode(module.callables, env))
  return env.funcs
}

Node.Declare.generateCode = function (callables, env) {
  const name = this.name
  const index = this.index
  const func = callables[index]
  env.newFunc()
  env.setCode(Node.Declare.kind, name)
  if (func.type.result.of(Node.VoidType)) {
    env.setCode('Drop')
  }
  env.setCode(Node.Return.kind)
}

Node.Method.generateCode =
Node.Func.generateCode =
Node.Lambda.generateCode = function (callables, env) {
  env.newFunc()
  const length = this.locals.length
  env.setCode('Alloca', length)
  this.block.generateCode(callables, env)
  env.setCode(Node.Return.kind)
}

Node.Let.generateCode = function (callables, env) {
  const index = this.index
  this.expr?.generateCode(callables, env)
  env.setCode(Node.SetLocal.kind, index)
  env.setCode('Drop')
}

Node.For.generateCode = function (callables, env) {
  env.beginBlock()
  this.init.generateCode(callables, env)
  const jump2begin = env.currentAddress()
  this.cond.generateCode(callables, env)
  const jump2end = env.setCode('CondJump')
  this.stmt.generateCode(callables, env)
  const continueAddress = env.currentAddress()
  this.expr.generateCode(callables, env)
  env.setCode('Drop')
  env.setCode('Jump', jump2begin)
  env.patchCode(jump2end)
  const { breaks, continues } = env.endBlock()
  breaks.forEach(v => env.patchCode(v))
  continues.forEach(v => env.patchCode(v, continueAddress))
}

Node.While.generateCode = function (callables, env) {
  env.beginBlock()
  const jump2begin = env.currentAddress()
  this.cond.generateCode(callables, env)
  const jump2end = env.setCode('CondJump')
  this.stmt.generateCode(callables, env)
  env.setCode('Jump', jump2begin)
  env.patchCode(jump2end)
  const { breaks, continues } = env.endBlock()
  breaks.forEach(v => env.patchCode(v))
  continues.forEach(v => env.patchCode(v, jump2begin))
}

Node.If.generateCode = function (callables, env) {
  const jump2end = []
  let node = this
  while (node && node.of(Node.If)) {
    node.cond.generateCode(callables, env)
    const jump2else = env.setCode('CondJump')
    node.then.generateCode(callables, env)
    jump2end.push(env.setCode('Jump'))
    env.patchCode(jump2else)
    node = node._else
  }
  if (node) node.generateCode(callables, env)
  jump2end.forEach(v => env.patchCode(v))
}

Node.Block.generateCode = function (callables, env) {
  this.stmts.forEach(v => v.generateCode(callables, env))
}

Node.Return.generateCode = function (callables, env) {
  this.expr?.generateCode(callables, env)
  env.setCode(Node.Return.kind)
}

Node.Break.generateCode = function (callables, env) {
  const address = env.setCode('Jump')
  env.setBreak(address)
}

Node.Continue.generateCode = function (callables, env) {
  const address = env.setCode('Jump')
  env.setContinue(address)
}

Node.Delete.generateCode = function (callables, env) { }

Node.Print.generateCode = function (callables, env) {
  for (const arg of this.args) {
    arg.generateCode(callables, env)
    env.setCode(Node.Print.kind, arg.type.kind)
  }
}

Node.PrintLine.generateCode = function (callables, env) {
  this.print.generateCode(callables, env)
  env.setCode(Node.PrintLine.kind)
}

Node.ExprStmt.generateCode = function (callables, env) {
  this.expr.generateCode(callables, env)
  env.setCode('Drop')
}

Node.SetLocal.generateCode = function (callables, env) {
  const index = this.index
  this.right.generateCode(callables, env)
  env.setCode(Node.SetLocal.kind, index)
}

Node.SetField.generateCode = function (callables, env) {
  const index = this.index
  this.left.generateCode(callables, env)
  this.right.generateCode(callables, env)
  env.setCode(Node.SetField.kind, index)
}

Node.SetElement.generateCode = function (callables, env) {
  this.left.generateCode(callables, env)
  this.index.generateCode(callables, env)
  this.right.generateCode(callables, env)
  env.setCode(Node.SetElement.kind)
}

Node.Or.generateCode = function (callables, env) {
  this.left.generateCode(callables, env)
  const address = env.setCode(Node.Or.kind)
  this.right.generateCode(callables, env)
  env.patchCode(address)
}

Node.And.generateCode = function (callables, env) {
  this.left.generateCode(callables, env)
  const address = env.setCode(Node.And.kind)
  this.right.generateCode(callables, env)
  env.patchCode(address)
}

Node.Binary.generateCode = function (callables, env) {
  const op = this.op
  this.left.generateCode(callables, env)
  this.right.generateCode(callables, env)
  env.setCode(Node.Binary.kind, op)
}

Node.Unary.generateCode = function (callables, env) {
  const op = this.op
  this.expr.generateCode(callables, env)
  env.setCode(Node.Unary.kind, op)
}

Node.Literal.generateCode = function (callables, env) {
  const value = this.value
  env.setCode(Node.Literal.kind, value)
}

Node.GetLocal.generateCode = function (callables, env) {
  const index = this.index
  env.setCode(Node.GetLocal.kind, index)
}

Node.GetFunc.generateCode =
Node.GetMethod.generateCode = function (callables, env) {
  const index = this.index
  env.setCode(Node.Literal.kind, index)
}

Node.GetField.generateCode = function (callables, env) {
  const index = this.index
  this.left.generateCode(callables, env)
  env.setCode(Node.GetField.kind, index)
}

Node.GetElement.generateCode = function (callables, env) {
  this.left.generateCode(callables, env)
  this.index.generateCode(callables, env)
  env.setCode(Node.GetElement.kind)
}

Node.Length.generateCode = function (callables, env) {
  this.expr.generateCode(callables, env)
  env.setCode(Node.Length.kind)
}

Node.NewArray.generateCode = function (callables, env) {
  this.expr.generateCode(callables, env)
  env.setCode(Node.NewArray.kind)
}

Node.NewClass.generateCode = function (callables, env) {
  const index = this.index
  const len = this.length
  env.setCode(Node.Literal.kind, index)
  env.setCode(Node.Literal.kind, len)
  this.args.forEach(v => v.generateCode(callables, env))
  env.setCode(Node.NewClass.kind, this.args.length)
}

Node.Call.generateCode = function (callables, env) {
  const len = this.args.length
  this.left.generateCode(callables, env)
  this.args.forEach(v => v.generateCode(callables, env))
  env.setCode(Node.Call.kind, len)
}
