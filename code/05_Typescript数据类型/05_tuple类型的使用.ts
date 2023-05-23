// tuple元组：多种元素的组合

// 1.数组的弊端
const info: any[] = ["coder", 18, 1.88];
const name = info[0]; //不能确定name的类型

// console.log(info[0])
// console.log(info[1])

// 2.使用元组tuple
const infoMes: [string, number, number] = ["coder", 18, 1.88];
const age = infoMes[1]; //确定的数据类型
const infoName = infoMes[0];

// 3.可变元组
// 上面的数组的长度都是确定的，如果一个数组长度不确定，又要做类型约束怎么做呢
// *类型注解前面的就是一个标识符，具有给标识符做一个形参注释的作用,什么都可以，名字自己取,称之为tag
const arr: [num: number, str: string, bool: boolean, ...args: any[]] = [
  1,
  "hello",
  true,
];

// 4.可变元组的结构
const newArr: [string, string, number, string, ...any[]] = [
  "coder",
  "male",
  1.88,
  "dalian",
  true,
];
const [person, sex, height, address, ...args] = newArr;
console.log(person, sex, height, address, args);

export {};
