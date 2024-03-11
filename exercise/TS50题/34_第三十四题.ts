// *实现一个 SmallerThan 工具类型，用于比较数值类型的大小。具体的使用示例如下所示：
// ?利用构造数组的长度来判断，体用递归逐步迭代，先和哪个数匹配上，哪个数就小，注意边界问题。这里要求的是第一个数小，如果相等，返回自然是false
type SmallerThan<
  N extends number,
  M extends number,
  A extends any[] = []
> = A["length"] extends M
  ? false
  : A["length"] extends N
  ? true
  : SmallerThan<N, M, [...A, ""]>;

type S0 = SmallerThan<0, 1>; // true
type S1 = SmallerThan<2, 0>; // false
type S2 = SmallerThan<8, 10>; // true
type S3 = SmallerThan<0, 0>; // false

export {};
