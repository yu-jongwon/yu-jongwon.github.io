import java.util.Arrays;
import java.util.Collections;
import java.util.Random;

class QuickSelect {
  static int partition(Integer[] a, int low, int high) {
    var i = low;
    for (var j = low; j < high; j++) {
      if (a[j] > a[high]) continue;
      if (i != j) {
        var t = a[i];
        a[i] = a[j];
        a[j] = t;
      }
      i++;
    }
    var t = a[i];
    a[i] = a[high];
    a[high] = t;
    return i;
  }

  static int search(Integer[] a, int low, int high, int k) {
    // var mid = partition(a, low, high);
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
    if (k < mid) return search(a, low, mid - 1, k);
    if (k > mid) return search(a, mid + 1, high, k);
    return a[k];
  }

  static int search2(Integer[] a, int low, int high, int k) {
    while (true) {
      var mid = partition(a, low, high);
      if (k < mid) {
        high = mid - 1;
      } else if (k > mid) {
        low = mid + 1;
      } else {
        return a[k];
      }
    }
  }

  public static void main(String[] args) {
    var n = 10;
    var a = new Integer[n];
    for (var i = 0; i < n; i++) {
      a[i] = new Random().nextInt(30);
    }
    Collections.shuffle(Arrays.asList(a));
    for (var v: a) {
      System.out.printf("%d ", v);
    }
    System.out.println();

    var k = n - 1;
    var low = 0;
    var high = n - 1;
    while (true) {
      var i = low;
      for (var j = low; j < high; j++) {
        if (a[j] > a[high]) continue;
        if (i != j) {
          var t = a[i];
          a[i] = a[j];
          a[j] = t;
        }
        i++;
      }
      var t = a[i];
      a[i] = a[high];
      a[high] = t;
      if (i == k) break;
    }

    System.out.println(a[k]);
  }
}
