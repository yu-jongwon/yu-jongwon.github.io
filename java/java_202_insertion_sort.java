import java.util.Arrays;
import java.util.Collections;

class InsertionSort {
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

    for (var i = 1; i < n; i++) {
      var t = a[i];
      var j = i;
      while (j > 0 && t < a[j - 1]) {
        a[j] = a[j - 1];
        j -= 1;
      }
      a[j] = t;
    }

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();
  }
}
