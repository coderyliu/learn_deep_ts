// * 实现一个 RemoveIndexSignature 工具类型，用于移除已有类型中的索引签名。具体的使用示例如下所示：
interface Foo {
  [key: string]: any;
  [key: number]: any;
  bar(): void;
}

// ?as过的语法可以直接实现对k的判断过滤
type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K];
};

type FooWithOnlyBar = RemoveIndexSignature<Foo>; //{ bar: () => void; }
export {};
