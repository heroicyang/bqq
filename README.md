## bqq
![NPM version](http://img.shields.io/npm/v/node-bqq.svg?style=flat-square)&nbsp;
![Build Status](http://img.shields.io/travis/heroicyang/bqq.svg?style=flat-square)&nbsp;
![Dependency Status](http://img.shields.io/david/heroicyang/bqq.svg?style=flat-square)
> 腾讯企业QQ开放平台 API 的 node 实现。

## Usage

```javascript
var express = require('express');
var BQQ = require('node-bqq');

BQQ.init({
  appId: 'bqq app_id',
  appSecret: 'bqq app_secret',
  redirectUrl: 'http://yourdomain.com/authorized',
  //ip: 'server ip'
});

// 授权
// -----------------
var app = express();
app.get('/authorize', function(req, res) {
  var authorizeUrl = BQQ.getAuthorizeUrl({
    state: 'opqrstabcdefghijklmnuvwxyz',
    //ui: 'web|ios|android|auto' // default 'auto'
  });

  res.redirect(authorizeUrl);
});

app.get('/authorized', function(req, res) {
  var code = req.query.code;
  var state = req.query.state;

  BQQ.getAccessToken(code, state, function(err, data) {
    // data.data:
    // {
    //   open_id: '',
    //   access_token: '',
    //   refresh_token: '',
    //   expires_in: 720000,
    //   state: 'opqrstabcdefghijklmnuvwxyz'
    // }
  });
});

// 调用 API
// -----------------
var bqq = new BQQ({
  companyId: 'company id',
  companyToken: 'company token'
});
bqq.getCompanyInfo(function(err, data) {
  // 获取到企业基本信息...
});
```

## API

### BQQ.init(options)
初始化 BQQ ...指定开放平台的应用程序信息。

```
options:
- appId       在开放平台申请应用获得的 app_id
- appSecret   在开放平台申请应用获得的 app_secret
- redirectUrl 在开放平台填写的授权回调地址
- ip          服务器的 IP 地址
```

### BQQ.getAuthorizeUrl(options)
获取认证员工授权的 URL 地址。

```
options:
- state        防范 CSRF 攻击，会在授权成功之后原样返回
- ui           授权界面的类型，可选 ('web'|'ios'|'android'|'auto')，默认 'auto'
```

### BQQ.getAccessToken(code, state, callback)
获取员工 access_token

```
code:   授权成功之后传回的参数
state:  防范 CSRF 攻击
callback(err, data)
```

### BQQ.refreshAccessToken(refreshToken, callback)
刷新 access_token

```
refreshToken: 第一次刷新则是授权时取得的 refresh_token，后面则是刷新授权后取得的
callback(err, data)
```

### bqq.getCompanyInfo(callback)
获取企业的基本资料。

### bqq.getUsers(timestamp, callback)
获取员工资料列表，全部获取或是自上次获取之后变更的。
```
timestamp: 上次拉取获得的时间戳，首次拉取或全量拉取请传 `0`。(default `0`)
```

### bqq.getUsersByOpenIds(openIds, callback)
根据 `open_id` 获取单个或多个员工的资料。

```
openIds: 员工的 open_id 列表，使用英文逗号分隔
```

### bqq.getUsersFace(openIds, typeId, callback)
根据 `open_id` 获取单个或多个员工的头像信息。

```
openIds: 员工的 open_id 列表，使用英文逗号分隔
typeId: 头像大小。 (default `4`)
- `1`  40×40 头像
- `2`  40×40 动态头像
- `3`  100×100 头像
- `4`  140×140 头像
```

### bqq.getUsersEmail(openIds, callback)
根据 `open_id` 获取单个或多个员工的邮箱信息。

```
openIds: 员工的 open_id 列表，使用英文逗号分隔
```

### bqq.getUsersMobile(openIds, callback)
根据 `open_id` 获取单个或多个员工的手机号码。

```
openIds: 员工的 open_id 列表，使用英文逗号分隔
```

### bqq.getUsersQQ(openIds, callback)
根据 `open_id` 获取单个或多个员工的 QQ号码。

```
openIds: 员工的 open_id 列表，使用英文逗号分隔
```

### bqq.getDepartments(timestamp, callback)
获取部门资料列表，全部获取或是自上次获取之后变更的。
```
timestamp: 上次拉取获得的时间戳，首次拉取或全量拉取请传 `0`。(default `0`)
```

### bqq.getDepartmentsByIds(ids, callback)
根据 `dept_id` 获取单个或多个部门的资料。

```
ids: 部门的 dept_id 列表，使用英文逗号分隔
```

### bqq.sendTip(data, callback)
向指定的员工QQ客户端发送弹窗消息。`data` 参数请参见 [企业QQ开放平台API文档](http://open.b.qq.com/wiki/api:tips_send)。

### bqq.sendBroadcast(data, callback)
向指定的员工QQ客户端发送广播消息。`data` 参数请参见 [企业QQ开放平台API文档](http://open.b.qq.com/wiki/api:broadcast_send)。

### bqq.sendSms(data, callback)
向指定的员工发送手机短信。`data` 参数请参见 [企业QQ开放平台API文档](http://open.b.qq.com/wiki/api:sms_send)。
