// * 实现一个 Merge 工具类型，用于把两个类型合并成一个新的类型。第二种类型（SecondType）的 Keys 将会覆盖第一种类型（FirstType）的 Keys。具体的使用示例如下所示
// type Merge<FirstType, SecondType> = // 你的实现代码

type Foo = {
  a: number;
  b: string;
};

type Bar = {
  b: number;
};

// 实现方式一：
// 1. 将F和S组成交叉类型，并遍历每一个属性
// 2. 如果属性名在S中，使用S的值，否则使用F的值
// 3. 否则为never
type Merge<F, S> = {
  [K in keyof (F & S)]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};

type Result = Merge<Foo, Bar>;

// 实现方式二：利用omit去除F和S类型中相同的属性名，然后和S做交叉类型
type MergeTwo<F, S> = Omit<F, keyof S> & S;

type ResultTwo = MergeTwo<Foo, Bar>;

// 实现方式三：
// 1. 先利用Omit去除F和S类型中相同的属性名
// 2. 利用Extract从联合类型中提取出S类型中相同属性名的类型
type ExtractType<F, S> = {
  [K in Extract<keyof F, keyof S>]: S[K];
};
type MergeThree<F, S> = Omit<F, keyof S> & ExtractType<F, S>;

type ResultThree = MergeThree<Foo, Bar>;

// 测试用例
const a: Merge<Foo, Bar> = { a: 1, b: 2 };
const b: MergeTwo<Foo, Bar> = { a: 1, b: 2 };
const c: MergeThree<Foo, Bar> = { a: 1, b: 2 };

export {};
