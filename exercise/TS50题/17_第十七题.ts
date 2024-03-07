// * 实现一个 Includes 工具类型，用于判断指定的类型 E 是否包含在 T 数组类型中。具体的使用示例如下所示：
// type Includes<T extends Array<any>, E> = // 你的实现代码

type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
type Includes<T extends Array<any>, E> = T extends [infer F, ...args: infer Arg]
  ? IsEqual<F, E> extends true
    ? true
    : Includes<Arg, E>
  : false;

type I0 = Includes<[], 1>; // false
type I1 = Includes<[2, 2, 3, 1], 2>; // true
type I2 = Includes<[2, 3, 3, 1], 1>; // true
