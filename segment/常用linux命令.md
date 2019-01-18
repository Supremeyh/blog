// 查看端口占用
lsof -i:443

// -t (tcp), -u (udp), -n 拒绝显示别名，能显示数字的全部转化为数字, -l 仅列出在Listen(监听)的服务状态, -p 显示建立相关链接的程序名
netstat -tunlp | grep 8000


// chomd 文件权限
// 分别表示User、Group、及Other的权限, r=4，w=2，x=1
sudo chmod 761 file