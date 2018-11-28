### CSP  Content-Security-Policy 内容安全策略
> 作用:限制资源获取,报告资源获取越权，减少和报告跨站脚本XSS攻击。CSP通过指定有效域——即浏览器认可的可执行脚本的有效来源——使服务器管理者有能力减少或消除XSS攻击所依赖的载体。一个CSP兼容的浏览器将会仅执行从白名单域获取到的脚本文件，忽略所有的其他脚本 (包括内联脚本和HTML的事件处理属性)；数据包嗅探攻击, 除限制可以加载内容的域，服务器还可指明哪种协议允许使用；比如 (从理想化的安全角度来说)，服务器可指定所有内容必须通过HTTPS加载。

> 限制方式: default-src限制全局;  制定资源类型 connect-src、img-src、font-src、media-src、frame-src、script-src、manifest-src、style-src

> 一个策略由一系列策略指令所组成，每个策略指令都描述了一个针对某个特定类型资源以及生效范围的策略。你的策略应当包含一个default-src策略指令，在其他资源类型没有符合自己的策略时应用该策略(有关完整列表查看default-src )。一个策略可以包含 default-src  或者 script-src 指令来防止内联脚本运行, 并杜绝eval()的使用。 一个策略也可包含一个 default-src 或  style-src 指令去限制来自一个 style 元素或者style属性的內联样式.

* Content-Security-Policy: default-src 'self': 一个网站管理者想要所有内容均来自站点的同一个源 (不包括其子域名)
* Content-Security-Policy: default-src 'self' *.trusted.com: 允许内容来自信任的域名及其子域名 (域名不必须与CSP设置所在的域名相同)
* Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com: 允许网页应用的用户在他们自己的内容中包含来自任何源的图片, 但是限制音频或视频需从信任的资源提供者(获得)，所有脚本必须从特定主机服务器获取可信的代码.

> 对策略进行测试, 为降低部署成本，CSP可以部署为报告(report-only)模式。在此模式下，CSP策略不是强制性的，但是任何违规行为将会报告给一个指定的URI地址。Content-Security-Policy-Report-Only: policy

> 启用违例报告, 默认情况下，违规报告并不会发送。为启用发送违规报告，你需要指定 report-uri 策略指令，并提供至少一个URI地址去递交报告：Content-Security-Policy: default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi

