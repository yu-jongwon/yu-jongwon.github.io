import scan from './scanner.js'

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
const tokens = scan(code)
console.dir(tokens, { maxArrayLength: Infinity })
