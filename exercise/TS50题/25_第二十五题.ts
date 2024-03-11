// * 实现一个 IsUnion 工具类型，判断指定的类型是否为联合类型。具体的使用示例如下所示：
type IsUnion<T, U = T> = T extends any
  ? [U] extends [T]
    ? false
    : true
  : never;

type I0 = IsUnion<string | number>; // true
type I1 = IsUnion<string | never>; // false
type I2 = IsUnion<string | unknown>; // false

// 测试
type Obj<T> = T extends any
  ? {
      a: T;
    }
  : never;

type res = Obj<string | number>;

type Obj2<T> = [T] extends [any]
  ? {
      a: T;
    }
  : never;

type res2 = Obj2<string | number>;

// 测试联合类型
type Test1<T, U = T> = T extends any ? [U] : never;
type Test2<T, U = T> = T extends any ? [T] : never;

type i4 = Test1<string | number>;
type i5 = Test2<string | number>;

type i7 = Test1<string | never>;
type i6 = Test2<string | never>;

type i8 = Test1<string>;
type i9 = Test2<string>;

export {};
