// base node of all
const Base = {
  create (props) {
    const target = Object.create(this)
    target.kind = this.kind
    return Object.assign(target, props)
  },
  of (...nodes) {
    return nodes.some(v => v.kind === this.kind)
  },
  equal (node) {
    return JSON.stringify(this) === JSON.stringify(node)
  },
  toString () {
    return JSON.stringify(this)
  }
}

// base node of type nodes
const TypeBase = {
  ...Base,
  assign (right) { return false },
  binary (op, right) { return false },
  unary () { return false }
}

// defined a new node prototype inherited Base
const define = (kind, ...sources) =>
  Object.assign(Object.create({ kind }), ...sources)

// type nodes
export const VoidType = define('VoidType', TypeBase)

export const NullType = define('NullType', TypeBase, {
  binary (op, right) {
    return ['==', '!='].includes(op) &&
           right.of(NullType, StringType, ArrayType, FuncType, ClassType)
  }
})

export const BooleanType = define('BooleanType', TypeBase, {
  assign (right) {
    return right.of(BooleanType)
  },
  binary (op, right) {
    return ['==', '!='].includes(op) && right.of(BooleanType)
  }
})

export const NumberType = define('NumberType', TypeBase, {
  assign (right) {
    return right.of(NumberType)
  },
  binary (op, right) {
    return right.of(NumberType)
  },
  unary (op) {
    return true
  }
})

export const StringType = define('StringType', TypeBase, {
  assign (right) {
    return right.of(NullType, StringType)
  }
})

export const ArrayType = define('ArrayType', TypeBase, {
  assign (right) {
    return right.of(NullType) || this.equal(right)
  },
  binary (op, right) {
    return ['==', '!='].includes(op) &&
           (right.of(NullType) || this.equal(right))
  }
})

export const FuncType = define('FuncType', TypeBase, {
  assign (right) {
    return right.of(NullType) || this.equal(right)
  },
  binary (op, right) {
    return ['==', '!='].includes(op) &&
           (right.of(NullType) || this.equal(right))
  }
})

export const ClassType = define('ClassType', TypeBase, {
  assign (right) {
    return right.of(NullType) || this.equal(right)
  },
  binary (op, right) {
    return ['==', '!='].includes(op) &&
           (right.of(NullType) || this.equal(right))
  }
})

// statement nodes
export const Declare = define('Declare', Base)
export const Class = define('Class', Base)
export const Method = define('Method', Base)
export const Func = define('Func', Base)
export const Let = define('Let', Base)
export const For = define('For', Base)
export const While = define('While', Base)
export const If = define('If', Base)
export const Block = define('Block', Base)
export const Return = define('Return', Base)
export const Break = define('Break', Base)
export const Continue = define('Continue', Base)
export const Delete = define('Delete', Base)
export const Print = define('Print', Base)
export const PrintLine = define('PrintLine', Base)
export const ExprStmt = define('ExprStmt', Base)

// expression nodes
export const Assign = define('Assign', Base)
export const Or = define('Or', Base)
export const And = define('And', Base)
export const Binary = define('Binary', Base)
export const Unary = define('Unary', Base)
export const Literal = define('Literal', Base)
export const Iden = define('Iden', Base)
export const New = define('New', Base)
export const Lambda = define('Lamb', Base)
export const Dot = define('Dot', Base)
export const Index = define('Index', Base)
export const Call = define('Call', Base)

// derived from Assign nodes
export const SetLocal = define('SetLocal', Base)
export const SetField = define('SetField', Base)
export const SetElement = define('SetElement', Base)

// derived from Iden nodes
export const GetLocal = define('GetLocal', Base)
export const GetFunc = define('GetFunc', Base)

// derived from Index nodes
export const GetElement = define('GetElement', Base)

// derived from Dot nodes
export const Length = define('Length', Base)
export const GetField = define('GetField', Base)
export const GetMethod = define('GetMethod', Base)

// derived from New nodes
export const NewArray = define('NewArray', Base)
export const NewClass = define('NewClass', Base)
