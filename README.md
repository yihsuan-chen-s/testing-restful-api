# Testing RESTful API

## Setup
``` shell
# Install dependencies
$ npm install

# Loading service at localhost:3000
$ npm start
```
## Usage
``` shell
# 列出目前 DB 內所有帳號列表與狀態
$ curl http://localhost:3000/

# 借用一個「 TW 區域」帳號
$ curl -X POST -H 'Content-Type: application/json' --data '{ "territory": "TW" }' http://localhost:3000/

# 借用一個「過期會員」帳號
$ curl -X POST -H 'Content-Type: application/json' --data '{ "type": "expired" }' http://localhost:3000/

# 歸還 accountTW@kkbox.com 帳號
$ curl -X PUT http://localhost:3000/accountTW@kkbox.com
```
