import * as Node from './node.js'

export default function parse (tokens) {
  const declares = []
  while (peekIf(tokens, 'declare')) {
    declares.push(parseDeclare(tokens))
  }

  const classes = []
  while (peekIf(tokens, 'class')) {
    classes.push(parseClass(tokens))
  }

  const stmts = []
  while (!popIf(tokens, '(end)')) {
    stmts.push(parseStmt(tokens))
  }

  const name = 'main'
  const params = []
  const result = Node.VoidType.create()
  const type = Node.FuncType.create({ params, result })
  const block = Node.Block.create({ stmts })
  const main = Node.Func.create({ name, type, block })

  return { declares, classes, main }
}

function pop (tokens) {
  if (!tokens.length) throw new Error('unexpectedly reached end of file')
  return tokens.shift()
}

function expect (tokens, kind) {
  if (!tokens.length) throw new Error('unexpectedly reached end of file')
  if (tokens[0].kind !== kind) throw new Error(`expected ${JSON.stringify(tokens[0])}`)
  return tokens.shift().value
}

function popIf (tokens, kind) {
  if (!tokens.length) throw new Error('unexpectedly reached end of file')
  return tokens[0].kind === kind ? tokens.shift() : undefined
}

function peek (tokens) {
  if (!tokens.length) throw new Error('unexpectedly reached end of file')
  return tokens[0].kind
}

function peekIf (tokens, ...kinds) {
  if (!tokens.length) throw new Error('unexpectedly reached end of file')
  return kinds.some(v => v === tokens[0].kind)
}

function parseType (tokens) {
  switch (peek(tokens)) {
    case 'void': return parseVoidType(tokens)
    case 'boolean': return parseBoolType(tokens)
    case 'number': return parseNumberType(tokens)
    case 'string': return parseStringType(tokens)
    case 'Array': return parseArrayType(tokens)
    case '(': return parseFuncType(tokens)
    case 'identifier': return parseClassType(tokens)
  }
  throw new Error(`invalid type ${JSON.stringify(tokens[0])}`)
}

function parseVoidType (tokens) {
  expect(tokens, 'void')
  return Node.VoidType.create()
}

function parseBoolType (tokens) {
  expect(tokens, 'boolean')
  return Node.BooleanType.create()
}

function parseNumberType (tokens) {
  expect(tokens, 'number')
  return Node.NumberType.create()
}

function parseStringType (tokens) {
  expect(tokens, 'string')
  return Node.StringType.create()
}

function parseArrayType (tokens) {
  expect(tokens, 'Array')
  expect(tokens, '<')
  const base = parseType(tokens)
  expect(tokens, '>')
  return Node.ArrayType.create({ base })
}

function parseFuncType (tokens) {
  const params = []
  expect(tokens, '(')
  if (!popIf(tokens, ')')) {
    do {
      const name = expect(tokens, 'identifier')
      expect(tokens, ':')
      const type = parseType(tokens)
      params.push({ name, type })
    } while (popIf(tokens, ','))
    expect(tokens, ')')
  }
  const result = popIf(tokens, ':')
    ? parseType(tokens)
    : Node.VoidType.create()
  return Node.FuncType.create({ params, result })
}

function parseClassType (tokens) {
  const name = expect(tokens, 'identifier')
  return Node.ClassType.create({ name })
}

function parseStmt (tokens) {
  switch (peek(tokens)) {
    case 'function': return parseFunc(tokens)
    case 'let': return parseLet(tokens)
    case 'for': return parseFor(tokens)
    case 'while': return parseWhile(tokens)
    case 'if': return parseIf(tokens)
    case '{': return parseBlock(tokens)
    case 'return': return parseReturn(tokens)
    case 'break': return parseBreak(tokens)
    case 'continue': return parseContinue(tokens)
    case 'delete': return parseDelete(tokens)
    case 'print': return parsePrint(tokens)
    case 'printline': return parsePrint(tokens)
    default: return parseExprStmt(tokens)
  }
}

function parseDeclare (tokens) {
  expect(tokens, 'declare')
  expect(tokens, 'function')
  const name = expect(tokens, 'identifier')
  const type = parseFuncType(tokens)
  expect(tokens, ';')
  return Node.Declare.create({ name, type })
}

function parseClass (tokens) {
  expect(tokens, 'class')
  const name = expect(tokens, 'identifier')
  expect(tokens, '{')
  const fields = []
  const methods = []
  while (!popIf(tokens, '}')) {
    const name = expect(tokens, 'identifier')
    if (peekIf(tokens, '(')) {
      const type = parseFuncType(tokens)
      const block = parseBlock(tokens)
      methods.push(Node.Method.create({ name, type, block }))
    } else if (popIf(tokens, ':')) {
      const type = parseType(tokens)
      expect(tokens, ';')
      fields.push({ name, type })
    } else {
      throw new Error(`unexpected ${JSON.stringify(tokens[0])}`)
    }
  }
  return Node.Class.create({ name, fields, methods })
}

function parseFunc (tokens) {
  expect(tokens, 'function')
  const name = expect(tokens, 'identifier')
  const type = parseFuncType(tokens)
  const block = parseBlock(tokens)
  return Node.Func.create({ name, type, block })
}

function parseBlock (tokens) {
  const stmts = []
  expect(tokens, '{')
  while (!popIf(tokens, '}')) {
    stmts.push(parseStmt(tokens))
  }
  return Node.Block.create({ stmts })
}

function parseExprStmt (tokens) {
  const expr = parseExpr(tokens)
  expect(tokens, ';')
  return Node.ExprStmt.create({ expr })
}

function parseReturn (tokens) {
  expect(tokens, 'return')
  const expr = peekIf(tokens, ';') ? undefined : parseExpr(tokens)
  expect(tokens, ';')
  return Node.Return.create({ expr })
}

function parseLet (tokens) {
  expect(tokens, 'let')
  const name = expect(tokens, 'identifier')
  const type = popIf(tokens, ':') && parseType(tokens)
  const expr = popIf(tokens, '=') && parseExpr(tokens)
  expect(tokens, ';')
  return Node.Let.create({ name, type, expr })
}

function parseFor (tokens) {
  expect(tokens, 'for')
  expect(tokens, '(')
  const init = parseLet(tokens)
  const cond = parseExpr(tokens)
  expect(tokens, ';')
  const expr = parseExpr(tokens)
  expect(tokens, ')')
  const stmt = parseStmt(tokens)
  return Node.For.create({ init, cond, expr, stmt })
}

function parseWhile (tokens) {
  expect(tokens, 'while')
  expect(tokens, '(')
  const cond = parseExpr(tokens)
  expect(tokens, ')')
  const stmt = parseStmt(tokens)
  return Node.While.create({ cond, stmt })
}

function parseBreak (tokens) {
  expect(tokens, 'break')
  expect(tokens, ';')
  return Node.Break.create()
}

function parseContinue (tokens) {
  expect(tokens, 'continue')
  expect(tokens, ';')
  return Node.Continue.create()
}

function parseIf (tokens) {
  expect(tokens, 'if')
  expect(tokens, '(')
  const cond = parseExpr(tokens)
  expect(tokens, ')')
  const then = parseStmt(tokens)
  const _else = popIf(tokens, 'else') && parseStmt(tokens)
  return Node.If.create({ cond, then, _else })
}

function parseDelete (tokens) {
  expect(tokens, 'delete')
  const expr = parseExpr(tokens)
  expect(tokens, ';')
  return Node.Delete.create({ expr })
}

function parsePrint (tokens) {
  const args = []
  const token = pop(tokens)
  expect(tokens, '(')
  if (!popIf(tokens, ')')) {
    do {
      args.push(parseExpr(tokens))
    } while (popIf(tokens, ','))
    expect(tokens, ')')
  }
  expect(tokens, ';')
  const print = Node.Print.create({ args })
  return token.kind === 'print'
    ? print
    : Node.PrintLine.create({ print })
}

function parseExpr (tokens) {
  return parseAssign(tokens)
}

function parseAssign (tokens) {
  const left = parseOr(tokens)
  if (!peekIf(tokens, '=', '+=', '-=', '*=', '/=', '%=')) return left
  const token = pop(tokens)
  let right = parseAssign(tokens)
  if (token.kind.length > 1) {
    const op = token.kind.slice(0, -1)
    right = Node.Binary.create({ op, left, right })
  }
  return Node.Assign.create({ left, right })
}

function parseOr (tokens) {
  let left = parseAnd(tokens)
  while (popIf(tokens, '||')) {
    const right = parseAnd(tokens)
    left = Node.Or.create({ left, right })
  }
  return left
}

function parseAnd (tokens) {
  let left = parseRelational(tokens)
  while (popIf(tokens, '&&')) {
    const right = parseRelational(tokens)
    left = Node.And.create({ left, right })
  }
  return left
}

function parseRelational (tokens) {
  let left = parseArithmetic1(tokens)
  while (peekIf(tokens, '<', '>', '<=', '>=', '==', '!=')) {
    const op = pop(tokens).kind
    const right = parseArithmetic1(tokens)
    left = Node.Binary.create({ op, left, right })
  }
  return left
}

function parseArithmetic1 (tokens) {
  let left = parseArtithmetic2(tokens)
  while (peekIf(tokens, '+', '-')) {
    const op = pop(tokens).kind
    const right = parseArtithmetic2(tokens)
    left = Node.Binary.create({ op, left, right })
  }
  return left
}

function parseArtithmetic2 (tokens) {
  let left = parsePrefix(tokens)
  while (peekIf(tokens, '*', '/', '%')) {
    const op = pop(tokens).kind
    const right = parsePrefix(tokens)
    left = Node.Binary.create({ op, left, right })
  }
  return left
}

function parsePrefix (tokens) {
  if (popIf(tokens, '+')) {
    return parsePrefix(tokens)
  }
  if (peekIf(tokens, '-')) {
    const op = pop(tokens).kind
    const expr = parsePrefix(tokens)
    return Node.Unary.create({ op, expr })
  }
  const operand = parseOperand(tokens)
  return parsePostfix(tokens, operand)
}

function parseOperand (tokens) {
  switch (peek(tokens)) {
    case '(': return parseGroup(tokens)
    case 'identifier': return parseIdentifier(tokens)
    case 'function': return parseLambda(tokens)
    case 'new': return parseNew(tokens)
    default: return parseLiteral(tokens)
  }
}

function parseGroup (tokens) {
  expect(tokens, '(')
  const expr = parseExpr(tokens)
  expect(tokens, ')')
  return expr
}

function parseLiteral (tokens) {
  const token = pop(tokens)
  switch (token.kind) {
    case 'null':
      return Node.Literal.create({
        type: Node.NullType.create(),
        value: null
      })
    case 'true':
    case 'false':
      return Node.Literal.create({
        type: Node.BooleanType.create(),
        value: token.kind === 'true'
      })
    case 'number':
      return Node.Literal.create({
        type: Node.NumberType.create(),
        value: parseFloat(token.value)
      })
    case 'string':
      return Node.Literal.create({
        type: Node.StringType.create(),
        value: token.value
      })
  }
  throw new Error(`invalid literal ${JSON.stringify(tokens[0])}`)
}

function parseIdentifier (tokens) {
  const name = pop(tokens).value
  return Node.Iden.create({ name })
}

function parseLambda (tokens) {
  expect(tokens, 'function')
  const name = popIf(tokens, 'identifier')?.value
  const type = parseFuncType(tokens)
  const block = parseBlock(tokens)
  return Node.Lambda.create({ name, type, block })
}

function parseNew (tokens) {
  expect(tokens, 'new')
  const type = parseType(tokens)
  const args = []
  expect(tokens, '(')
  if (!popIf(tokens, ')')) {
    do {
      args.push(parseExpr(tokens))
    } while (popIf(tokens, ','))
    expect(tokens, ')')
  }
  return Node.New.create({ type, args })
}

function parsePostfix (tokens, left) {
  while (true) {
    switch (peek(tokens)) {
      case '.': left = parseDot(tokens, left); break
      case '[': left = parseIndex(tokens, left); break
      case '(': left = parseCall(tokens, left); break
      default: return left
    }
  }
}

function parseDot (tokens, left) {
  expect(tokens, '.')
  const name = expect(tokens, 'identifier')
  return Node.Dot.create({ left, name })
}

function parseIndex (tokens, left) {
  expect(tokens, '[')
  const index = parseExpr(tokens)
  expect(tokens, ']')
  return Node.Index.create({ left, index })
}

function parseCall (tokens, left) {
  const args = []
  expect(tokens, '(')
  if (!popIf(tokens, ')')) {
    do {
      args.push(parseExpr(tokens))
    } while (popIf(tokens, ','))
    expect(tokens, ')')
  }
  return Node.Call.create({ left, args })
}
