# 常用的Git命令

### 取回远程origin主机dev分支与本地sea分支合并
* git pull origin dev:sea

### 放弃本地修改，代码强制拉取更新 
* git fetch --all 
* git reset --hard origin/master 
* git pull //可以省略

### 设置远程url
* git remote -v //查看url
* git remote set-url origin [updated link]

### .gitignore不生效
git rm -r --cached .  //清空缓存

### tag
* git tag,  或 git show v1.0   // 显示tag信息
* git tag -a v1.0  -m 'first version' // 创建tag
* git push origin v1.0 , 或者 git push origin --tags // 共享tag
* git tag -d v1.0 // 删除tag


###  Permission denied (publickey).
* cd ~/.ssh  ls  来查看是否有文件id_rsa以及文件id_rsa.pub
* ssh-keygen -t rsa -C "supremeyh@126.com"   生成ssh key
* ssh -v git@github.com
* ssh-agent -s
* ssh-add ~/.ssh/id_rsa  
* cat id_rsa.pub   拷贝内容到github，在settings下，SSH and GPG keys下new SSH key的key 中保存
* ssh -T git@github.com  验证key

### 修改远程仓库地址
* git remote -v  查看
* git remote rm origin  删除
* git remote add origin ssh://git@repository.git   新增
