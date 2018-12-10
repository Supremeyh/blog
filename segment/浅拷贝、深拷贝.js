// 浅拷贝(Shallow Copy) VS 深拷贝(Deep Copy)

// 在 JS 中有一些基本类型像是Number、String、Boolean，而对象就是像这样的东西{ name: 'sea', skill: 'Node' }，
// 对象跟基本类型最大的不同就在于他们的传值方式。 基本类型是按值传递，在修改a时并不会改到b。 
var a = 25;
var b = a;
b = 18;
console.log(a);  //25
console.log(b);  //18

// 但对象就不同，对象传的是按引用传值， 
var obj1 = { a: 10, b: 20, c: 30 };
var obj2 = obj1;
obj2.b = 100;
console.log(obj1);   // { a: 10, b: 100, c: 30 } <-- b 被改到了
console.log(obj2);  // { a: 10, b: 100, c: 30 }
// 复制一份obj1叫做obj2，然后把obj2.b改成100，但却不小心改到obj1.b，因为他们根本是同一个对象，
// 这就是所谓的浅拷贝。

// 要避免这样的错误发生就要写成这样：
var obj1 = { a: 10, b: 20, c: 30 };
var obj2 = { a: obj1.a, b: obj1.b, c: obj1.c };
obj2.b = 100;
console.log(obj1);   // { a: 10, b: 20, c: 30 } <-- b 沒被改到
console.log(obj2);   // { a: 10, b: 100, c: 30 }
// 这样就是深拷贝，不会改到原本的obj1。



// 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。
// 但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

// 浅拷贝的实现方式
// 1、简单地复制语句
function simpleClone(initalObj) {    
  var obj = {};    
  for ( var i in initalObj) {
    obj[i] = initalObj[i];
  }    
  return obj;
}

// 2、Object.assign()
// 该方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。
Object.assign(target, ...sources)



// 深拷贝的实现方式
// 1、手动复制， 把一个对象的属性复制给另一个对象的属性， 但这样很麻烦，而且这样的本质也不能算是 Deep Copy，因为对象里面也可能会是对象
var obj1 = { a: 10, b: 20, c: 30 };
var obj2 = { a: obj1.a, b: obj1.b, c: obj1.c };

// 2、：Object.assign({}, obj1)， 对象只有一层时
var obj2 = Object.assign({}, obj1)
// 先建立一个空对象{}，接着把obj1中所有的属性复制过去，所以obj2会长得跟obj1一样，这时候再修改obj2.b也不会影响obj1。
// 因为Object.assign跟我们手动复制的效果相同，所以一样只能处理深度只有一层的对象，没办法做到真正的 Deep Copy。


// 3、JSON.parse(JSON.stringify(obj1))， 只能用在单纯只有数据的对象
var obj2 = JSON.parse(JSON.stringify(obj1));
// 用JSON.stringify把对象转成字符串，再用JSON.parse把字符串转成新的对象。这样做是真正的Deep Copy，这种方法简单易用。
// 但是这种方法也有不少坏处，譬如它会抛弃对象的constructor。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object。
// 这种方法能正确处理的对象只有 Number, String, Boolean, Array, 扁平对象，即那些能够被 json 直接表示的数据结构。RegExp对象是无法通过这种方式深拷贝。
// 也就是说，只有可以转成JSON格式的对象才可以这样用，像function没办法转成JSON。

// 4、递归拷贝
function deepClone(initalObj, finalObj) {    
  var obj = finalObj || {};    
  for (var i in initalObj) {        
    var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if(prop === obj) {            
      continue;
    }        
    if (typeof prop === 'object') {
      obj[i] = (prop.constructor === Array) ? [] : {};            
      arguments.callee(prop, obj[i]);
    } else {
      obj[i] = prop;
    }
  }    
  return obj;
}


// 5、使用Object.create()方法
var newObj = Object.create(oldObj)

function deepClone(initalObj, finalObj) {    
  var obj = finalObj || {};    
  for (var i in initalObj) {        
    var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if(prop === obj) {            
      continue;
    }        
    if (typeof prop === 'object') {
      obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
    } else {
      obj[i] = prop;
    }
  }    
  return obj;
}



// 6、lodash
var obj2 = _.cloneDeep(obj1);


// 7、jquery,  有提供一个$.extend可以用来做 Deep Copy。
var obj2 = $.extend(true, {}, obj1);



























