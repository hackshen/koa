# koa

##### koa写的接口，数据来源https://github.com/egotong/nows 

=====

#### 运行环境:

```bash
centos:7
mysql:5.7 # 默认密码123456 ，具体配置文件在docker-compose.yml
node:latest
```
#### 运行: 

```bash
# clonse 项目到本地
git clone https://github.com/hackshen/koa.git
# 在当前目录执行
docker-compose up -d

# 浏览器访问 127.0.0.1:3000
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
