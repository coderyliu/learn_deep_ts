var a = 10;
var obj = {
  a: 20
}

function fn() {
  this = obj; // 这句话试图修改this，运行后会报错
  console.log(this.a);
}

fn();

function Foo() {
  getName = function () {
    alert(1);
  };
  return this;
}
Foo.getName = function () {
  alert(2);
};
Foo.prototype.getName = function () {
  alert(3);
};
var getName = function () {
  alert(4);
};
function getName() {
  alert(5);
}

//请写出以下输出结果：
Foo.getName(); //2
getName(); //4
Foo().getName(); //1
getName(); //1
new Foo.getName(); //2  .运算符的优先级高于new运算符
new Foo().getName(); //3
new new Foo().getName(); //3
