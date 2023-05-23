// 在不想给某些JavaScript添加具体的数据类型时(原生的JavaScript代码是一样)
let message: any = "coder";

message = 1;
message = true;
message = null;

// 但是any在开发中是很讨厌的
const arr: any[] = ["any"];

// !这个就是tsconfig.json的作用，对于函数的参数的any是有严格限制的,noImplicitAny选项的作用
// const test = (num) => {};

export {};
