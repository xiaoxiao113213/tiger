### 测试预览（轻点折腾）

[http://123.56.17.62/](http://123.56.17.62/)

```text

账号：admin-devops
密码：111111

账号：小虎
密码：111111

```

# 前端启动

```bash
pnpm install
```

### Start the Development Server

Run the following command to start the development server:

```bash
pnpm dev
```

Visit [http://localhost:3002](http://localhost:3002) to view your application.

### Build for Production

Run the following command to build the production version:

```bash
pnpm build
```

# Tiger 功能模块

[下个迭代计划](%E4%B8%8B%E4%B8%AA%E8%BF%AD%E4%BB%A3%E8%AE%A1%E5%88%92.md)

# 功能模块

- sso （文档待完善，共已出，本应用就是基于sso登录的）
    - sso登录 基于多应用的统一登录
- 通讯
    - 即时通讯的功能
    - 视频会议（设计中）
    - 语音会议（设计中）
- 日历
    - 日历功能
    - 日程安排
- 任务
    - 个人任务管理
- 项目管理
    - 项目
    - 工时
    - 版本
    - issues
- 知识库（功能扩展中）
    - word在线
    - excel在线
- 审批
    - 审批设置
        - 可自定义表单字段
    - 我的审批
- CICD
    - 流水线
        - 流水线整体功能，可视化节点
    - 插件
    - 执行机
- 跳板机/堡垒机
    - 跳板机功能
    - 远程连接
    - 远程文件传输
- 数据设计
    - 数据库表设计
    - 数据库表字段设计
- AI (功能扩展中)
    - AI工作流
    - AI聊天
    - 模型管理
- 系统设置
    - 个人信息
    - 角色管理
    - 部门管理
    - 应用管理
    - 菜单管理
    - 字典管理
    - 系统参数配置

# docker 容器部署

### 环境条件

- docker
- docker-compose

  以上两个环境依赖自行安装

### 下载启动包

github 下载链接

```shell
wget https://github.com/xiaoxiao113213/tiger/releases/download/0.0.1.beta/0-0-1-Beta.zip
```

### 解压并启动

```shell
unzip 0-0-1-Beta.zip
cd 0-0-1-Beta
docker-compose up -d
```

### 访问

```text
http://[部署机器的IP]:80
账号：admin-devops
密码：111111

账号：小虎
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


