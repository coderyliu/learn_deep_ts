// todo1 单例模式的第一中实现方法--暴露静态属性
// *即一个类只暴露给外面一个接口去操作类
type stampType = string | number;

class FormatTimeUtil {
  timeStamp: stampType;
  type: string;

  static timeUtil: FormatTimeUtil;

  // !这个关键字很重要private 即只允许本类的内部去访问constructor
  private constructor(timeStamp: stampType, type: string) {
    this.timeStamp = timeStamp;
    this.type = type;
  }

  formatTime() {
    return console.log("format time");
  }

  // *定义一个方法获取实例对象
  static getInstance() {
    if (!this.timeUtil) {
      this.timeUtil = new FormatTimeUtil("1326281974091", "YYYY-MM-DD");
    }

    return this.timeUtil;
  }
}

// !constructor是一个私有属性
// const formateTimeUtil = new FormatTimeUtil("1326281974091", "YYYY-MM-DD");
const formateTimeUtil1 = FormatTimeUtil.getInstance();
console.log(formateTimeUtil1);
const formateTimeUtil2 = FormatTimeUtil.getInstance();
// 拿到的是同一个对象
console.log(formateTimeUtil1 === formateTimeUtil2);

// todo 2.单例模式的第二种实现方法
class FormatTimeUtilTwo {
  timeStamp: stampType;
  type: string;

  // *直接在内部new 一个对象
  static timeUtil: FormatTimeUtil = new FormatTimeUtilTwo(
    "1326281974091",
    "YYYY-MM-DD"
  );

  // !这个关键字很重要private 即只允许本类的内部去访问constructor
  private constructor(timeStamp: stampType, type: string) {
    this.timeStamp = timeStamp;
    this.type = type;
  }

  formatTime() {
    return console.log("format time");
  }
}

console.log(FormatTimeUtilTwo.timeUtil);
