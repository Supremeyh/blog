## nginx 
Nginx是一款轻量级的HTTP服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的IO性能，时常用于服务端的反向代理和负载均衡。

### 优点
* 支持海量高并发：采用IO多路复用epoll。官方测试Nginx能够支持5万并发链接，实际生产环境中可以支撑2-4万并发连接数。
* 内存消耗少：在主流的服务器中Nginx目前是内存消耗最小的了，比如我们用Nginx+PHP，在3万并发链接下，开启10个Nginx进程消耗150M内存。
* 免费使用可以商业化：Nginx为开源软件，采用的是2-clause BSD-like协议，可以免费使用，并且可以用于商业。
* 配置文件简单：网络和程序配置通俗易懂，即使非专业运维也能看懂。
* 反向代理，负载均衡。正向代理代理的对象是客户端，反向代理代理的对象是服务端。
* 此外，web缓存加速，清除指定url缓存，健康检查，后端服务器故障转移， rewrite重写， 易用。


###组成
Nginx由内核和模块组成，其中，内核的设计非常微小和简洁，完成的工作也非常简单，仅仅通过查找配置文件将客户端请求映射到一个location block（location是Nginx配置中的一个指令，用于URL匹配），而在这个location中所配置的每个指令将会启动不同的模块去完成相应的工作。
Nginx的模块从结构上分为核心模块、基础模块和第三方模块：
核心模块：HTTP模块、EVENT模块和MAIL模块
基础模块：HTTP Access模块、HTTP FastCGI模块、HTTP Proxy模块和HTTP Rewrite模块，
第三方模块：HTTP Upstream Request Hash模块、Notice模块和HTTP Access Key模块。

Nginx的模块从功能上分为如下三类。
Handlers（处理器模块）。此类模块直接处理请求，并进行输出内容和修改headers信息等操作。Handlers处理器模块一般只能有一个。
Filters （过滤器模块）。此类模块主要对其他处理器模块输出的内容进行修改操作，最后由Nginx输出。
Proxies （代理类模块）。此类模块是Nginx的HTTP Upstream之类的模块，这些模块主要与后端一些服务比如FastCGI等进行交互，实现服务代理和负载均衡等功能。

### 常用命令
/usr/local/nginx/html 默认目录
nginx -v 查看版本
nginx- V 查看完整配置信息
ps -ef | grep nginx 查看nginx进程
nginx 启动
nginx -s reload 重新加载配置文件
nginx -s quit  优雅关闭, 会在处理完当前正在的请求后退出
nginx -s stop 直接关闭 nginx
pkill  -9 nginx 强制停止nginx 
nginx -t 检查修改


### 其他命令
netstat -tnl # 查看网络状态tcp number listen
tail -fn 10 filename # 查看最后10行内容 （cat m1 m2 > file 将文件ml和m2合并后放入文件file中, less, more每次显示一屏, head, tail开头/结尾若干行， touch创建)
:%s/gamma/xxx/g  # vim 中将所有gamma替换为xxx
grep -v "#" nginx.conf | grep -v "^$" >> nginx1.conf 把注释追加到nginx1.conf
du -ah filename # 查看目录及子目录文件大小  （s 不包含子目录文件，h 人类可读）
wc -l  filename # 统计文件行数Word Count  （l行数， c字节数， m字符数， w字数, L最长行长度）
awk '{print $1, $2}' # 文本分析处理, 每行按空格或TAB分割，输出文本中的1、2项

### 配置文件结构
events 和 http 的指令是放在主上下文中，server 放在 http 中, location 放在 server 中。

