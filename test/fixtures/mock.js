var express = require('express');
var _ = require('lodash');
var config = require('./config');
var accessData = require('./access-data');

var app = express();

app.get('/oauth2/token', function(req, res) {
  if (req.query.code !== config.code || req.query.app_id !== config.appId ||
      req.query.app_secret !== config.appSecret) {
    return res.json({ ret: 1 });
  }

  res.json({
    ret: 0,
    data: _.extend({
      state: req.query.state
    }, accessData)
  });
});

app.get('/oauth2/companyRefresh', function(req, res) {
  if (req.query.app_id !== config.appId || req.query.app_secret !== config.appSecret ||
      req.query.refresh_token !== accessData.refresh_token) {
    return res.json({ ret: 1 });
  }

  res.json({
    ret: 0,
    data: _.omit(accessData, 'open_id')
  });
});

app.use('/api/*', function(req, res, next) {
  if (req.query.app_id !== config.appId || req.query.company_id !== config.companyId ||
      req.query.company_token !== config.companyToken) {
    return res.json({ ret: 1 });
  }

  next();
});

app.get('/api/corporation/get', function(req, res) {
  res.json({
    ret: 0,
    data: require('./company')
  });
});

app.get('/api/dept/list', function(req, res) {
  res.json({
    ret: 0,
    data: require('./department').list
  });
});

app.get('/api/dept/info', function(req, res) {
  res.json({
    ret: 0,
    data: require('./department').info
  });
});

app.get('/api/user/list', function(req, res) {
  res.json({
    ret: 0,
    data: require('./user').list
  });
});

app.get('/api/user/info', function(req, res) {
  res.json({
    ret: 0,
    data: require('./user').info
  });
});

app.get('/api/user/face', function(req, res) {
  res.json({
    ret: 0,
    data: require('./user').face
  });
});

app.get('/api/user/email', function(req, res) {
  res.json({
    ret: 0,
    data: require('./user').email
  });
});

app.get('/api/user/mobile', function(req, res) {
  res.json({
    ret: 0,
    data: require('./user').mobile
  });
});

app.get('/api/user/qq', function(req, res) {
  res.json({
    ret: 0,
    data: require('./user').qq
  });
});

app.post('/api/tips/send', function(req, res) {
  res.json({ ret: 0 });
});

app.post('/api/broadcast/send', function(req, res) {
  res.json({ ret: 0 });
});

app.post('/api/sms/send', function(req, res) {
  res.json({ ret: 0 });
});

module.exports = app;
