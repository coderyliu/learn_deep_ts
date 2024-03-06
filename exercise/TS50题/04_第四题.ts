// *定义一个ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型
interface Example {
  a: string;
  b: string | number;
  c: () => void;
  d: {};
}

type ConditionalPick<T, Condition> = {
  [K in keyof T as T[K] extends Condition ? K : never]: T[K];
};

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
// => {a: string}
