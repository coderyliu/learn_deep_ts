// *本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。
// function f(a: string | number, b: string | number) {
//   if (typeof a === "string") {
//     return a + ":" + b; // no error but b can be number!
//   } else {
//     return a + b; // error as b can be number | string
//   }
// }

// f(2, 3); // Ok
// f(1, "a"); // Error
// f("a", 2); // Error
// f("a", "b"); // Ok

type CustomType = string | number;

// 修改方案一：函数重载
function f(a: number, b: number): number;
function f(a: string, b: string): string;
function f(a: number, b: string): void;
function f(a: string, b: number): void;
function f(a: any, b: any) {
  if (typeof a === "string" || typeof b === "string") {
    return a + ":" + b;
  } else {
    return (a as number) + (b as number);
  }
}

f(2, 3); // Ok
f(1, "a"); // Error
f("a", 2); // Error
f("a", "b"); // Ok

// 修改方案二：类型缩小
function fTwo(a: CustomType, b: CustomType): CustomType {
  if (typeof a === "string" || typeof b === "string") {
    return a + ":" + b;
  } else {
    return (a as number) + (b as number);
  }
}
fTwo(2, 3); // Ok
fTwo(1, "a"); // Ok
fTwo("a", 2); // Ok
fTwo("a", "b"); // Ok
