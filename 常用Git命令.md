# 常用的Git命令

### 取回远程origin主机dev分支与本地sea分支合并
> git pull origin dev:sea

### 放弃本地修改，代码强制拉取更新 
> git fetch --all 
> git reset --hard origin/master 
> git pull //可以省略

### 设置远程url
> git remote -v //查看url
> git remote set-url origin [updated link]

### .gitignore不生效
git rm -r --cached .  //清空缓存

