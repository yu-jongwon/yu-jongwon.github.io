import scan from '../1_scanner/scanner.js'
import parse from '../2_parser/parser.js'
import resolve from './resolver.js'

// const file = process.argv[2]
// const code = file
//   ? (await import('fs')).readFileSync(file, 'utf8')
//   : `
//   class T {
//     m: number;
//   }
//   let t: T;
//   t.m;
//   `
const code = `
declare function sqrt(n: number): number;

printline(sqrt(25));
`
const tokens = scan(code)
const ast = parse(tokens)
const module = resolve(ast)
console.dir(module, { depth: Infinity })
