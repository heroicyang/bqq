## bqq
> 腾讯企业QQ开放平台 API 的 node 实现。

## Usage

```javascript
var express = require('express');
var BQQ = require('node-bqq');

BQQ.init({
  appId: 'bqq app_id',
  appSecret: 'bqq app_secret',
  //ip: 'server ip'
});

// 授权
// -----------------
var app = express();
app.get('/authorize', function(req, res) {
  var authorizeUrl = BQQ.getAuthorizeUrl({
    redirectUrl: 'http://yourdomain.com/authorized',
    state: 'opqrstabcdefghijklmnuvwxyz',
    //ui: 'web|ios|android|auto' // default 'auto'
  });

  res.redirect(authorizeUrl);
});

app.get('/authorized', function(req, res) {
  var code = req.query.code;
  var state = req.query.state;

  BQQ.getAccessToken({
    code: code,
    state: state,
    redirectUrl: 'http://yourdomain.com/authorized'
  }, function(err, data) {
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
- ip          服务器的 IP 地址
```

### BQQ.getAuthorizeUrl(options)
获取认证员工授权的 URL 地址。

```
options:
- redirectUrl  授权成功之后的回调地址
- state        防范 CSRF 攻击，会在授权成功之后原样返回
- ui           授权界面的类型，可选 ('web'|'ios'|'android'|'auto')，默认 'auto'
```

### BQQ.getAccessToken(options)
获取员工 access_token

```
options:
- code          授权成功之后传回的参数
- state         防范 CSRF 攻击
- redirectUrl   需与授权时的地址回调地址保持一致
```
