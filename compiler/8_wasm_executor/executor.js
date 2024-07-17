export default async function execute (bytes, imports = {}) {
  const mem = new WebAssembly.Memory({ initial: 1 })
  const arr = new Uint32Array(mem.buffer)
  const watSource = await WebAssembly.instantiate(bytes, {
    '': {
      ...imports,
      mem,
      fmod: (a, b) => a % b,
      write: v => {
        const string = i => Array.from(arr.slice(i + 1, i + 1 + arr[i])).map(v => String.fromCodePoint(v)).join('')
        const buf = new ArrayBuffer(8)
        new DataView(buf).setFloat64(0, v, true)
        const type = new Uint32Array(buf)[1] & 0x7fff0000
        const value = new Uint32Array(buf)[0]
        if (typeof window === 'undefined') {
          switch (type) {
            case 0x7ff90000: /* boolean  */ process.stdout.write(`\x1b[${value ? 34 : 31}m${!!value}\x1b[0m `); break
            case 0x7ffa0000: /* string   */ process.stdout.write(`\x1b[32m${string(value)}\x1b[0m `); break
            case 0x7ffb0000: /* linefeed */ process.stdout.write('\n'); break
            default: /*         number   */ process.stdout.write(`\x1b[33m${v.toString()}\x1b[0m `); break
          }
        } else {
          switch (type) {
            case 0x7ff90000: /* boolean  */ document.querySelector('#output').innerHTML += `<span style="color: ${value ? '#569cd6' : '#be1100'}">${value ? 'true' : 'false'} </span>`; break
            case 0x7ffa0000: /* string   */ document.querySelector('#output').innerHTML += `<span style="color: #ce9178">${string(value)} </span>`; break
            case 0x7ffb0000: /* linefeed */ document.querySelector('#output').innerHTML += '<br>'; break
            default: /*         number   */ document.querySelector('#output').innerHTML += `<span style="color: #b5cea8">${v} </span>`; break
          }
        }
      },
      alloc: s => {
        s = (s + 8) / 4
        let i = 0
        while (i < arr.length && (arr[i] % 4 === 1 || arr[i] < s * 4)) {
          i += (arr[i] - arr[i] % 4) / 4
        }
        if (i === arr.length) throw new Error('out of memory')
        if (i > arr.length) throw new Error('broken memory')
        arr[i + s] = arr[i + arr[i] / 4 - 4] = arr[i] - s * 4
        arr[i] = arr[i + s - 1] = s * 4 + 1
        return i * 4 + 4
      },
      free: i => {
        i = i / 4 - 1
        if (arr[i] % 2 === 0) throw new Error('segmentation fault')
        let s = (arr[i] - 1) / 4
        if (i > 0 && arr[i - 1] % 2 === 0) {
          i -= arr[i - 1] / 4
          s += arr[i] / 4
        }
        if (i + s < arr.length && arr[i + s] % 2 === 0) {
          s += arr[i + s] / 4
        }
        arr[i] = arr[i + s - 1] = s * 4
      }
    }
  })

  const printmem = () => { // eslint-disable-line
    console.log('='.repeat(15), 'MEM', '='.repeat(15))
    let i = 0
    while (i < arr.length) {
      const used = arr[i] % 4 === 1
      const size = arr[i] - arr[i] % 4
      process.stdout.write(`| \x1b[${used ? 31 : 34}m${size}\x1b[0m\n`)
      i += (arr[i] - arr[i] % 4) / 4
    }
    console.log('='.repeat(35))
  }

  // initialize memory
  let i = 0
  while (i < arr.length && arr[i] !== 0) i += (arr[i] - 1) / 4
  arr[i] = arr[arr.length - 1] = (arr.length - i) * 4

  // printmem()
  // console.dir(new Uint32Array(mem.buffer), { maxArrayLength: 16384 })
  if (watSource.instance.exports.main instanceof Function) {
    watSource.instance.exports.main()
  } else {
    throw new Error('no main()')
  }
  // printmem()
}
