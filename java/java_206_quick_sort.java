import java.util.Arrays;
import java.util.Collections;

class QuickSort {
  // static int partition(Integer[] a, int low, int high) {
  //   var i = low;
  //   for (var j = low; j < high; j++) {
  //     if (a[j] > a[high]) continue;
  //     if (i != j) {
  //       var t = a[i];
  //       a[i] = a[j];
  //       a[j] = t;
  //     }
  //     i++;
  //   }
  //   var t = a[i];
  //   a[i] = a[high];
  //   a[high] = t;
  //   return i;
  // }

  static void devide(Integer[] a, int low, int high) {
    if (low >= high) return;
    // int mid = partition(a, low, high);
    var mid = low;
    for (var j = low; j < high; j++) {
      if (a[j] > a[high]) continue;
      if (mid != j) {
        var t = a[mid];
        a[mid] = a[j];
        a[j] = t;
      }
      mid++;
    }
    var t = a[mid];
    a[mid] = a[high];
    a[high] = t;
    devide(a, low, mid-1);
    devide(a, mid+1, high);
  }

  public static void main(String[] args) {
    var n = 7;
    var a = new Integer[n];
    for (var i = 0; i < n; i++) {
      a[i] = i;
    }
    Collections.shuffle(Arrays.asList(a));

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();

    devide(a, 0, n - 1);

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();
  }
}
