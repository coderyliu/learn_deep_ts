class Person {
  name: string;
  age: number;
  height: number;

  constructor(name: string, age: number, height: number) {
    this.name = name;
    this.age = age;
    this.height = height;
  }

  // todo 有这样一个场景，假设在实际的业务中，我相对每一个中间件接口的执行时间做一个统计，不能在每个函数体内容写很多个console.start()
  // todo 这样是很麻烦的，实际的解决办法是通过写一个公用的中间件来实现的
  eating(food: string[], address: string) {
    // 拦截前
    // 中间函数体执行
    console.log(this.name + " 想去 " + address + " eat " + food.join(" "));
    // 拦截后
  }
}

// todo 可以写一个工具来实现
const interceptorFn = (obj: any, fnName: string) => {
  // 1.拿到要做拦截的类/对象的属性描述符
  // propertyObj {value,writable,enumerable,configurable}
  const propertyObj = Object.getOwnPropertyDescriptor(obj.prototype, fnName);

  // 2.保存这个属性的数据描述符的value
  const targetMethod = propertyObj!.value;

  // 3.重写这个数据属性描述符上的value
  propertyObj!.value = function (...args: any[]) {
    // 拦截前操作
    console.time();

    // 执行函数体操作
    targetMethod.apply(this, args);

    // 拦截后
    console.timeEnd();
  };

  // 4.修改传递过来的类的原型上的这个方法
  Object.defineProperty(obj.prototype, fnName, propertyObj!);
};

interceptorFn(Person, "eating");
const p = new Person("coder", 23, 1.88);
p.eating(["hamburger", "coco"], "kendeji");
