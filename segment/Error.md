### Error

```
JavaScript中，Error是一个构造函数，通过它创建一个错误对象。当运行时错误产生时，Error的实例对象会被抛出。构造一个Error的语法如下：
new Error([message[, fileName[, lineNumber]]])


Error的种类
除了通用的Error构造函数外，JavaScript还有7个其他类型的错误构造函数。
InternalError: 创建一个代表Javascript引擎内部错误的异常抛出的实例。 如: "递归太多"。非ECMAScript标准。
RangeError: 数值变量或参数超出其有效范围。例子：var a = new Array(-1);
EvalError: 与eval()相关的错误。eval()本身没有正确执行。
ReferenceError: 引用错误。 例子：console.log(b);
SyntaxError: 语法错误。例子：var a = ;
TypeError: 变量或参数不属于有效范围。例子：[1,2].split('.')
URIError: 给 encodeURI或 decodeURl()传递的参数无效。例子：decodeURI('%2')
当JavaScript运行过程中出错时，会抛出上8种(上述7种加上通用错误类型)错误中的其中一种错误。错误类型可以通过error.name拿到。


捕获错误
try...catch..., 不能捕获异步代码中的错误,比较耗费性能，兜底处理
window.onerror = function(message, source, lineno, colno, error) { ... }, 事件监听器,只能声明一次，后续声明会覆盖之前
window.addEventListener('error', function(event) { ... }), 事件处理器,可以绑定多个回调函数, 也适用于资源( <img> 或 <script> )加载失败时


上报错误
最常见、最简单的方式就是通过<img>了。代码简单，且没有跨域烦恼。
function logError(error){
    var img = new Image();
    img.onload = img.onerror = function(){
        img = null;
    }
    img.src = `${上报地址}?${processErrorParam(error)}`;
}

当上报数据比较多时，可以使用post的方式进行上报。







```
