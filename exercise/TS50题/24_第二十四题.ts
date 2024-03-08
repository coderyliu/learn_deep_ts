// * 现一个 Mutable 工具类型，用于移除对象类型上所有属性或部分属性的 readonly 修饰符。具体的使用示例如下所示：
type Foo = {
  readonly a: number;
  readonly b: string;
  readonly c: boolean;
};

// ?知识点 -readonly 可以去除属性上的 readonly属性，语法和 -? 去掉可选属性一致。
// 利用 Omit先构造一个不包含指定属性的类型，再基于Keys从已有的T上提取类型，通过 -readonly 去除只读限制，之后通过交叉 & 来合并二者。
type Mutable<T, Keys extends keyof T = keyof T> = Omit<T, Keys> & {
  -readonly [K in Keys]: T[K];
};

// 测试用例
const mutableFoo: Mutable<Foo, "a"> = { a: 1, b: "2", c: true };

mutableFoo.a = 3; // OK
// @ts-expect-error
mutableFoo.b = "6"; // Cannot assign to 'b' because it is a read-only property.

export {};
