export default {
  create () {
    const object = Object.create(this)
    object.funcs = []
    object.breaks = []
    object.continues = []
    return object
  },
  newFunc () {
    this.funcs.push([])
    this.breaks = []
    this.continues = []
  },
  beginBlock () {
    this.breaks.unshift([])
    this.continues.unshift([])
  },
  endBlock () {
    const breaks = this.breaks.shift()
    const continues = this.continues.shift()
    if (!breaks || !continues) throw new Error('internal error')
    return { breaks, continues }
  },
  setCode (opcode, operand) {
    const curr = this.funcs.length - 1
    const addr = this.funcs[curr].length
    return this.funcs[curr].push({ addr, opcode, operand }) - 1
  },
  patchCode (address, arg) {
    const curr = this.funcs.length - 1
    if (!arg) arg = this.funcs[curr].length
    this.funcs[curr][address].operand = arg
  },
  setBreak (address) {
    this.breaks[0].push(address)
  },
  setContinue (address) {
    this.continues[0].push(address)
  },
  currentAddress () {
    const curr = this.funcs.length - 1
    return this.funcs[curr].length
  }
}
