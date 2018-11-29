
### MIME
> 多用途Internet邮件扩展（MIME）类型 是一种标准化的方式来表示文档的性质和格式。浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理文档。
> 通用结构: type/subtype, 大小写不敏感，但是传统写法都是小写
* text/plain	文本文件默认值
* text/html	HTML内容
* text/css	CSS文件
* image/webp	图像
* audio/ogg	音频文件
* video/webm	视频文件
* video/webm	视频文件
* application/octet-stream 二进制数据	
* application/javascript  JavaScript文件或JSONP format
* application/msword  文档类型Microsoft Word		扩展名.doc
* application/vnd.ms-excel   文档类型Microsoft Excel	扩展名.xls	
* application/vnd.openxmlformats-officedocument.spreadsheetml.sheet   文档类型Microsoft Excel (OpenXML)	  扩展名.xlsx	
* multipart/form-data   Multipart 类型

MIME 嗅探, 在缺失 MIME 类型或客户端认为文件设置了错误的 MIME 类型时，浏览器可能会通过查看资源来进行MIME嗅探。每一个浏览器在不同的情况下会执行不同的操作。因为这个操作会有一些安全问题，有的 MIME 类型表示可执行内容而有些是不可执行内容。浏览器可以通过请求头 Content-Type 来设置 X-Content-Type-Options: nosniff 以阻止MIME嗅探。假如请求类型为以下两种，那么阻止请求的发生："style" 但是 MIME 类型不是 "text/css"，"script" 但是 MIME 类型不是JavaScript MIME 类型。