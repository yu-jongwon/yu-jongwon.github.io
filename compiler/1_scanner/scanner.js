const keywords = [
  'declare',
  'class',
  'function', 'return',
  'let',
  'while', 'for', 'break', 'continue',
  'if', 'else',
  'void', 'null', 'boolean',
  'true', 'false', 'number', 'string', 'Array',
  'new', 'delete',
  'print', 'printline'
].map(v => `\\b${v}\\b`)

const specials = [
  '.', ',', ':', ';',
  '(', ')', '{', '}', '[', ']',
  '==', '!=', '<=', '>=', '<', '>',
  '=', '+=', '-=', '*=', '/=', '%=',
  '+', '-', '*', '/', '%',
  '&&', '||'
].map(v => v.replace(/[+\-*(){}[\].|]/g, '\\$&'))

const reserved = keywords.concat(specials).join('|')

const regexes = [
  '^(?<comment>//.*)',
  '^(?<whitespace>[ \t\r\n]+)',
  '^(?<number>[0-9]+(?:[.][0-9]+)?)',
  `^(?<reserved>${reserved})`,
  '^(?<identifier>[a-zA-Z][a-zA-Z0-9_]*)',
  "^(?<string>'[^']*')"
].join('|')

export default function scan (code) {
  let line = 1
  let column = 1
  const tokens = []
  while (code.length) {
    const match = code.match(regexes)
    if (!match) throw new Error(`사용할 수 없는 문자: ${code[0]}`)
    const [kind, value] = Object.entries(match.groups ?? {})
      .find(group => group[1]) ?? ['', '']
    code = code.slice(value.length)
    switch (kind) {
      case 'number':
        tokens.push({ kind, value, line, column })
        break
      case 'reserved':
        tokens.push({ kind: value, value, line, column })
        break
      case 'identifier':
        tokens.push({ kind, value, line, column })
        break
      case 'string':
        tokens.push({ kind, value: value.slice(1, -1), line, column })
        break
      case 'whitespace':
        line += value.match(/\n/g)?.length ?? 0
        column = value.indexOf('\n') === -1 ? column : 1
        break
    }
  }
  tokens.push({ kind: '(end)', value: '', line, column })
  return tokens
}
