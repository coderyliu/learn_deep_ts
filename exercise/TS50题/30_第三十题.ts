// *完善 Chainable 类型的定义，使得 TS 能成功推断出 result 变量的类型。调用 option 方法之后会不断扩展当前对象的类型，使得调用 get 方法后能获取正确的类型。
declare const config: Chainable;

type Chainable<T = {}> = {
  option<K extends PropertyKey, V extends any>(
    key: K,
    value: V
  ): Chainable<T & Record<K, V>>;
  get(): T;
};

const result = config
  .option("age", 7)
  .option("name", "lolo")
  .option("address", { value: "XiaMen" })
  .get();

type ResultType = typeof result;
const t: ResultType = {
  age: 30,
  name: "coder",
  address: {
    value: "curry",
  },
};
// 期望 ResultType 的类型是：
// {
//   age: number
//   name: string
//   address: {
//     value: string
//   }
// }
