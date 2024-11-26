import java.util.Arrays;
import java.util.Collections;

class BubbleSort {
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

    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n - i - 1; j++) {
        if (a[j] <= a[j+1]) continue;
        int t = a[j];
        a[j] = a[j+1];
        a[j+1] = t;
      }
    }

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();
  }
}
