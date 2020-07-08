# koa

##### koa写的接口，数据来源https://github.com/egotong/nows 


#### 运行环境:

```bash
centos:7
mysql:5.7 # 默认密码123456 ，具体配置文件在docker-compose.yml
node:latest
```
#### 运行: 

```bash
# clone 项目到本地
git clone https://github.com/hackshen/koa.git
# 在当前目录执行
docker-compose up -d

# 浏览器访问 127.0.0.1:3000

# 扩容多个koa服务（nginx需要重启）
docker-compose up --scale koa=4 -d
```

#### API:
/message
```bash
http://127.0.0.1:3000/message?table=rainbow&limit=3
可选参数:
    table: rainbow、chicken_soup （目前支持两个表 ）
    limit: 1 （查询条数）
    type: text (默认返回一个对象)
```

/qrcode
```bash
http://127.0.0.1:3000/qrcode?data=Hello
```

/domain
```bash
http://127.0.0.1:3000/domain
```

#### ENV 配置
```bash
#NGINX http端口默认80
NG_HTTP=

#NGINX https端口默认443
NG_HTTPS=

#NGINX 线上和本地测试环境切换 默认dev
NG_ENV=

#NGINX 代理服务的名字 默认koa
APP_NAME=

#NGINX 代理服务的端口 默认3000
APP_PORT=

# MySQL 密码 默认123456
MYSQL_PWD=

# MySQL 端口 默认3306
MYSQL_PORT=

# MySQL 库名
DB_NAME=daily_msg
```
