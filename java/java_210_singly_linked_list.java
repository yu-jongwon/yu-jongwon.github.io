class SinglyLinkedList {
  Node head = new Node(0, null);

  void insert(int index, int value) {
    var node = this.head;
    while (node.next != null && index > 0) {
      node = node.next;
      index -= 1;
    }
    if (index > 0) throw new IndexOutOfBoundsException();
    node.next = new Node(value, node.next);
  }

  void delete(int index) {
    var node = this.head;
    while (node.next != null && index > 0) {
      node = node.next;
      index -= 1;
    }
    if (index > 0) throw new IndexOutOfBoundsException();
    node.next = node.next.next;
  }

  void print() {
    var node = this.head.next;
    System.out.print('[');
    if (node != null) {
      System.out.printf("%d", node.value);
      node = node.next;
    }
    while (node != null) {
      System.out.printf(", %d", node.value);
      node = node.next;
    }
    System.out.println("]");
  }

  void reverse() {
    Node temp = null;
    var node = this.head.next;
    while (node != null) {
      var t = node;
      node = node.next;
      t.next = temp;
      temp = t;
    }
    this.head.next = temp;
  }

  void sort() {
    var node1 = this.head.next;
    while (node1 != null) {
      var node2 = node1.next;
      while (node2 != null) {
        if (node1.value > node2.value) {
          var t = node1.value;
          node1.value = node2.value;
          node2.value = t;
        }
        node2 = node2.next;
      }
      node1 = node1.next;
    }
  }

  public static void main(String[] args) {
    var singlyLinkedList = new SinglyLinkedList();
    singlyLinkedList.print();
    singlyLinkedList.insert(0, 2);
    singlyLinkedList.print();
    singlyLinkedList.insert(0, 1);
    singlyLinkedList.print();
    singlyLinkedList.insert(0, 0);
    singlyLinkedList.print();
    singlyLinkedList.insert(3, 3);
    singlyLinkedList.print();
    singlyLinkedList.insert(4, 4);
    singlyLinkedList.print();
    singlyLinkedList.insert(5, 5);
    singlyLinkedList.print();
    singlyLinkedList.delete(0);
    singlyLinkedList.print();
    singlyLinkedList.delete(4);
    singlyLinkedList.print();
    singlyLinkedList.delete(1);
    singlyLinkedList.print();
  }
}

class Node {
  int value;
  Node next;

  Node() {}

  Node(int value) {
    this.value = value;
  }

  Node(int value, Node next) {
    this.value = value;
    this.next = next;
  }
}
