###  CORS
> 当一个资源从与该资源本身所在的服务器不同的域或端口请求一个资源时，资源会发起一个跨域 HTTP 请求
> cross-origin sharing standard 跨域资源共享标准， 跨域限制以及预请求验证
> 简单请求,不需要预请求 : 方法 GET HEAD POST; Content-Type:  text/plain、 multipart/form-data、 application/x-www-form-urlencoded; 首部字段集合为Accept 、Accept-Language、Content-Language、Content-Type （需要注意额外的限制）、DPR、Downlink、Save-Data、Viewport-Width、Width。请求中的XMLHttpRequestUpload 对象未注册任意多个事件监听器； 请求中未使用ReadableStream对象。
> 预检请求:必须首先使用OPTIONS方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。
> 附带身份凭证的请求:Fetch 与 CORS 可以基于  HTTP cookies 和 HTTP 认证信息发送身份凭证。对于跨域 XMLHttpRequest 或 Fetch 请求，如果要发送凭证信息，需要设置XMLHttpRequest 的 withCredentials为true，从而向服务器发送 Cookies。同时，服务器端的响应中携带 Access-Control-Allow-Credentials: true 。此时，服务器不得设置 Access-Control-Allow-Origin 的值为*。
> HTTP 请求首部字段,这些首部字段无须手动设置。 当开发者使用 XMLHttpRequest 对象发起跨域请求时，它们已经被设置就绪: Origin, 表明预检请求或实际请求的源站 URI, 它不包含任何路径信息，只是服务器名称; Access-Control-Request-Method; Access-Control-Request-Headers;
> HTTP 响应首部字段: Access-Control-Allow-Origin; Access-Control-Expose-Headers; Access-Control-Max-Age; Access-Control-Allow-Credentials; Access-Control-Allow-Methods; Access-Control-Allow-Headers。