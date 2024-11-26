class Node:
  def __init__(self, key):
    self.key = key
    self.left = None
    self.right = None

class BinarySearchTree:
  def __init__(self):
    self.root = None

  def search(self, key):
    def f(node):
      if node == None:
        return False
      if key < node.key:
        return f(node.left)
      if key > node.key:
        return f(node.right)
      return True
    return f(self.root)

  def push(self, key):
    def f(node):
      if node == None:
        return Node(key)
      if key < node.key:
        node.left = f(node.left)
        return node
      if key > node.key:
        node.right = f(node.right)
        return node
    self.root = f(self.root)

  def pop(self, key):
    def f(node):
      if node == None:
        return None
      if key < node.key:
        node.left = f(node.left)
        return node
      if key > node.key:
        node.right = f(node.right)
        return node
      # 자식이 모두 없을 때
      if node.left == None and node.right == None:
        return None
      # 왼쪽 자식이 없을 때
      if node.left == None:
        return node.right
      # 오른쪽 자식이 없을 때
      if node.right == None:
        return node.left
      # 자식이 모두 있고, 오른쪽 자식의 왼쪽 자식이 없을 때
      if node.right.left == None:
        node.right.left = node.left
        return node.right
      # 자식이 모두 있고, 오른쪽 자식의 왼쪽 자식이 있을 때
      p = node
      c = node.right
      while c.left != None:
        p = c
        c = c.left
      p.left = c.right
      c.left = node.left
      c.right = node.right
      return c
    self.root = f(self.root)

  def preorder(self):
    def f(node):
      if node == None: return
      print(node.key, end= ' ')
      f(node.left)
      f(node.right)
    f(self.root)
    print()

  def inorder(self):
    def f(node):
      if node == None: return
      f(node.left)
      print(node.key, end= ' ')
      f(node.right)
    f(self.root)
    print()

  def postorder(self):
    def f(node):
      if node == None: return
      f(node.left)
      f(node.right)
      print(node.key, end= ' ')
    f(self.root)
    print()

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
        else:
          print(f'{node.value:^{w}}', end='')
      w //= 2
      print()

t = BinarySearchTree()
t.push(2)
t.push(4)
t.push(3)
t.push(7)
t.push(5)
t.push(8)
t.push(6)
t.print()
print()
t.pop(4)
t.print()

# def push(self, value):
#   if self.root == None:
#     self.root = Node(value)
#     return
#   node = self.root
#   while True:
#     if value < node.value:
#       if node.left == None:
#         node.left = Node(value)
#         return
#       else:
#         node = node.left
#     else:
#       if node.right == None:
#         node.right = Node(value)
#         return
#       else:
#         node = node.right

# def pop(self, value):
#   lhs = False
#   parent = None
#   node = self.root
#   while node != None:
#     if value < node.value:
#       lhs = True
#       parent = node
#       node = node.left
#     elif value > node.value:
#       lhs = False
#       parent = node
#       node = node.right
#     else:
#       if node.left == None:
#         if lhs:
#           parent.left = node.right
#         else:
#           parent.right = node.right
#       elif node.right == None:
#         if lhs:
#           parent.left = node.left
#         else:
#           parent.right = node.left
#       else:
#         successor = self.successor(node)
#         successor.left = node.left
#         successor.right = node.right
#         if parent == None:
#           self.root = successor
#         elif lhs:
#           parent.left = successor
#         else:
#           parent.right = successor
#       return True
#   return False

# def successor(self, node):
#   p = node
#   c = node.right
#   if c.left == None:
#     p.right = c.right
#     return c
#   while c.left != None:
#     p = c
#     c = c.left
#   p.left = c.right
#   c.left = node.left
#   c.right = node.right
#   return c
