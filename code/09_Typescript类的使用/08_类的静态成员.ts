class Person {
  static age = "coder liu";
  static eating() {
    console.log("eating");
  }
}

const p = new Person();

// console.log(p.eating())//编译器就会报错，eating方法不存在
Person.eating(); //正确方式调用
console.log(Person.age);

// todo 类的静态成员的实际应用
// todo 在实际开发中，我们可能会对时间做很多处理，其中一种办法是封装一个工具类
// *这个工具类，我们可以new 一个新的对象去调用里面的实例方法，也可以通过静态方法去调用
class FormatTimeUtil {
  static formateTime() {}
  static subTwoDay() {} //两个时间差
}

// *可以直接通过FormatTimeUtil.xxx()去调用

export {};
