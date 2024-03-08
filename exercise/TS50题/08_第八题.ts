// * 定义 NonEmptyArray 工具类型，用于确保数据非空数组

// 实现方案一：属性约束
type NonEmptyArray<T> = T[] & { 0: T };

// 实现方案二
// type NonEmptyArray<T> = [T, ...T[]]

// !将出现编译错误
// const a: NonEmptyArray<string> = []

const b: NonEmptyArray<string> = ["Hello TS"]; // 非空数据，正常使用
