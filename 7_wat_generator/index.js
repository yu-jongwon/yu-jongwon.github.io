import WabtModule from '../vs/libwabt.cjs'
import scan from '../1_scanner/scanner.js'
import parse from '../2_parser/parser.js'
import resolve from '../3_resolver/resolver.js'
import generate from './generator.js'

const declares = `
  declare function write(value: number): void;
  declare function fmod(a: number, b: number): number;
  declare function alloc(size: number): number;
  declare function free(addr: number): void;
`

const file = process.argv[2]
const code = file
  ? (await import('fs')).readFileSync(file, 'utf8')
  : `
    function fib(n: number): number {
      if (n < 2) { return n; }
      return fib(n-1) + fib(n-2);
    }
    printline('result:', fib(10));
  `
const tokens = scan(declares + code)
const ast = parse(tokens)
const module = resolve(ast)
const wat = generate(module)
const formatted = (await WabtModule()).parseWat('', wat).toText({})
console.log(formatted)
;(await WabtModule()).parseWat('', wat).validate({})
