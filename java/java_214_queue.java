class Queue {
  class Node {
    int value;
    Node next;

    Node(int value, Node next) {
      this.value = value;
      this.next = next;
    }
  }

  Node tail = new Node(0, null);

  Queue() {
    this.tail.next = this.tail;
  }

  void push(int value) {
    var node = new Node(value, this.tail.next);
    this.tail.next = node;
    this.tail = node;
  }

  int pop() {
    var head = this.tail.next;
    var value = head.next.value;
    head.next = head.next.next;
    return value;
  }

  void print() {
    var head = this.tail.next;
    var node = head.next;
    System.out.print("[");
    if (node != head) {
      System.out.printf("%d", node.value);
      node = node.next;
    }
    while (node != head) {
      System.out.printf(", %d", node.value);
      node = node.next;
    }
    System.out.println("]");
  }

  public static void main(String[] args) {
    var queue = new Queue();
    queue.print();
    queue.push(1);
    queue.print();
    queue.push(2);
    queue.print();
    queue.push(3);
    queue.print();
    System.out.println(queue.pop());
    queue.print();
    System.out.println(queue.pop());
    queue.print();
    System.out.println(queue.pop());
    queue.print();
  }
}
