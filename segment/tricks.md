
### 选中某一项
```
<div v-for= "(item, index) in List">
  <p @click="currentCheckd=index" :class="{'current': currentCheckd===index}"></p>
</div>

```

### linux 安装node 
```
查看 ls -la

下载安装包到服务器， 如用 wget (或者ssh/ftp)
wget https://nodejs.org/dist/v10.14.1/node-v10.14.1-linux-x64.tar.xz 

解压xz文件
xz -d node-v10.14.1-linux-x64.tar.xz  (解压缩，然后压缩包消失)
解压tar文件
tar -xvf node-v10.14.1-linux-x64.tar

创建软连接 ln -s source object 
ln -s /node-v10.14.1-linux-x64/bin/node  /usr/bin/node
ln -s /node-v10.14.1-linux-x64/bin/npm  /usr/bin/npm

删除软链接
rm -rf /usr/bin/node   (不是node/)

检验查看版本
node -v
npm -v

```
