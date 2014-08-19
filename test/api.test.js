/*global before, it*/

var should = require('should');

var BQQ = require('../lib/index');
var config = require('./fixtures/config');
var companyData = require('./fixtures/company');
var app = require('./fixtures/mock');

before(function(done) {
  var s = app.listen(function() {
    BQQ.init({
      appId: config.appId,
      appSecret: config.appSecret,
      baseSite: 'http://localhost:' + s.address().port
    });

    done();
  });
});

it('bqq.getCompanyInfo(callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.getCompanyInfo(function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    data.data.company_name.should.eql(companyData.company_name);

    done();
  });
});

it('bqq.getDepartments(timestamp, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.getDepartments(function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    data.data.should.have.property('timestamp');
    data.data.should.have.property('items');

    done();
  });
});

it('bqq.getDepartmentsByIds(ids, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.getDepartmentsByIds('74537005', function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    data.data.should.have.property('74537005');

    done();
  });
});

it('bqq.getUsers(timestamp, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.getUsers(function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    data.data.should.have.property('timestamp');
    data.data.should.have.property('items');

    done();
  });
});

it('bqq.getUsersByOpenIds(openIds, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.getUsersByOpenIds('2c0c7cdf67fd7d442db2390dce393bce', function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    data.data.should.have.property('2c0c7cdf67fd7d442db2390dce393bce');

    done();
  });
});

it('bqq.getUsersFace(openIds, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.getUsersFace('2c0c7cdf67fd7d442db2390dce393bce', function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    data.data.should.have.property('items');
    data.data.items.should.have.property('2c0c7cdf67fd7d442db2390dce393bce');

    done();
  });
});

it('bqq.getUsersEmail(openIds, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.getUsersEmail('2c0c7cdf67fd7d442db2390dce393bce', function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    data.data.should.have.property('2c0c7cdf67fd7d442db2390dce393bce');

    done();
  });
});

it('bqq.getUsersMobile(openIds, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.getUsersMobile('2c0c7cdf67fd7d442db2390dce393bce', function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    data.data.should.have.property('2c0c7cdf67fd7d442db2390dce393bce');

    done();
  });
});

it('bqq.getUsersQQ(openIds, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.getUsersQQ('2c0c7cdf67fd7d442db2390dce393bce', function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    data.data.should.have.property('2c0c7cdf67fd7d442db2390dce393bce');

    done();
  });
});

it('bqq.sendTip(data, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.sendTip({
    window_title: 'window_title',
    tips_title: 'tips_title',
    tips_content: 'tips_content'
  }, function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    done();
  });
});

it('bqq.sendBroadcast(data, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.sendBroadcast({
    title: 'title',
    content: 'content',
    recv_open_ids: 'recv_open_ids'
  }, function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    done();
  });
});

it('bqq.sendSms(data, callback)', function(done) {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });

  bqq.sendSms({
    recv_phones: 'recv_phones',
    recv_open_ids: 'recv_open_ids',
    content: 'content'
  }, function(err, data) {
    should.not.exist(err);
    should.exist(data);

    data.ret.should.eql(0);
    done();
  });
});
