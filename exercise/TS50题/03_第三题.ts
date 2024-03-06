// *定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的？
type Foo = {
  a: number;
  b?: string;
  c: boolean;
};

type Simplify<T> = {
  [P in keyof T]: T[P];
};

type SetOptional<T, K extends keyof T> = Simplify<
  Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
>;

type SomeOptional = SetOptional<Foo, "a" | "b">;

// *定义一个 SetRequired 工具类型，支持把给定的 keys 对应的属性变成必选的？
type SetRequired<T, K extends keyof T> = Simplify<
  Required<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
>;

type SomeRequired = SetRequired<Foo, "a" | "b">;
