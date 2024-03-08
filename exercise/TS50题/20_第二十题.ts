// * 实现一个 Curry 工具类型，用来实现函数类型的柯里化处理。具体的使用示例如下所示：
type LastArray<T extends any[]> = T extends [infer A, ...infer B]
  ? B extends []
    ? T
    : LastArray<B>
  : [];

type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = P extends [...infer A, infer B]
  ? A extends []
    ? F
    : Curry<(...args: A) => (...arg: LastArray<P>) => R>
  : F;

type F0 = Curry<() => Date>; // () => Date
type F1 = Curry<(a: number) => Date>; // (arg: number) => Date
type F2 = Curry<(a: number, b: string) => Date>; //  (arg_0: number) => (b: string) => Date
