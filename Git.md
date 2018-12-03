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

### tag
> git tag,  或 git show v1.0   // 显示tag信息
> git tag -a v1.0  -m 'first version' // 创建tag
> git push origin v1.0 , 或者 git push origin --tags // 共享tag
> git tag -d v1.0 // 删除tag

