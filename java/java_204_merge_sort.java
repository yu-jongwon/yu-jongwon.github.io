import java.util.Arrays;
import java.util.Collections;

class MergeSort {
  // static void merge(Integer[] a, int low, int mid, int high) {
  //   var t = new int[high - low + 1];
  //   var i = low;
  //   var j = mid + 1;
  //   var k = 0;
  //   while (i <= mid && j <= high) {
  //     if (a[i] < a[j]) {
  //       t[k++] = a[i++];
  //     } else {
  //       t[k++] = a[j++];
  //     }
  //   }
  //   while (i <= mid) {
  //     t[k++] = a[i++];
  //   }
  //   while (j <= high) {
  //     t[k++] = a[j++];
  //   }
  //   for (i = 0; i < k; i++) {
  //     a[low + i] = t[i];
  //   }
  // }
  static void sort(Integer[] a, int low, int high) {
    if (low >= high) return;

    var mid = (low + high) / 2;
    sort(a, low, mid);
    sort(a, mid + 1, high);

    var t = new int[high - low + 1];
    var i = low;
    var j = mid + 1;
    var k = 0;
    while (i <= mid && j <= high) {
      if (a[i] < a[j]) {
        t[k++] = a[i++];
      } else {
        t[k++] = a[j++];
      }
    }
    while (i <= mid) {
      t[k++] = a[i++];
    }
    while (j <= high) {
      t[k++] = a[j++];
    }
    for (i = 0; i < k; i++) {
      a[low + i] = t[i];
    }
  }

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

    sort(a, 0, n - 1);

    for (var i: a) {
      System.out.printf("%3d", i);
    }
    System.out.println();
  }
}
