class Item:
  def __init__(self, key, value):
    self.key = key
    self.value = value

class ListTable:
  def __init__(self):
    self.__size = 11
    self.__length = 0
    self.__data = [[] for _ in range(self.__size)]

  def hash(self, s):
    v = 0
    for c in s:
      v = v * 31 + ord(c)
    return v % m

  def get(self, key):
    index = hash(key) % self.__size
    items = self.__data[index]
    for item in items:
      if item.key == key:
        return item.value
    raise KeyError()

  def put(self, key, value):
    index = hash(key) % self.__size
    items = self.__data[index]
    for item in items:
      if item.key == key:
        item.value = value
        return
    self.__length += 1
    items.append(Item(key, value))
    self.rehashing()

  def remove(self, key):
    index = hash(key) % self.__size
    items = self.__data[index]
    for i in range(len(items)):
      if items[i].key == key:
        self.__length -= 1
        item = items.pop(i)
        return item.value
    raise KeyError()

  def rehashing(self):
    if self.__length / self.__size < 0.6: return
    temp = [item for items in self.__data for item in items]
    self.__size *= 2
    self.clear()
    for item in temp:
      self.set(item.key, item.value)

h = ListTable()

