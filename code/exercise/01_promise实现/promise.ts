interface PromiseLike<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): PromiseLike<TResult1 | TResult2>;
}

enum Status {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

type Resolve<T> = (value: T | PromiseLike<T>) => void;
type Reject = (reason?: any) => void;

type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void;

type onFulFilled<T, TResult1> =
  | ((value: T) => TResult1 | PromiseLike<TResult1>)
  | undefined
  | null;
type onRejected<TResult2> =
  | ((reason: any) => TResult2 | PromiseLike<TResult2>)
  | undefined
  | null;
type onFinally = () => void | undefined | null;

// 判断value是否为promise
function isPromise(value: any): value is PromiseLike<any> {
  return (
    ((typeof value === "object" && value !== null) ||
      typeof value === "function") &&
    typeof value.then === "function"
  );
}

class MyPromise<T> {
  status: Status = Status.PENDING;
  value!: T;

  // 保存当前Promise的终值
  private onFulfilledCallback: (() => void)[] = []; //成功的回调
  private onRejectedCallback: (() => void)[] = []; //失败的对调

  constructor(executor: Executor<T>) {
    try {
      // 防止this丢失
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  // 内部的resolve函数 就是我们实例 Promise 传入给用户调用的 resolve
  private _resolve(value: T | PromiseLike<T>) {
    // 推入事件环最后，这里应该是微任务， ES6 的 Promise 内部并不是用 setTimeout，这里我们只能用 setTimeout 进行模拟微任务
    try {
      setTimeout(() => {
        if (isPromise(value)) {
          value.then(this._resolve.bind(this), this._reject.bind(this));
          return;
        }

        // 如果是pending 状态变为fulfilled
        if (this.status === Status.PENDING) {
          this.status = Status.FULFILLED;
          this.value = value;

          // resolve后执行，then传入的回调
          this.onFulfilledCallback.forEach((fn) => fn());
        }
      });
    } catch (error) {
      this._reject(error);
    }
  }

  // 内部的reject函数 就是我们实例 Promise 传入给用户调用的 reject
  private _reject(reason: any) {
    setTimeout(() => {
      if (this.status === Status.PENDING) {
        this.status = Status.REJECTED;
        this.value = reason;

        this.onRejectedCallback.forEach((fn) => fn());
      }
    });
  }

  public then<TResult1 = T, TResult2 = never>(
    onfulfilled?: onFulFilled<T, TResult1>,
    onrejected?: onRejected<TResult2>
  ): MyPromise<TResult1 | TResult2> {
    // 保证是函数
    const onfulfilledFn =
      typeof onfulfilled === "function" ? onfulfilled : (v: T) => v;
    const onrejectedFn =
      typeof onrejected === "function"
        ? onrejected
        : (e: any) => {
            throw e;
          };

    //返回一个新的promise
    return new MyPromise((resolve, reject) => {
      const that = this;

      // 执行then的回调函数
      function callback(fn: any) {
        try {
          const result = fn(that.value);

          if (result instanceof Promise) {
            result.then(
              (v) => {
                resolve(v);
              },
              (err) => {
                reject(err);
              }
            );
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      }

      if (this.status === Status.FULFILLED) {
        setTimeout(() => {
          callback(onfulfilledFn);
        });
      }

      if (this.status === Status.REJECTED) {
        setTimeout(() => {
          callback(onrejectedFn);
        });
      }

      if (this.status === Status.PENDING) {
        // 如果状态为pending,需要将onFulfilled和onRejected回调函数都存放起来，状态确定之后在回调
        this.onFulfilledCallback.push(() => {
          try {
            callback(onfulfilledFn);
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectedCallback.push(() => {
          try {
            callback(onrejectedFn);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }
}

// 同步测试
const p = new MyPromise((resolve, reject) => {
  console.log("同步测试");
  resolve("success");
}).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);

// 异步测试
