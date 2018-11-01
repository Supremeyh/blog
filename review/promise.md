 # Promise 面试题


## 题目一
 ```
 const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
})

promise.then(() => {
    console.log(3);
})

console.log(4)
 ```
 解析：首先 Promise 新建后立即执行，所以会先输出 1，2，而 Promise.then() 内部的代码在 当次 事件循环的 结尾 立刻执行 ，所以会继续输出4，最后输出3。
 答案：1 2 4 3

 ## 题目二
 ```
 const promise = new Promise((resolve, reject) => {
    resolve('success1');
    reject('error');
    resolve('success2');
});

promise.then((res) => {
    console.log('then:', res);
}).catch((err) => {
    console.log('catch:', err);
})
```
解析：resolve 函数将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject 函数将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。而一旦状态改变，就不会再变。所以 代码中的reject('error'); 不会有作用。
Promise 只能 resolve 一次，剩下的调用都会被忽略。所以 第二次的 resolve('success2'); 也不会有作用。
答案：then: success1

## 题目三
```
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```
解析：Promise.resolve 方法的参数如果是一个原始值，或者是一个不具有 then 方法的对象，则 Promise.resolve 方法返回一个新的 Promise 对象，状态为resolved，Promise.resolve 方法的参数，会同时传给回调函数。then 方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为 then(null)，这就会导致前一个 Promise 的结果会穿透下面。
答案：1

## 题目四
```
红灯三秒亮一次，绿灯一秒亮一次，黄灯两秒亮一次, 如何让这三个灯按照这个规律不断交替重复亮灯？（用Promse实现。
```
解析：红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次，意思就是3秒，执行一次 red 函数，2秒执行一次 green 函数，1秒执行一次 yellow 函数，不断交替重复亮灯，意思就是按照这个顺序一直执行这3个函数，这步可以就利用递归来实现。主要考查Promise的应用，JavaScript 异步运行机制（一次事件循环中，同步代码先入执行栈执行，异步代码分情况将其任务注册到任务队列中。只有执行栈清空，主线程才会从任务队列中读取任务，使其入栈执行。setTimeout相关的异步队列会挂起直到主进程空闲。如果使用类似 while(true)无限循环，会永久占据主线程，使得执行栈永远不清空，setTimeout的函数永远不会执行！），以及递归。
https://segmentfault.com/a/1190000016848192;
答案：
```
三个亮灯函数
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

时间控制
var light = function(cb, timer){
    return new Promise((resolve,reject) => {
        setTimeout(function(){
            cb()
            resolve()
        }, timer)
    })
}

var step = function(){
    Promise.resolve()
        .then(function(){
            return light(red, 3000)
        })
        .then(function(){
            return light(green, 1000)
        })
        .then(function(){
            return light(yellow, 2000)
        })
        .then(function(){
            step()
        })
        
}

step()

```


