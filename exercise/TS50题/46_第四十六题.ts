// *实现 RequireExactlyOne 工具类型，用于满足以下功能。即只能包含 age 或 gender 属性，不能同时包含这两个属性。具体的使用示例如下所示：
interface Person {
  name: string;
  age?: number;
  gender?: number;
}

// ? 利用联合类型 extends 实现分布执行，之后重点是 如何让联合类型规则只有其中某一个生效，在每一个上设置哪些禁止的属性为可选 never
// 只能包含Keys中唯一的一个Key
type RequireExactlyOne<
  T,
  Keys extends keyof T,
  K extends keyof T = Keys
> = Keys extends any
  ? Omit<T, K> &
      Required<Pick<T, Keys>> &
      Partial<Record<Exclude<K, Keys>, never>>
  : never;

const p1: RequireExactlyOne<Person, "age" | "gender"> = {
  name: "lolo",
  age: 7,
};

const p2: RequireExactlyOne<Person, "age" | "gender"> = {
  name: "lolo",
  gender: 1,
};

// Error
// const p3: RequireExactlyOne<Person, "age" | "gender"> = {
//   name: "lolo",
//   age: 7,
//   gender: 1,
// };

export {};
