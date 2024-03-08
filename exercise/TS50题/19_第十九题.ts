// * 实现一个 OptionalKeys 工具类型，用来获取对象类型中声明的可选属性。具体的使用示例如下所示：

type Person = {
  id: string;
  name: string;
  age: number;
  from?: string;
  speak?: string;
};

// 实现方式一：利用NonNullable
type OptionalKeys<T> = NonNullable<
  {
    [K in keyof T]: undefined extends T[K] ? K : never;
  }[keyof T]
>;

// 实现方式二：
type OptionKeys<T> = keyof {
  [P in keyof T as undefined extends T[P] ? P : never]: T[P];
};

type PersonOptionalKeys = OptionalKeys<Person>; // "from" | "speak"
type PersonOptionKeys = OptionKeys<Person>; // "from" | "speak"
