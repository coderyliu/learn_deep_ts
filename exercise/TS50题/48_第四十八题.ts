// *实现 UnionToArray 工具类型，用于将联合类型转换成元组类型。具体的使用示例如下所示：
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => void
  ? I
  : never;

type UnionToTuple<T> = UnionToIntersection<
  T extends any ? (t: T) => T : never
> extends (_: any) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

type A0 = UnionToTuple<"aaa" | "bbb" | "ccc">; //=> ['aaa' , 'bbb' , 'ccc']
type A1 = UnionToTuple<1 | 2 | 3>; //=> [1, 2, 3]
type A2 = UnionToTuple<
  { type: "input" } | { type: "select"; hasOptions: boolean }
>; //=> [{type:'input'} ,{type:'select',hasOptions:boolean}]

export {};
