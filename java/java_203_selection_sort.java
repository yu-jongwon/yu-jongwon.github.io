import java.util.Arrays;
import java.util.Collections;

class SelectionSort {
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

    for (var i = 0; i < n; i++) {
      var j = 0;
      for (var k = 0; k < n - i; k++) {
        if (a[j] < a[k]) j = k;
      }
      var t = a[n - i - 1];
      a[n - i - 1] = a[j];
      a[j] = t;
    }

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();
  }
}
