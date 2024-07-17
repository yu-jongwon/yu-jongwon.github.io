import scan from '../1_scanner/scanner.js'
import parse from '../2_parser/parser.js'
import resolve from '../3_resolver/resolver.js'
import interpret from './interpreter.js'

// const file = process.argv[2]
// const code = file
//   ? (await import('fs')).readFileSync(file, 'utf8')
//   : `
// if (true)
//   printline(true);
// else
//   printline(false);
//   `
const code = `
declare function random(n: number): number;

printline('random number:', random(100));
`
const tokens = scan(code)
const ast = parse(tokens)
const module = resolve(ast)
interpret(module, {
  // sqrt: n => Math.sqrt(n),
  // random: () => Math.random(),
  // floor: n => Math.floor(n),
  random: n => Math.floor(Math.random() * n)
})
