class Person {
  private _name: string = "kobe";

  // *set get这种构造器方法，在类中是具有实际重要意义的，当我们创建一个新的对象的时候，不想通过constructor()传参
  // *就可以通过set get构造器方法去实际控制
  get name() {
    return this._name;
  }

  set name(newName: string) {
    // todo 在构造器内部，我们可以做一些拦截操作，或者业务逻辑：去除空格，发起网络请求等
    this._name = newName;
  }
}

const p = new Person();
console.log(p);
console.log(p.name);

export {};
