# 常用的Git命令

## 放弃本地修改，代码强制拉取更新 
git fetch --all 
git reset --hard origin/master 
git pull //可以省略

## 设置远程url
git remote -v //查看url
git remote set-url origin [updated link]
