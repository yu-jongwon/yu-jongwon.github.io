import java.util.Arrays;
import java.util.Collections;

class HeapSort {
  public static void main(String[] args) {
    var n = 10;
    var a = new Integer[n];
    for (var i = 0; i < n; i++) {
      a[i] = i;
    }
    Collections.shuffle(Arrays.asList(a));

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();

    for (int i = n - 1; i >= 0; i--) {
      for (int j = (i + 1) / 2 - 1; j >= 0; j--) {
        var c = j;
        var l = j * 2 + 1;
        if (a[c] < a[l]) c = l;
        var r = j * 2 + 2;
        if (r <= i && a[c] < a[r]) c = r;
        var t = a[c];
        a[c] = a[j];
        a[j] = t;
      }
      var t = a[0];
      a[0] = a[i];
      a[i] = t;
    }

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();
  }
}

// def f2(p, size):
//   while True:
//     c = p
//     if p * 2 + 1 < size and a[c] < a[p * 2 + 1]:
//       c = p * 2 + 1
//     if p * 2 + 2 < size and a[c] < a[p * 2 + 2]:
//       c = p * 2 + 2
//     if c == p:
//       break
//     a[c], a[p] = a[p], a[c]
//     p = c

// def f(p, size):
//   c = p
//   if p * 2 + 1 < size and a[c] < a[p * 2 + 1]:
//     c = p * 2 + 1
//   if p * 2 + 2 < size and a[c] < a[p * 2 + 2]:
//     c = p * 2 + 2
//   if c == p: return
//   a[c], a[p] = a[p], a[c]
//   f(c, size)
