// 设计模式 Design pattern, 开发过程中面临的一般问题的解决方案, 代表了最佳的实践


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


// 策略模式 strategy pattern： 把一系列“可互换的”算法封装起来，并根据用户需求来选择其中一种。根据不同参数可以命中不同的策略
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


// 代理模式： 为一个对象提供一种代理以方便对它的访问，代理对象和本体对象具有一致的接口	
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


// 订阅-发布模式: 定义了对象之间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖它的对象都可以得到通知
// 优点: “时间解耦”和“空间解耦”
// 订阅-发布模式” vs 观察者模式
// 发布+订阅=观察者模式。其核心思想是状态改变和发布通知。两者概念相似，但在订阅-发布模式中，订阅者和发布者之间多了一层中间件：一个被抽象出来的信息调度中心。
// JS中一般用事件模型来代替传统的发布-订阅模式。任何一个对象的原型链被指向Event的时候，这个对象便可以绑定自定义事件和对应的回调函数。
const Event = {
  clientList: {},

  // 绑定事件监听
  listen(key, fn){
    if(! this.clientList[key]){
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
    return true;
  },

  // 触发对应事件
  trigger(){
    const key = Array.prototype.shift.apply(arguments),
      fns = this.clientList[key];
    
      if(!fns || fns.length === 0){
        return false;
      }

      for(let fn of fns){
        fn.apply(null, arguments);
      }

      return true;
  },

  // 移除相关事件
  remove(key, fn){
    let fns = this.clientList[key];

    // 如果之前没有绑定事件或者没有指明要移除的事件 直接返回
    if(!fns || !fn){
      return false;
    }
    
    // 反向遍历移除置指定事件函数
    for(let l = fns.length - 1; l >= 0; l--){
      let _fn = fns[l];
      if(_fn === fn){
        fns.splice(l, 1);
      }
    }

    return true;
  }
}

// 为对象动态安装 发布-订阅 功能
const installEvent = (obj) => {
  for(let key in Event){
    obj[key] = Event[key];
  }
}

let salesOffices = {};
installEvent(salesOffices);

// 绑定自定义事件和回调函数
salesOffices.listen("event01", fn1 = (price) => {
  console.log("Price is", price, "at event01");
})

salesOffices.listen("event02", fn2 = (price) => {
  console.log("Price is", price, "at event02");
})

salesOffices.trigger("event01", 1000);
salesOffices.trigger("event02", 2000);
salesOffices.remove("event01", fn1);

// 输出: false 说明删除成功
console.log(salesOffices.trigger("event01", 1000));



// 命令模式：一种数据驱动的设计模式，它属于行为型模式
// 步骤：1、请求以命令的形式包裹在对象中，并传给调用对象。2、调用对象寻找可以处理该命令的合适的对象，并把该命令传给相应的对象。3、该对象执行命令。
// 在这三步骤中，分别有3个不同的主体：发送者、传递者和执行者。在实现过程中，需要特别关注。
// 应用场景：有时候需要向某些对象发送请求，但是又不知道请求的接受者是谁，更不知道被请求的操作是什么。此时，命令模式就是以一种松耦合的方式来设计程序。
// 接受到命令，执行相关操作
const MenuBar = {
  refresh(){
    console.log("刷新菜单页面");
  }
};

// 命令对象，execute方法就是执行相关命令
const RefreshMenuBarCommand = receiver => {
  return {
    execute(){
      receiver.refresh();
    }
  }
};

// 为按钮对象指定对应的 对象 
const setCommand = (button, command) => {
  button.onclick = () => {
    command.execute();
  }
};

let refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
let button = document.querySelector("button");
setCommand(button, refreshMenuBarCommand);



// 组合模式： 将对象组合成树形结构以表示“部分-整体”的层次结构。
// 用小的子对象构造更大的父对象，而这些子对象也由更小的子对象构成； 单个对象和组合对象对于用户暴露的接口具有一致性，而同种接口不同表现形式亦体现了多态性
// 应用场景： 在需要针对“树形结构”进行操作的应用中使用，例如扫描文件夹、渲染网站导航结构等等。
// 文件类
class File {
  constructor(name) {
    this.name = name || "File";
  }

  add() {
    throw new Error("文件夹下面不能添加文件");
  }

  scan() {
    console.log("扫描文件: " + this.name);
  }
}

// 文件夹类
class Folder {
  constructor(name) {
    this.name = name || "Folder";
    this.files = [];
  }

  add(file) {
    this.files.push(file);
  }

  scan() {
    console.log("扫描文件夹: " + this.name);
    for (let file of this.files) {
      file.scan();
    }
  }
}

let home = new Folder("用户根目录");

let folder1 = new Folder("第一个文件夹"),
  folder2 = new Folder("第二个文件夹");

let file1 = new File("1号文件"),
  file2 = new File("2号文件"),
  file3 = new File("3号文件");

// 将文件添加到对应文件夹中
folder1.add(file1);

folder2.add(file2);
folder2.add(file3);

// 将文件夹添加到更高级的目录文件夹中
home.add(folder1);
home.add(folder2);

// 扫描目录文件夹
home.scan();

// 最终输出结果是：
// 扫描文件夹: 用户根目录
// 扫描文件夹: 第一个文件夹
// 扫描文件: 1号文件
// 扫描文件夹: 第二个文件夹
// 扫描文件: 2号文件
// 扫描文件: 3号文件



// 享元模式： 运用共享技术来减少创建对象的数量，从而减少内存占用、提高性能。
// 将一个对象的属性划分为内部状态(可以被对象集合共享，通常不会改变) 和 外部状态(根据应用场景经常改变)。享元模式是利用时间换取空间的优化模式。
// 只要是需要大量创建重复的类的代码块，均可以使用享元模式抽离内部/外部状态，减少重复类的创建。
// 对象池
class ObjectPool {
  constructor() {
    this._pool = []; 
  }

  // 创建对象
  create(Obj) {
    return this._pool.length === 0
      ? new Obj(this) // 对象池中没有空闲对象，则创建一个新的对象
      : this._pool.shift(); // 对象池中有空闲对象，直接取出，无需再次创建
  }

  // 对象回收
  recover(obj) {
    return this._pool.push(obj);
  }

  // 对象池大小
  size() {
    return this._pool.length;
  }
}

// 模拟文件对象
class File {
  constructor(pool) {
    this.pool = pool;
  }

  // 模拟下载操作
  download() {
    console.log(`+ 从 ${this.src} 开始下载 ${this.name}`);
    setTimeout(() => {
      console.log(`- ${this.name} 下载完毕`); // 下载完毕后, 将对象重新放入对象池
      this.pool.recover(this);
    }, 100);
  }
}


// 以下是测试函数
let objPool = new ObjectPool();

let file1 = objPool.create(File);
file1.name = "文件1";
file1.src = "https://download1.com";
file1.download();

let file2 = objPool.create(File);
file2.name = "文件2";
file2.src = "https://download2.com";
file2.download();

setTimeout(() => {
  let file3 = objPool.create(File);
  file3.name = "文件3";
  file3.src = "https://download3.com";
  file3.download();
}, 200);

setTimeout(
  () =>
    console.log(
      `${"*".repeat(50)}\n下载了3个文件，但其实只创建了${objPool.size()}个对象`
    ),
  1000
);

// 输出结果如下：
// + 从 https://download1.com 开始下载 文件1
// + 从 https://download2.com 开始下载 文件2
// - 文件1 下载完毕
// - 文件2 下载完毕
// + 从 https://download3.com 开始下载 文件3
// - 文件3 下载完毕
// **************************************************
// 下载了3个文件，但其实只创建了2个对象