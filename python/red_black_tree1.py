import random

class Node:
  def __init__(self, key = None, red = False, parent = None, left = None, right = None):
    self.key = key
    self.red = red
    self.parent = parent
    self.left = left
    self.right = right

class RedBlackTree:
  def __init__(self):
    self.root = None

  def push(self, key):
    def left(node):
      c = node.right
      node.right = c.left
      if c.left: c.left.parent = node
      c.left = node
      c.parent = node.parent
      if   node.parent == None:      self.root = c
      elif node == node.parent.left: node.parent.left = c
      else:                          node.parent.right = c
      node.parent = c

    def right(node):
      c = node.left
      node.left = c.right
      if c.right: c.right.parent = node
      c.right = node
      c.parent = node.parent
      if   node.parent == None:      self.root = c
      elif node == node.parent.left: node.parent.left = c
      else:                          node.parent.right = c
      node.parent = c

    if self.root == None:
      self.root = Node(key = key)
      return

    p = None
    n = self.root
    while n != None:
      if key == n.key: return
      p = n
      n = n.left if key < n.key else n.right
    n = Node(key = key, red = True, parent = p)
    if key < p.key: p.left  = n
    if key > p.key: p.right = n
    while n != None and n != self.root and n.parent.red:
      u = n.parent.parent.right if n.parent == n.parent.parent.left else n.parent.parent.left
      if u and u.red:
        u.red = False
        n.parent.red = False
        n.parent.parent.red = True
        n = n.parent.parent
      elif n.parent == n.parent.parent.left:
        if n == n.parent.right:
          n = n.parent
          left(n)
        n.parent.red = False
        n.parent.parent.red = True
        right(n.parent.parent)
      else:
        if n == n.parent.left:
          n = n.parent
          right(n)
        n.parent.red = False
        n.parent.parent.red = True
        left(n.parent.parent)
    self.root.red = False

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

n = [i for i in range(15)]
# for _ in range(10):
#   n.pop(random.randint(0, 3))
random.shuffle(n)
print(n)
for i in [2, 12, 1, 3, 14, 11, 4, 7, 0, 10, 9, 13, 8, 5, 6]:
  t.push(i)
  t.print()

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
