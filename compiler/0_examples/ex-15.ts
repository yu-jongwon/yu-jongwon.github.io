class Entry {
  value: number;
  next: Entry;

  constructor (value: number, next: Entry) {
    this.value = value;
    this.next = next;
  }
}

class List {
  head: Entry;

  constructor () {
    this.head = new Entry(0, null);
  }

  insert (index: number, value: number) {
    let node = this.head;
    while (node.next != null && index > 0) {
      node = node.next;
      index += -1;
    }
    if (index > 0) return;
    node.next = new Entry(value, node.next);
  }

  remove (index: number) {
    let node = this.head;
    while (node.next != null && index > 0) {
      node = node.next;
      index += -1;
    }
    if (index > 0) return;
    node.next = node.next.next;
  }

  log () {
    let node = this.head.next;
    print('[');
    while (node != null) {
      print(node.value);
      node = node.next;
    }
    printline(']');
  }

  reverse () {
    let temp: Entry = null;
    let node = this.head.next;
    while (node != null) {
      let t = node;
      node = node.next;
      t.next = temp;
      temp = t;
    }
    this.head.next = temp;
  }

  sort() {
    let node1 = this.head.next;
    while (node1 != null) {
      let node2 = node1.next;
      while (node2 != null) {
        if (node1.value > node2.value) {
          let t = node1.value;
          node1.value = node2.value;
          node2.value = t;
        }
        node2 = node2.next;
      }
      node1 = node1.next;
    }
  }
}

let list = new List();
list.log();
list.insert(0, 2);
list.log();
list.insert(0, 1);
list.log();
list.insert(0, 0);
list.log();
list.insert(3, 3);
list.log();
list.insert(4, 4);
list.log();
list.insert(5, 5);
list.log();
list.reverse();
list.log();
list.sort();
list.log();
list.remove(0);
list.log();
list.remove(4);
list.log();
list.remove(1);
list.log();
list.remove(0);
list.log();
list.remove(0);
list.log();
list.remove(0);
list.log();
