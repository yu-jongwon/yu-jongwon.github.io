import * as Node from '../2_parser/node.js'

export const Global = {
  create () {
    const object = Object.create(this)
    object.symbols = []
    object.callables = []
    object.signatures = []
    object.strings = []
    return object
  },
  expand () {
    const object = Object.create(this)
    object.parent = this
    object.symbols = []
    return object
  },
  get (name) {
    return this.symbols.find(v => v.name === name) ??
           (this.parent && this.parent.get(name))
  },
  set (symbol) {
    if (this.callables.some(v => v === symbol)) {
      throw new Error('internal error')
    }
    if (!symbol.of(Node.Declare, Node.Class, Node.Method, Node.Func, Node.Lambda)) {
      throw new Error('internal error')
    }
    this.symbols.push(symbol)
    if (!symbol.of(Node.Class)) {
      symbol.index = this.callables.push(symbol) - 1
    }
  },
  setSignature (funcType) {
    const fn = v => v.equal(funcType)
    if (this.signatures.some(fn)) {
      funcType.index = this.signatures.findIndex(fn)
    } else {
      funcType.index = this.signatures.push(funcType) - 1
    }
  },
  setString (value) {
    const fn = v => v === value
    if (this.strings.some(fn)) {
      return this.strings.findIndex(fn)
    } else {
      return this.strings.push(value) - 1
    }
  }
}

export const Local = {
  create (result) {
    const object = Object.create(this)
    object.symbols = []
    object.depth = 0
    object.unused = []
    object.index = { value: 0 }
    object.result = result
    return object
  },
  expand () {
    const object = Object.create(this)
    object.parent = this
    object.symbols = []
    object.depth = this.depth
    return object
  },
  collapse () {
    this.unused.push(...this.symbols)
  },
  get (name) {
    return this.symbols.find(v => v.name === name) ??
           (this.parent && this.parent.get(name))
  },
  set (name, type) {
    const fn = v => v.type.of(Node.NumberType) === type.of(Node.NumberType)
    let index = this.unused.findIndex(fn)
    if (index !== -1) {
      index = this.unused.splice(index, 1)[0].index
    } else {
      index = this.index.value++
    }
    this.symbols.push({ name, type, index })
    return index
  },
  locals () {
    return this.symbols
      .concat(this.unused)
      .sort((a, b) => a.index - b.index)
      .map(v => v.type)
  }
}
