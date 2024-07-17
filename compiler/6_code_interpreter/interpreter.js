export default function interpret (funcs, imports = {}) {
  const codes = funcs[funcs.length - 1]
  run(codes, [])

  function run (func, locals) {
    const values = []
    let ip = 0

    while (true) {
      const inst = func[ip]
      switch (inst.opcode) {
        case 'Alloca': {
          locals.length = inst.operand
          break
        }
        case 'Drop': {
          values.pop()
          break
        }
        case 'CondJump': {
          const cond = values.pop()
          if (cond) break
          ip = inst.operand
          continue
        }
        case 'Jump': {
          ip = inst.operand
          continue
        }
        case 'Return': {
          const result = values.pop()
          if (values.length !== 0) {
            throw new Error('internal error')
          }
          return result
        }
        case 'Print': {
          const value = values.pop()
          if (typeof window === 'undefined') {
            switch (inst.operand) {
              case 'BooleanType': process.stdout.write(`\x1b[${value ? 34 : 31}m${value}\x1b[0m `); break
              case 'NumberType': process.stdout.write(`\x1b[33m${value.toString()}\x1b[0m `); break
              case 'StringType': process.stdout.write(`\x1b[32m${value}\x1b[0m `); break
              default: throw new Error('internal error')
            }
          } else {
            const output = document.querySelector('#output')
            if (!output) throw new Error('internal error')
            switch (inst.operand) {
              case 'BooleanType': output.innerHTML += `<span style="color: ${value ? '#569cd6' : '#be1100'}">${value ? 'true' : 'false'} </span>`; break
              case 'NumberType': output.innerHTML += `<span style="color: #b5cea8">${value.toString()} </span>`; break
              case 'StringType': output.innerHTML += `<span style="color: #ce9178">${value} </span>`; break
              default: throw new Error('internal error')
            }
          }
          break
        }
        case 'PrintLine': {
          if (typeof window === 'undefined') {
            process.stdout.write('\n')
          } else {
            const output = document.querySelector('#output')
            if (!output) throw new Error('internal error')
            output.innerHTML += '<br>'
          }
          break
        }
        case 'SetLocal': {
          const value = values.pop()
          locals[inst.operand] = value
          values.push(value)
          break
        }
        case 'SetField': {
          const right = values.pop()
          const left = values.pop()
          left[inst.operand] = right
          values.push(right)
          break
        }
        case 'SetElement': {
          const right = values.pop()
          const index = values.pop()
          const left = values.pop()
          left[index] = right
          values.push(right)
          break
        }
        case 'Or': {
          const value = values.pop()
          if (!value) break
          values.push(true)
          ip = inst.operand
          continue
        }
        case 'And': {
          const value = values.pop()
          if (value) break
          values.push(false)
          ip = inst.operand
          continue
        }
        case 'Binary': {
          const right = values.pop()
          const left = values.pop()
          switch (inst.operand) {
            case '+': values.push(left + right); break
            case '-': values.push(left - right); break
            case '*': values.push(left * right); break
            case '/': values.push(left / right); break
            case '%': values.push(left % right); break
            case '<': values.push(left < right); break
            case '>': values.push(left > right); break
            case '<=': values.push(left <= right); break
            case '>=': values.push(left >= right); break
            case '==': values.push(left === right); break
            case '!=': values.push(left !== right); break
            default: throw new Error('internal error')
          }
          break
        }
        case 'Unary': {
          const value = values.pop()
          switch (inst.operand) {
            case '-': values.push(-value); break
          }
          break
        }
        case 'Literal': {
          values.push(inst.operand)
          break
        }
        case 'GetLocal': {
          const value = locals[inst.operand]
          values.push(value)
          break
        }
        case 'GetField': {
          const left = values.pop()
          const value = left[inst.operand]
          values.push(value)
          break
        }
        case 'GetElement': {
          const index = values.pop()
          const left = values.pop()
          const value = left[index]
          values.push(value)
          break
        }
        case 'Length': {
          const value = values.pop()
          const length = value.length
          values.push(length)
          break
        }
        case 'NewArray': {
          const len = values.pop()
          const value = new Array(len)
          values.push(value)
          break
        }
        case 'NewClass': {
          const args = values.splice(-inst.operand, inst.operand)
          const len = values.pop()
          const index = values.pop()
          const value = new Array(len)
          if (index !== undefined) {
            const codes = funcs[index]
            run(codes, [value, ...args])
          }
          values.push(value)
          break
        }
        case 'Call': {
          const args = values.splice(-inst.operand, inst.operand)
          const index = values.pop()
          const codes = funcs[index]
          const result = run(codes, args)
          values.push(result)
          break
        }
        case 'Declare': {
          const func = imports[inst.operand]
          if (!func) {
            throw new Error(`${inst.operand}() 함수의 정의를 찾을 수 없습니다.`)
          }
          const args = locals
          const result = func(...args)
          values.push(result)
          break
        }
        default: {
          throw new Error(`internal error ${inst.opcode}`)
        }
      }
      ip += 1
    }
  }
}
