// 泛型其实就是类型的参数化

// 在定义一个函数的时候，我们不决定这个函数的参数的类型
// 而是在调用者调用的时候以参数的形式来告诉我们参数的类型
function sum<T>(num: T): T {
  return num;
}

// 调用的方式1：明确传入类型
sum<number>(1);
sum<string>("abc");

// 调用方式2：类型推导
// 对于一些简单的操作，这种推导推断出来的类型就是字面量类型
// 它的推断取决于推断的类型是否满足函数的操作，如果满足就是字面量类型，不满足就是具体的类型
sum(1);
