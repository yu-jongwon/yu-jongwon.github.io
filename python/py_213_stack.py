class Node:
  def __init__(self, value, next = None):
    self.value = value
    self.next = next

class Stack:
  def __init__(self):
    self.head = Node('head')

  def push(self, value):
    self.head.next = Node(value, self.head.next)

  def pop(self):
    value = self.head.next.value
    self.head.next = self.head.next.next
    return value

  def print(self):
    node = self.head.next
    print('[', end='')
    if node != None:
      print(node.value, end='')
      node = node.next
    while node != None:
      print(',', node.value, end='')
      node = node.next
    print(']')

stack = Stack()
stack.print()
stack.push(1)
stack.print()
stack.push(2)
stack.print()
stack.push(3)
stack.print()
print(stack.pop())
stack.print()
print(stack.pop())
stack.print()
print(stack.pop())
stack.print()
