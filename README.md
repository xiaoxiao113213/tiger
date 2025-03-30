# docker 容器部署

### 环境条件

- docker
- docker-compose

  以上两个环境依赖自行安装

### 下载启动包

github 下载链接

```shell
curl -O https://github.com/xiaoxiao113213/tiger/releases/download/0.0.1.beta/0-0-1-Beta.zip
```


### 解压并启动

```shell
unzip 0-0-1-Beta.zip
cd 0-0-1-Beta
docker-compose up -d
```

### 访问

```text
http://[部署机器的IP]:8080
账号：admin-devops
密码：111111
```

### 注意事项

```text
  端口冲突问题，如果端口被占用，可以修改docker-compose.yml文件中的端口号
  例如：将80:80 修改为 81:80 代表将容器的80端口映射到宿主机的81端口 这个时候就可以通过 http://[部署机器的IP]:81 访问
  如果 443 端口被占用，可以修改docker-compose.yml文件中的端口号 如果不用443端口，可以将443:443 注释掉 或者删除那一行
```

### 启用https

```text
ssl 放置目录：0-0-1-Beta/mnt/ssl
将证书文件放置到ssl目录下，文件名分别为：XXX.cer 和 xxx.key
```

修改 0-0-1-Beta/conf.d/default.conf

```text
#     listen       443 ssl;
#     server_name  tiger.unquntea.com localhost;
#     ssl_certificate "/mnt/ssl/tiger.unquntea.com.cer";  # 证书路径
#     ssl_certificate_key "/mnt/ssl/tiger.unquntea.com.key";  # 证书密钥路径
```
把注释去掉，修改证书路径 最终结果如下

```text
    listen       443 ssl;
    server_name  xxx域名 localhost;
    ssl_certificate "/mnt/ssl/XXX.cer";  # 证书路径
    ssl_certificate_key "/mnt/ssl/xxx.key";  # 证书密钥路径
```

重启

```shell
docker-compose down
docker-compose up -d

# 如果没有修改docker-compose.yml文件中 可以使用
docker-compose restart tiger-web

```
然后访问 https://[部署机器的IP] 即可


