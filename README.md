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
