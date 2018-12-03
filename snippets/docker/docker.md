### docker
Docker is a platform for developers and sysadmins to develop, deploy, and run applications with containers. The use of Linux containers to deploy applications is called containerization. Containers are not new, but their use for easily deploying applications is.
Docker provides a way to run applications securely isolated in a container, packaged with all its dependencies and libraries.
Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从Apache2.0协议开源。
Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。
容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。


docker pull 获取image
docker build 创建image
docker image 查看所有镜像
docker run 运行container
docker ps 查看运行中的docker进程
docker rm 删除container
docker rmi 删除image
docker cp 在host和container之间拷贝文件
docker commit 保存改动为新的image


