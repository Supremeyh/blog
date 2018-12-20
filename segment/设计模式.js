// 设计模式 Design pattern, 开发过程中面临的一般问题的解决方案, 代表了最佳的实践

// https://godbmw.com/passages/2018-10-25-stragegy-pattern/

// 单例模式 singleton pattern: 保证一个类仅有一个实例，并提供访问此实例的全局访问点
// 用途:如果一个类负责连接数据库的线程池、日志记录逻辑等等，此时需要单例模式来保证对象不被重复创建，以达到降低开销的目的。

const Singleton = function() {};

Singleton.getInstance = (function() {
  // 由于es6没有静态类型,故闭包: 函数外部无法访问 instance
  let instance = null;
  return function() {
    // 检查是否存在实例
    if (!instance) {
      instance = new Singleton();
    }
    return instance;
  };
})();

let s1 = Singleton.getInstance();
let s2 = Singleton.getInstance();

console.log(s1 === s2);


// 策略模式 strategy pattern： 把一系列“可互换的”算法封装起来，并根据用户需求来选择其中一种。
// 将算法的使用和算法的实现分离。算法的实现交给策略类。算法的使用交给环境类，环境类会根据不同的情况选择合适的算法。
// 策略类
const strategies = {
  A() {
    console.log("This is stragegy A");
  },
  B() {
    console.log("This is stragegy B");
  }
};
// 环境类
const context = name => {
  return strategies[name]();
};

// 调用策略A
context("A");
// 调用策略B
context("B");


