### 数据协商
客户端发送请求给服务端，客户端会声明请求希望拿到的数据的格式和限制，服务端会根据请求头信息，来决定返回的数据。

> 请求 Accept 
* Accept 声明想要数据的类型;  accept: */*
* Accept-Encoding 数据编码方式，限制服务端如何进行数据压缩; accept-encoding: gzip, deflate, br。 gzip使用最多；br使用比较少但压缩比高。
* Accept-Language 展示语言;  accept-language: zh-CN,zh;q=0.9,en;q=0.8。 浏览器会判断系统的语言自动加上。q代表权重，数值越大权重越大，优先级越高。
* User-Agent 浏览器相关信息。 user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36。 

> 服务端返回Content
* Content-Type 对应 Accept，从 Accept 中选择数据类型返回;  
* Content-Encoding 对应 Accept-Encoding，声明服务端数据压缩的方式;  
```
const zlib = require('zlib') // 引入包

const html = fs.readFileSync('test.html') // 这里不加 utf8，加了返回的就是字符串格式了

response.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Encoding': 'gzip'
})

response.end(zlib.gzipSync(html)) 
```
* Content-Language 对应 Accept-Language，是否根据请求返回语言。
