// *实现一个 Filter 工具类型，用于根据类型变量 F 的值进行类型过滤。具体的使用示例如下所示：

// ?利用 extends [infer A, ...infer B] 来提取数组内的第一项，递归这样就能提取到全部的，之后判断的类型的时候转换成元组类型[A] extends [F] 这样能避免出现的联合类型分发执行的问题。
// ?never能匹配到任何类型上，这个题目没有说明，如果有说明的话，要特殊处理
type Filter<T extends any[], F, R extends any[] = []> = T extends [
  infer A,
  ...infer B
]
  ? [A] extends [F]
    ? Filter<B, F, [...R, A]>
    : Filter<B, F, R>
  : R;

type F0 = Filter<[6, "lolo", 7, "semlinker", false], number>; // [6, 7]
type F1 = Filter<["kakuqo", 2, ["ts"], "lolo"], string>; // ["kakuqo", "lolo"]
type F2 = Filter<[0, true, any, "abao"], string>; // [any, "abao"]

export {};
