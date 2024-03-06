type User = {
  id: number;
  kind: string;
};

// *T 继承自 User T类型是User的子类型 子类包含父类的属性和方法 但子类的属性和方法 父类不一定拥有
// *makerCustomer 函数要求返回T类型 那么返回值不仅需要包含id和kind属性 还需要包含T类型的属性和方法
// function makeCustomer<T extends User>(u: T): T {
// Error（TS 编译器版本：v4.4.2）
// Type '{ id: number; kind: string; }' is not assignable to type 'T'.
// '{ id: number; kind: string; }' is assignable to the constraint of type 'T',
// but 'T' could be instantiated with a different subtype of constraint 'User'.
//   return {
//     id: u.id,
//     kind: "customer",
//   };
// }

// 修改方案一：返回T类型的数据
function makeCustomer<T extends User>(u: T): T {
  return {
    // 使用扩展运算符扩展U中的所有方法和属性
    ...u,
    id: u.id,
    kind: "customer",
  };
}

// 修改方案二：返回User类型的数据
function makeCustomerTwo<T extends User>(u: T): User {
  return {
    id: u.id,
    kind: "customer",
  };
}

// 修改方案三：类型断言
function makeCustomerThree<T extends User>(u: T): T {
  return {
    id: u.id,
    kind: "customer",
  } as T;
}
