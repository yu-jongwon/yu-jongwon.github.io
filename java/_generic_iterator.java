import java.util.Iterator;
import java.util.function.BinaryOperator;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;

class GenericArrayList<E extends Comparable<E>> implements Iterable<E> {
    @SuppressWarnings("unchecked")
    E[] values = (E[]) new Comparable[10];
    int length = 0;

    @SafeVarargs
    GenericArrayList(E... args) {
        for (var v: args) {
            this.push(v);
        }
    }

    public void push(E value) {
        this.values[this.length++] = value;
    }

    public void sort() {
        for (var i = 0; i < this.length - 1; i++) {
            for (var j = 0; j < this.length - i - 1; j++) {
                if (this.values[j].compareTo(this.values[j + 1]) > 0) {
                    var t = this.values[j];
                    this.values[j] = this.values[j + 1];
                    this.values[j + 1] = t;
                }
            }
        }
    }

    public void foreach(Consumer<E> f) {
        for (var v: this) {
            f.accept(v);
        }
    }

    public E reduce(E base, BinaryOperator<E> f) {
        for (var v: this) {
            base = f.apply(base, v);
        }
        return base;
    }

    public GenericArrayList<E> map(Function<E, E> f) {
        var result = new GenericArrayList<E>();
        for (var v: this) {
            result.push(f.apply(v));
        }
        return result;
    }

    public boolean some(Predicate<E> f) {
        for (var v: this) {
            if (f.test(v)) return true;
        }
        return false;
    }

    public Iterator<E> iterator() {
        var t = this;
        return new Iterator<E>() {
            GenericArrayList<E> arrayList = t;
            int index = 0;

            public boolean hasNext() {
                return this.index < arrayList.length;
            }

            public E next() {
                return arrayList.values[index++];
            }
        };
    }

    public static void main(String[] args) {
        var b = new GenericArrayList<Integer>();
        b.push(123);
        b.forEach(System.out::println);
        System.out.println();
        var a = new GenericArrayList<Integer>(1,2,3);
        // for (var i = 5; i > 0; i--) {
        //     a.push(i);
        // }
        // for (var i: a) {
        //     System.out.println(i);
        // }
        // a.sort();
        // System.out.println();
        a.forEach(System.out::println);
        // System.out.println(a.some(v -> v == 0));
        // System.out.println(a.some(v -> v == 5));
        // var b = a.map(v -> v * 2);
        // b.forEach(v -> System.out.println(v));
        // System.out.println(b.reduce(0, (a1, b1) -> a1 + b1));
    }
}

// class ArrayListIterator<E> implements Iterator<E> {
//     ArrayList<E> arrayList = null;
//     int index = 0;

//     ArrayListIterator(ArrayList<E> arrayList) {
//         this.arrayList = arrayList;
//     }

//     public boolean hasNext() {
//         return this.index < arrayList.length;
//     }

//     public E next() {
//         return arrayList.values[index++];
//     }
// }
