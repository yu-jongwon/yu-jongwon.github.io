import scan from '../1_scanner/scanner.js'
import parse from '../2_parser/parser.js'
import resolve from '../3_resolver/resolver.js'
import generate from '../5_code_generator/generator.js'
import interpret from './interpreter.js'

const file = process.argv[2]
const code = file
  ? (await import('fs')).readFileSync(file, 'utf8')
  : `
  printline('Hello, World!');
  `
const tokens = scan(code)
const ast = parse(tokens)
const module = resolve(ast)
const codes = generate(module)
interpret(codes, {
  random: () => Math.random(),
  floor: v => Math.floor(v)
})
