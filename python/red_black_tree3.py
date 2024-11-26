import random

class Node:
  def __init__(self, key = None, red = False, parent = None):
    self.key = key
    self.red = red
    self.parent = parent
    self.left = left
    self.right = right

class RedBlackTree:
  def __init__(self):
    self.root = None

  def push(self, key):
    def rotate(child, parent):
      if child.key < parent.key:
        parent.left = child.right
        if child.right: child.right.parent = parent
        child.right = parent
      else:
        parent.right = child.left
        if child.left: child.left.parent = parent
        child.left = parent
      child.parent = parent.parent
      if   parent.parent == None:        self.root = child
      elif parent == parent.parent.left: parent.parent.left = child
      else:                              parent.parent.right = child
      parent.parent = child

    def balance(n):
      if not (n.parent and n.parent.red): return n
      if (n.key < n.parent.key) == (n.key < n.parent.parent.key):
        n.parent.red = False
        n.parent.parent.red = True
        rotate(n.parent, n.parent.parent)
      else:
        n.red = False
        n.parent.parent.red = True
        rotate(n, n.parent)
        rotate(n, n.parent)

    if self.root == None:
      self.root = Node(key = key)
      return

    p = None
    n = self.root
    while n != None:
      if key == n.key: return
      if n.left and n.right and n.left.red and n.right.red:
        n.red = True
        n.left.red = False
        n.right.red = False
        balance(n)
      p = n
      n = n.left if key < n.key else n.right

    n = Node(key = key, red = True, parent = p)
    if key < p.key: p.left  = n
    if key > p.key: p.right = n
    balance(n)
    self.root.red = False

  def check(self):
    prevDepth = 0
    def f(node, depth):
      nonlocal prevDepth
      if node == None:
        if prevDepth != 0 and depth != prevDepth:
          raise 'depth are different'
        prevDepth = depth
        return
      if node.red and node.parent and node.parent.red:
        raise 'node and the parent both are red.'
      f(node.left, depth if node.red else depth + 1)
      f(node.right, depth if node.red else depth + 1)
    f(self.root, 0)
    print(prevDepth)

  def print(self):
    l = [[self.root]]
    while l[-1].count(None) != len(l[-1]):
      l.append([None for _ in range(len(l[-1]) * 2)])
      for i in range(len(l[-2])):
        if l[-2][i] == None: continue
        l[-1][i*2] = l[-2][i].left
        l[-1][i*2+1] = l[-2][i].right
    w = 2 ** len(l)
    for l in l:
      for node in l:
        if node == None:
          print(f'{".":^{w}}', end='')
        elif node.red:
          print(f'\033[31m{node.key:^{w}}\033[0m', end='')
        else:
          print(f'\033[37m{node.key:^{w}}\033[0m', end='')
      w //= 2
      print()

t = RedBlackTree()

n = [i for i in range(1000000)]
# for _ in range(10):
#   n.pop(random.randint(0, 3))
random.shuffle(n)
# print(n)
for i in n: # [2, 12, 1, 3, 14, 11, 4, 7, 0, 10, 9, 13, 8, 5, 6]:
  t.push(i)
  # t.print()
t.check()

# for i in range(9):
#   t.push(i)
#   t.print()
#   print()

# for i in range(-8, 1):
#   t.push(i)
#   t.print()
#   print()

# for i in range(8, -1, -1):
#   t.push(i)
#   t.print()
#   print()

# for i in range(0, -9, -1):
#   t.push(i)
#   t.print()
#   print()

# t.push(1)
# t.push(2)
# t.push(7)
# t.push(8)
# t.push(4)
# t.push(3)
# t.push(5)
# t.push(6)
# t.print()
