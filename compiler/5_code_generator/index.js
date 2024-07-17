import scan from '../1_scanner/scanner.js'
import parse from '../2_parser/parser.js'
import resolve from '../3_resolver/resolver.js'
import generate from './generator.js'

const code = `
  function fib(n: number): number {
    if (n < 2) { return n; }
    return fib(n-1) + fib(n-2);
  }
  printline(fib(10));
  `
const tokens = scan(code)
const ast = parse(tokens)
const module = resolve(ast)
const codes = generate(module)
console.dir(codes, { maxArrayLength: Infinity })
