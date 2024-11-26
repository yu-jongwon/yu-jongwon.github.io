class ArrayList {
  int[] a = new int[1];
  int length = 0;

  void insert(int index, int value) {
    if (index < 0 || index > this.length) {
      throw new ArrayIndexOutOfBoundsException(index);
    }
    if (this.length == this.a.length) {
      var t = this.a;
      this.a = new int[this.a.length * 2];
      for (var i = 0; i < t.length; i++) {
        this.a[i] = t[i];
      }
    }
    for (var i = this.length; i > index; i--) {
      this.a[i] = this.a[i-1];
    }
    this.a[index] = value;
    this.length += 1;
  }

  void delete(int index) {
    if (index < 0 || index > this.length - 1) {
      throw new ArrayIndexOutOfBoundsException(index);
    }
    for (int i = index; i < this.length - 1; i++) {
      this.a[i] = this.a[i + 1];
    }
    this.length -= 1;
  }

  void print() {
    System.out.print("[");
    if (this.length > 0) {
      System.out.printf("%d", this.a[0]);
    }
    for (int i = 1; i < this.length; i++) {
      System.out.printf(", %d", this.a[i]);
    }
    System.out.println("]");
  }

  public static void main(String[] args) {
    var arrayList = new ArrayList();
    arrayList.print();
    arrayList.insert(0, 3);
    arrayList.print();
    arrayList.insert(0, 1);
    arrayList.print();
    arrayList.insert(1, 2);
    arrayList.print();
    arrayList.insert(3, 4);
    arrayList.print();
    arrayList.delete(0);
    arrayList.print();
    arrayList.delete(0);
    arrayList.print();
    arrayList.delete(0);
    arrayList.print();
    arrayList.delete(0);
    arrayList.print();
  }
}
