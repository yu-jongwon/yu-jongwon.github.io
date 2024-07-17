import scan from '../1_scanner/scanner.js'
import parse from './parser.js'

// const file = process.argv[2]
// const code = file
//   ? (await import('fs')).readFileSync(file, 'utf8')
//   : `
//     function fib(n: number): number {
//       if (n < 2) { return n; }
//       return fib(n-1) + fib(n-2);
//     }
//     printline('result:', fib(10));
//   `
const code = `
  print(1 + 2);
`
const tokens = scan(code)
const ast = parse(tokens)
console.dir(ast, { depth: Infinity })
