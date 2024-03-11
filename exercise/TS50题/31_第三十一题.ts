// *实现一个 Repeat 工具类型，用于根据类型变量 C 的值，重复 T 类型并以元组的形式返回新的类型。具体的使用示例如下所示：

// ?知识点：数组['length'] = 具体的数组长度
type Repeat<T, C extends number, R extends any[] = []> = R["length"] extends C
  ? R
  : Repeat<T, C, [...R, T]>;

type R0 = Repeat<0, 0>; // []
type R1 = Repeat<1, 1>; // [1]
type R2 = Repeat<number, 2>; // [number, number]

export {};
