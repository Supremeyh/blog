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

## 题目五
```
实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中。

const timeout = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});

const ajax1 = () => timeout(2000).then(() => {
    console.log('1');
    return 1;
});

const ajax2 = () => timeout(1000).then(() => {
    console.log('2');
    return 2;
});

const ajax3 = () => timeout(2000).then(() => {
    console.log('3');
    return 3;
});

const mergePromise = ajaxArray => {
    // 在这里实现你的代码

};

mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log('done');
    console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
```
解析：对于异步函数来说，并不会按顺序执行完一个，再执行后一个。这道题就是考用 Promise 控制异步流程。
答案：
```
// 保存数组中的函数执行后的结果
var data = [];

// Promise.resolve方法调用时不带参数，直接返回一个resolved状态的 Promise 对象。
var sequence = Promise.resolve();

ajaxArray.forEach(function (item) {
    // 第一次的 then 方法用来执行数组中的每个函数
    // 第二次的 then 方法接受数组中的函数执行后返回的结果，并把结果添加到 data 中，然后把 data 返回。
    sequence = sequence.then(item).then(function (res) {
        data.push(res);
        return data;
    });
})

// 遍历结束后，返回一个 Promise，也就是 sequence， 他的 [[PromiseValue]] 值就是 data，而 data（保存数组中的函数执行后的结果）也会作为参数，传入下次调用的 then 方法中。
return sequence;

```

## 题目六
```
以下代码最后输出什么？

const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });

}));

first().then((arg) => {
    console.log(arg);
});
console.log(4);
```
答案：3 7 4 1 2 5
解析：这道题就其实和 Promise 的关系不太大，主要是需要理解 JS执行机制。
这一次，彻底弄懂 JavaScript 执行机制https://juejin.im/post/59e85eebf265da430d571f89。
先执行宏任务，主script ，new Promise立即执行，输出【3】，执行 p 这个new Promise 操作，输出【7】，发现 setTimeout，将回调放入下一轮任务队列（Event Queue），p 的 then，姑且叫做 then1，放入微任务队列，发现 first 的 then，叫 then2，放入微任务队列。执行console.log(4)，输出【4】，宏任务执行结束。再执行微任务，执行 then1，输出【1】，执行 then2，输出【2】。到此为止，第一轮事件循环结束。开始执行第二轮。先执行宏任务里面的，也就是 setTimeout 的回调，输出【5】。resolve(6) 不会生效，因为 p 这个 Promise 的状态一旦改变就不会在改变了。

## 题目七

```
有 8 个图片资源的 url，已经存储在数组 urls 中（即urls = ['http://example.com/1.jpg', ...., 'http://example.com/8.jpg']），而且已经有一个函数 function loadImg，输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。但是我们要求，任意时刻，同时下载的链接数量不可以超过 3 个。请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。
var urls = [
    'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 'https://www.kkkk1000.com/images/getImgData/gray.gif', 'https://www.kkkk1000.com/images/getImgData/Particle.gif', 'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 'https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 'https://www.kkkk1000.com/images/wxQrCode2.png'];
function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function () {
            console.log('一张图片加载完成');
            resolve();
        }
        img.onerror = reject
        img.src = url
    })
};

```
解析：题目的意思是需要我们这么做，先并发请求 3 张图片，当一张图片加载完成后，又会继续发起一张图片的请求，让并发数保持在 3 个，直到需要加载的图片都全部发起请求。用 Promise 来实现就是，先并发请求3个图片资源，这样可以得到 3 个 Promise，组成一个数组，就叫promises 吧，然后不断的调用 Promise.race 来返回最快改变状态的 Promise，然后从数组（promises ）中删掉这个 Promise 对象，再加入一个新的 Promise，直到全部的 url 被取完，最后再使用 Promise.all 来处理一遍数组（promises ）中没有改变状态的 Promise。
答案：
```
var urls = [
    'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 'https://www.kkkk1000.com/images/getImgData/gray.gif', 'https://www.kkkk1000.com/images/getImgData/Particle.gif', 'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 'https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 'https://www.kkkk1000.com/images/wxQrCode2.png'];
    
function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function () {
            console.log('一张图片加载完成');
            resolve();
        }
        img.onerror = reject
        img.src = url
    })
};

function limitLoad(urls, handler, limit) {
    // 对数组做一个拷贝
    const sequence = [].concat(urls)
    let promises = [];

    //并发请求到最大数
    promises = sequence.splice(0, limit).map((url, index) => {
        // 这里返回的 index 是任务在 promises 的脚标，用于在 Promise.race 之后找到完成的任务脚标
        return handler(url).then(() => {
            return index
        }); 
    });

    // 利用数组的 reduce 方法来以队列的形式执行
    return sequence.reduce((last, url, currentIndex) => {
        return last.then(() => {
            // 返回最快改变状态的 Promise
            return Promise.race(promises)
        }).catch(err => {
            // 这里的 catch 不仅用来捕获 前面 then 方法抛出的错误
            // 更重要的是防止中断整个链式调用
            console.error(err)
        }).then((res) => {
            // 用新的 Promise 替换掉最快改变状态的 Promise
            promises[res] = handler(sequence[currentIndex]).then(() => { return res });
        })
    }, Promise.resolve()).then(() => {
        return Promise.all(promises)
    })

}
limitLoad(urls, loadImg, 3)

/*
因为 limitLoad 函数也返回一个 Promise，所以当 所有图片加载完成后，可以继续链式调用

limitLoad(urls, loadImg, 3).then(() => {
    console.log('所有图片加载完成');
}).catch(err => {
    console.error(err);
})
*/

```
