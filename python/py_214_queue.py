class Node:
  def __init__(self, value, next = None):
    self.value = value
    self.next = next

class Queue:
  def __init__(self):
    self.tail = Node('head')
    self.tail.next = self.tail

  def push(self, value):
    node = Node(value, self.tail.next)
    self.tail.next = node
    self.tail = node

  def pop(self):
    head = self.tail.next
    value = head.next.value
    head.next = head.next.next
    return value

  def print(self):
    head = self.tail.next
    node = head.next
    print('[', end='')
    if node != head:
      print(node.value, end='')
      node = node.next
    while node != head:
      print(',', node.value, end='')
      node = node.next
    print(']')

queue = Queue()
queue.print()
queue.push(1)
queue.print()
queue.push(2)
queue.print()
queue.push(3)
queue.print()
print(queue.pop())
queue.print()
print(queue.pop())
queue.print()
print(queue.pop())
queue.print()
