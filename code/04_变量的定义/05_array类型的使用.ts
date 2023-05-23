// 确定一个事实,arr是一个数组，但是数组中存放的是什么类型的元素？
// 默认情况下，如果不指定，数组中存放任意类型的元素，这是不推荐的

// !这个数组里面为空，这个数组未来不确定会被赋值为什么类型，因此空数组的类型约束为 never[]
// !never不能被任何类型赋值
const arrNeverType = [];

// *所以，我们定义一个空数组的时候尽量定义类型
const arr: any[] = [];
// 存放任意类型不会报错
arr.push(1);
arr.push("1");

// *如果我们想让数组里面的每一项赋值之后，类型都不在改变，可以这样利用类型断言as const
const arrType = [1, 2, 3] as const;
// arrType[0] = 5; 会报错，相当于给arrType数组里的每一项都变成const 定义的变量

// 指定数组存放类型的方式
// 规定必须是字符串类型
const newArr: string[] = [];
// 或者   这种方式不推荐，和jsx模板是冲突的
const newArr2: Array<string> = [];
newArr.push("1");
// newArr.push(1)//编译器报错

export {};
