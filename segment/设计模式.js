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


// 代理模式： 为一个对象提供一种代理以方便对它的访问
// 可以解决避免对一些对象的直接访问，常见的有保护代理和虚拟代理。保护代理可以在代理中直接拒绝对对象的访问；虚拟代理可以延迟访问到真正需要的时候，以节省程序开销。
// 代理模式有高度解耦、对象保护、易修改等优点。缺点是开销会更大，时间也会更慢。
const myImg = {
  setSrc(imgNode, src) {
    imgNode.src = src;
  }
};

// 利用代理模式实现图片懒加载
const proxyImg = {
  setSrc(imgNode, src) {
    myImg.setSrc(imgNode, "./image.png"); // NO1. 加载占位图片并且将图片放入<img>元素

    let img = new Image();
    img.onload = () => {
      myImg.setSrc(imgNode, src); // NO3. 完成加载后, 更新 <img> 元素中的图片
    };
    img.src = src; // NO2. 加载真正需要的图片
  }
};

let imgNode = document.createElement("img"),
  imgSrc = "https://avatars1.githubusercontent.com/u/33623220?s=400&u=a533c464d2c67f847107ddb146da56d5b8b69ea5&v=4"

document.body.appendChild(imgNode);

proxyImg.setSrc(imgNode, imgSrc);



// 迭代器模式: 提供一种方法顺序访问一个集合对象的各个元素，使用者不需要了解集合对象的底层实现
// 内部迭代器：封装的方法完全接手迭代过程，外部只需要一次调用。
// 外部迭代器：用户必须显式地请求迭代下一元素。可以类比C++内置对象的迭代器的 end()、next()等方法
const Iterator = obj => {
  let current = 0;
  let next = () => current += 1;
  let end = () => current >= obj.length;
  let get = () => obj[current];

  return {
    next,
    end,
    get
  }
}

let myIter = Iterator([1, 2, 3]);
while(!myIter.end()) {
  console.log(myIter.get())
  myIter.next();
}


