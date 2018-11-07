// 获取url指定属性
function getQueryString(name) {
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
  let r = window.location.search.substr(1).match(reg)
  if (r) {
    if (r != null) {
    return unescape(r[2])
  }
  }
  return null
}

/*
[ 协议名 ]:// [ 域名 ] : [ 端口号 ] / [ 路 ] ... [ 径 ]/ [ 文件名 ] ？ [ 参 ]& [ 数 ] & [ 部 ]& [ 分 ] # [ 锚部分 ]

示例： https://github.com:88/index.php?name=supremeyh&year=2018#first
protocol:	协议(有冒号)，	"https:"
hostname:	服务器的名字，	"github.com"
port:	端口，	"88"
host:	等于hostname + port，	"github.com:88"
origin: url的源, 协议+主机名+端口 
pathname:	路径部分，URL中主机名后的部分，	"/index.php"
search:	"?"后的部分，又称为查询字符串，	"?name=supremeyh&year=2018"。 只能取到第一个"?"后面和“#”之前的内容，当url含有锚点时，返回空字符
hash:	第一个"#"之后的内容， 	"#first"       
href:	当前页面的完整URL，	" https://github.com:88/index.php?name=supremeyh&year=2018#first"

window.location === document.location 互相等价，可以交换使用


*/


