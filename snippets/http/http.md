# HTTP
> HTTP Hyper Text Transfer Protocol（超文本传输协议）是一个基于请求与响应模式的、无状态的、应用层的协议，常基于TCP的连接方式，HTTP1.1版本中给出一种持续连接的机制，绝大多数的Web开发，都是构建在HTTP协议之上的Web应用。

> HTTP协议是用于从WWW服务器传输超文本到本地浏览器的传送协议。它可以使浏览器更加高效，使网络传输减少。它不仅保证计算机正确快速地传输超文本文档，还确定传输文档中的哪一部分，以及哪部分内容首先显示(如文本先于图形)等。

> HTTP是一个应用层协议，由请求和响应构成，是一个标准的客户端服务器模型。支持客户/服务器模式, 只能客户端发起请求，服务器回送响应; 简单快速：客户向服务器请求服务时，只需传送请求方法和路径, 通信速度很快; 灵活：HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记; 无连接, 限制每次连接只处理一个请求, 服务器处理完客户的请求，并收到客户的应答后，即断开连接; 无状态, HTTP是一个无状态的协议，同一个客户端的这次请求和上次请求是没有对应关系。

> HTTP协议通常承载于TCP协议之上，有时也承载于TLS或SSL协议层之上，这个时候，就成了我们常说的HTTPS。默认HTTP的端口号为80，HTTPS的端口号为443。

### 工作流程
一次HTTP操作称为一个事务，其工作过程可分为四步：客户机与服务器需要建立连接；客户机发送请求给服务器，请求方式的格式为：统一资源标识符（URL）、协议版本号，后边是MIME信息包括请求修饰符、客户机信息和可能的内容；服务器响应请求；客户端显示信息，断开连接。

### 三次握手
浏览器向服务器发出连接请求 SYN，seq:X （x=0）；
服务器回应了浏览器的请求，并要求确认 SYN，ACK，此时seq：y（y为0），ACK：x+1（为1）；
浏览器回应了服务器的确认，连接成功 ACK，此时seq：x+1（为1），ACK：y+1（为1）。

### 浏览器输入URL后http请求返回的完整过程
Redirect -> App cache应用缓存 -> DNS 解析（域名对应ip地址）-> 创建TCP连接 (三次握手) -> Request发送请求 -> Response接收响应

### OSI（Open System Interconnect），即开放式系统互联七层模型（一个理想的模型）：
* 物理层Physical Layer： 实际最终信号的传输是通过物理层实现的,通过物理介质传输比特流, 规定了电平、速度和电缆针脚。常用各种物理设备,集线器、中继器、调制解调器、网线、双绞线、同轴电缆。相当于快递寄送过程中的交通工具，如汽车，火车，飞机，船。
* 数据链路层Data Link Layer: 负责建立和管理节点间的链路。通过各种控制协议，将有差错的物理信道变为无差错的、能可靠传输数据帧的数据链路。分为介质访问控制（MAC）和逻辑链路控制（LLC）两个子层。如网桥、以太交换机、网卡。
* 网络层Network Layer，即IP协议层：通过路由选择算法，为报文或分组通过通信子网选择最适当的路径，控制数据链路层与传输层之间的信息转发，建立、维持和终止网络的连接。寻址、交换、 路由算法、连接服务。如路由器。相当于快递公司庞大的快递网络，全国不同的集散中心
* 传输层Transport Layer：向用户提供可靠的端到端的差错和流量控制，负责传输连接管理、处理传输差错和监控服务质量，保证报文的正确传输，向高层屏蔽下层数据通信的细节，即向用户透明地传送报文。OSI下3层的主要任务是数据通信(通信子网的功能)，上3层的任务是数据处理(资源子网的功能)。常见的协议：TCP、UDP协议、Novell网络中的SPX协议和微软的NetBIOS/NetBEUI协议. 该层是通信子网和资源子网的接口和桥梁，起到承上启下的作用。相当于投递员。
* 会话层Session Layer：组织和协调两个会话进程之间的通信，并对数据交换进行管理。相当于公司的外联部。
* 表示层Presentation Layer：对来自应用层的命令和数据进行解释，对各种语法赋予相应的含义，如编码、数据格式转换和加解密等，并按照一定的格式传送给会话层。相当于公司文秘翻译。
* 应用层Application Layer：提供应用接口，也为用户直接提供各种网络服务。常见应用层的网络服务协议有HTTP，HTTPS，FTP，POP3、SMTP等。
对等通信，为了使数据分组从源传送到目的地，源端OSI模型的每一层都必须与目的端的对等层进行通信，这种通信方式称为对等层通信。在每一层通信过程中，使用本层自己协议进行通信。

### TCP/IP五层模型
* 物理层、数据链路层、网络层、传输层、应用层(对应OSI的会话层、表示层和应用层)

### HTTP1.1版本新特性
默认持久连接节省通信量，只要客户端服务端任意一端没有明确提出断开TCP连接，就一直保持连接，可以发送多次HTTP请求；管线化，客户端可以同时发出多个HTTP请求，而不用一个个等待响应；断点续传原理

### http2与http1.1区别
所有数据二进制传输； 同一连接里面发送多个请求不再需要按照顺序； 头信息压缩以及推送等提高效率的功能

### GET方法与POST方法的区别
1、get重点在从服务器上获取资源，post重点在向服务器发送数据；2、get传输数据是通过URL请求，以field（字段）= value的形式，置于URL后，并用"?"连接，多个请求数据间用"&"连接，这个过程用户是可见的；post将字段与对应值封存在请求实体中发送给服务器，这个过程对用户是不可见的；3、Get传输的数据量小，因为受URL长度限制，但效率较高；Post可以传输大量数据，所以上传文件时只能用Post方式；4、get是不安全的，因为URL是可见的，可能会泄露私密信息，如密码等；post较get安全性较高；5、get方式只能支持ASCII字符，向服务器传的中文字符可能会乱码。post支持标准字符集，可以正确传递中文字符。

### 常用的HTTP方法有哪些？
* GET： 用于请求访问已经被URI（统一资源标识符）识别的资源，可以通过URL传参给服务器。
* POST：用于传输信息给服务器，主要功能与GET方法类似，但一般推荐使用POST方式。
* PUT： 传输文件，报文主体中包含文件内容，保存到对应URI位置。
* HEAD： 获得报文首部，与GET方法类似，只是不返回报文主体，一般用于验证URI是否有效。
* DELETE：删除文件，与PUT方法相反，删除对应URI位置的文件。
* OPTIONS： 请求查询服务器的性能，或者查询与资源相关的选项和需求, 查询相应URI支持的HTTP方法。
* TRACE: 请求服务器回送收到的请求信息，主要用于测试或诊断
* CONNECT: 保留将来使用

### http请求由三部分组成，分别是：请求行、消息报头、请求正文
请求报文包含三部分：
a、请求行：包含请求方法、URI、HTTP版本信息。 GET /test/hi.txt HTTP/1.0
b、请求首部字段
c、请求内容主体
响应报文包含三部分：
a、状态行：包含HTTP版本、状态码、状态码的原因短语. HTTP/1.0 200 OK
b、响应首部字段
c、响应内容主体

### 常见HTTP首部字段
a、通用首部字段（请求报文与响应报文都会使用的首部字段）
Date：创建报文时间
Connection：连接的管理
Cache-Control：缓存指令, 缓存指令是单向、独立的,响应中出现的缓存指令在请求中未必会出现,一个消息的缓存指令不会影响另一个消息处理的缓存机制。
请求时的缓存指令包括：no-cache（用于指示请求或响应消息不能缓存）、no-store、max-age、max-stale、min-fresh、only-if-cached;
响应时的缓存指令包括：public、private、no-cache、no-store、no-transform、must-revalidate、proxy-revalidate、max-age、s-maxage.
Transfer-Encoding：报文主体的传输编码方式
b、请求首部字段（请求报文会使用的首部字段）
Host：请求资源所在服务器
Accept：可处理的媒体类型
Accept-Charset：可接收的字符集
Accept-Encoding：可接受的内容编码
Accept-Language：可接受的自然语言
c、响应首部字段（响应报文会使用的首部字段）
Accept-Ranges：可接受的字节范围
Location：令客户端重新定向到的URI
Server：HTTP服务器的安装信息
d、实体首部字段（请求报文与响应报文的的实体部分使用的首部字段）
Allow：资源可支持的HTTP方法
Content-Type：实体主类的类型
Content-Encoding：实体主体适用的编码方式
Content-Language：实体主体的自然语言
Content-Length：实体主体的的字节数
Content-Range：实体主体的位置范围，一般用于发出部分请求时使用


### 常见的HTTP相应状态码
返回的状态
* 1xx：Informational 指示信息--表示请求已接收，继续处理
* 2xx：Success 成功--表示请求已被成功接收、理解、接受
* 3xx：Redirection 重定向--信息不完整，要进行更进一步的补充
* 4xx：Client Error 客户端错误--请求有语法错误或请求无法实现
* 5xx：Server Error 服务器端错误--服务器未能实现合法的请求

* 100 Continue 继续, 客户端必须继续发出请求
* 101 Switching Protocols 交换协议, 客户端要求服务器根据请求转换HTTP协议版本
* 102 Processing 处理

* 200 OK, 请求被正常处理
* 201 Created 创建, 提示知道新文件的URL
* 202 Accepted 已接受, 接受和处理、但处理未完成
* 203 Non-Authoritative Information 非授权信息, 返回信息不确定或不完整
* 204 No Content 无内容,  请求收到，但返回信息为空
* 205 Reset Content 重置内容, 服务器完成了请求，用户代理必须复位当前已经浏览过的文件
* 206 Partial Content 部分内容, 服务器已经完成了部分用户的GET请求
* 207 Multi-Status 多状态
* 208 Already Reported 已报告
* 226 IMIM Used 使用的

* 300 Multiple Choices 多种选择, 请求的资源可在多处得到
* 301 Moved Permanently , 永久性重定向, 在Location响应首部的值仍为当前URL(隐式重定向)。使用301要慎重，一旦使用，服务端更改路由设置，用户如果不清理浏览器缓存，就会一直重定向。
* 302 Found, 临时重定向, 在Location响应首部的值仍为新的URL(显示重定向)。每次请求仍然需要经过服务端指定跳转地址
* 303 See Other ,建议客户端访问其他URL或访问方式,能通过GET方法重定向到另一个URI上
* 304 Not Modified, 请求的资源没有改变 可以继续使用缓存
* 305 Use Proxy 使用代理
* 306 Switch Proxy 开关代理, 前一版本HTTP中使用的代码，现行版本中不再使用
* 307 Temporary Redirect , 临时重定向，与302类似，只是强制要求使用POST方法
* 308 Permanent Redirect 永久重定向

* 400 Bad Request 错误的请求, 服务器不理解请求的语法
* 401 Unauthorized 未授权, 请求要求身份验证。对于需要登录的网页，服务器可能返回此响应
* 402 Payment Required 需要付费
* 403Forbidden 服务器拒绝访问
* 404 Not Found 服务器找不到请求的网页
* 405 Method Not Allowed 不允许的方法
* 406 Not Acceptable 不可接受
* 407 Proxy Authentication Required 代理服务器需要身份验证, 与 401（未授权）类似，但指定请求者应当授权使用代理
* 408 Request Timeout 请求超时
* 409 Conflict 冲突, 服务器在完成请求时发生冲突。服务器必须在响应中包含有关冲突的信息。
* 410 Gone 已删除, 如果请求的资源已永久删除，服务器就会返回此响应
* 411 Length Required 需要长度, 服务器不接受不含有效内容长度标头字段的请求
* 412 Precondition Failed 前提条件失败, 服务器未满足请求者在请求中设置的其中一个前提条件
* 413 Payload Too Large 负载过大
* 414 URI Too Long 太长
* 415 Unsupported Media Type 不支持的媒体类型, 请求的格式不受请求页面的支持
* 416 Range Not Satisfiable 的范围不合适, 如果页面无法提供请求的范围，则服务器会返回此状态代码
* 417 Expectation Failed 预期失败, 服务器未满足"期望"请求标头字段的要求
* 418 I'm a teapot 我是一个茶壶
* 421 Misdirected Request 误导请求
* 422 Unprocessable Entity 无法处理的实体
* 423 Locked 锁定
* 424 Failed Dependency 失败的依赖
* 426 Upgrade Required 升级所需
* 428 Precondition Required 所需的先决条件
* 429 Too Many Requests 太多的请求
* 431 Request Header Fields Too Large 请求头字段太大
* 451 Unavailable For Legal Reasons 不可出于法律原因

* 500 Internal Server Error 内部服务器错误
* 501 Not Implemented 未执行, 服务器不具备完成请求的功能。例如，服务器无法识别请求方法时可能会返回此代码
* 502 Bad Gateway 错误的网关, 服务器作为网关或代理，从上游服务器收到无效响应。
* 503 Service Unavailable 服务不可用, 服务器目前无法使用（由于超载或停机维护）。通常，这只是暂时状态。
* 504 Gateway Timeout 网关超时, 服务器作为网关或代理，但是没有及时从上游服务器收到请求
* 505 HTTP Version Not Supported 不支持HTTP版本
* 506 Variant Also Negotiates 变体也进行协商
* 507 Insufficient Storage 存储空间不足
* 508 Loop Detected 检测到循环
* 510 Not Extended 不延长
* 511 Network Authentication Required 网络需要身份验证


### URI、URL和URN
* URI：Uniform Resource Identifier，即统一资源标志符，用来唯一的标识一个资源。
* URL：Uniform Resource Locator，统一资源定位符, 也叫Web地址。即URL可以用来标识一个资源，而且还指明了如何locate这个资源。
* URN：Uniform Resource Name，统一资源命名。即通过名字来表示资源的。


### HTTP的缺点与HTTPS
a、通信使用明文不加密，内容可能被窃听；
b、不验证通信方身份，可能遭到伪装；
c、无法验证报文完整性，可能被篡改。
HTTPS就是HTTP加上加密处理（一般是SSL安全通信线路）+认证+完整性保护

### HTTP优化
利用负载均衡优化和加速HTTP应用；利用HTTP Cache来优化网站

### curl 利用URL规则在http命令行下工作的文件传输工具。它支持文件的上传和下载的是综合传输工具，习惯称url为下载工具
curl [option] [url]
如 curl -v baidu.com
```
* Rebuilt URL to: www.baidu.com/
*   Trying 61.135.169.125...
* TCP_NODELAY set
* Connected to www.baidu.com (61.135.169.125) port 80 (#0)
> GET / HTTP/1.1
> Host: www.baidu.com
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Accept-Ranges: bytes
< Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
< Connection: Keep-Alive
< Content-Length: 2381
< Content-Type: text/html
< Date: Mon, 26 Nov 2018 13:59:17 GMT
< Etag: "588604c4-94d"
< Last-Modified: Mon, 23 Jan 2017 13:27:32 GMT
< Pragma: no-cache
< Server: bfe/1.0.8.18
< Set-Cookie: BDORZ=27315; max-age=86400; domain=.baidu.com; path=/
<
```


### HTTPS
> HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全。
> HTTPS协议的主要作用可以分为两种：确认网站的真实性；建立一个信息安全通道，来保证数据传输的安全。
> 区别主要如下：1、https协议需要ca申请证书，需要费用。 2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。3、完全不同的连接方式和端口，http是80，https是443。　4、http的连接很简单，无状态；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。
> 缺点: 1、HTTPS协议握手阶段比较费时，会使页面的加载时间延长近50%，增加10%到20%的耗电；2、HTTPS连接缓存不如HTTP高效，会增加数据开销和功耗，甚至已有的安全措施也会因此而受到影响；3、SSL证书需要钱，功能越强大的证书费用越高，个人网站、小网站没有必要一般不会用。4、SSL证书通常需要绑定IP，不能在同一IP上绑定多个域名，IPv4资源不可能支撑这个消耗。5、HTTPS协议的加密范围也比较有限，在黑客攻击、拒绝服务攻击、服务器劫持等方面几乎起不到什么作用。最关键的，SSL证书的信用链体系并不安全，特别是在某些国家可以控制CA根证书的情况下，中间人攻击一样可行。

