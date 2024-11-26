class Stack {
  class Node {
    int value;
    Node next;

    Node(int value, Node next) {
      this.value = value;
      this.next = next;
    }
  }

  Node head = new Node(0, null);

  void push(int value) {
    this.head.next = new Node(value, this.head.next);
  }

  int pop() {
    var value = this.head.next.value;
    this.head.next = this.head.next.next;
    return value;
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

  public static void main(String[] args) {
    var stack = new Stack();
    stack.print();
    stack.push(1);
    stack.print();
    stack.push(2);
    stack.print();
    stack.push(3);
    stack.print();
    System.out.println(stack.pop());
    stack.print();
    System.out.println(stack.pop());
    stack.print();
    System.out.println(stack.pop());
    stack.print();
  }
}
