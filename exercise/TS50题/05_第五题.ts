// *定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是 x，将作为新函数类型的第一个参数。
type Fn = (a: number, b: string) => number;

// 实现方案一：利用ReturnType 结合 Parameters
type AppendArgument<F extends (...args: any) => any, A> = (
  x: A,
  ...args: Parameters<F>
) => ReturnType<F>;
type FinalFn = AppendArgument<Fn, boolean>;

// 实现方案二：利用infer
type AppendArgument2<F, A> = F extends (...args: infer Args) => infer Return
  ? (x: A, ...args: Args) => Return
  : never;
type FinalFn2 = AppendArgument2<Fn, boolean>;