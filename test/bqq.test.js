/*global it*/

var qs = require('querystring');
var should = require('should');

var BQQ = require('../lib/index');
var config = require('./fixtures/config');
var accessData = require('./fixtures/access-data');
var app = require('./fixtures/mock');

it('BQQ.init(options)', function() {
  BQQ.init({
    appId: '12345',
    appSecret: '67890',
    baseSite: 'http://bqq.com'
  });

  BQQ.appId.should.eql('12345');
  BQQ.appSecret.should.eql('67890');
  BQQ.baseSite.should.eql('http://bqq.com');
});

it('BQQ.getAuthorizeUrl(options)', function() {
  var authorizeUrl = BQQ.getAuthorizeUrl({
    redirectUrl: 'http://app.com/oauth2/callback',
    state: 'asdfg'
  });
  var queryParams = {
    response_type: 'code',
    app_id: '12345',
    redirect_uri: 'http://app.com/oauth2/callback',
    state: 'asdfg',
    ui: 'auto'
  };

  authorizeUrl.should.eql('http://bqq.com/oauth2/authorize?' + qs.stringify(queryParams));
});

it('BQQ.getAccessToken(options)', function(done) {
  var s = app.listen(function() {
    BQQ.init({
      appId: config.appId,
      appSecret: config.appSecret,
      baseSite: 'http://localhost:' + s.address().port
    });

    BQQ.getAccessToken({
      code: config.code,
      state: 'asdfg',
      redirectUrl: 'http://app.com/oauth2/callback'
    }, function(err, data) {
      should.not.exist(err);
      should.exist(data);

      data.ret.should.eql(0);
      data.data.open_id.should.eql(accessData.open_id);
      data.data.state.should.eql('asdfg');

      done();
    });
  });
});

it('bqq.getBaseParams()', function() {
  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });
  var params = bqq.getBaseParams();

  params.should.have.property('app_id', config.appId);
  params.should.have.property('company_id', config.companyId);
  params.should.have.property('company_token', config.companyToken);
  params.should.have.property('oauth_version', 2);
});

it('bqq.getApiUrl(path, extraQueryParams)', function() {
  BQQ.init({
    appId: '12345',
    appSecret: '67890',
    baseSite: 'http://bqq.com'
  });

  var bqq = new BQQ({
    companyId: config.companyId,
    companyToken: config.companyToken
  });
  var apiUrl = bqq.getApiUrl('/api/user/list', { timestamp: 0 });
  
  apiUrl.should.eql('http://bqq.com/api/user/list?' +
    'company_id=zTO8ehphrLtEBX28OKD99gbLRbqDSUxn' +
    '&company_token=dukJ7o9bVMk8zsQ8tYrsBpk5dS5pbkuY' +
    '&app_id=12345&open_id=&client_ip=&oauth_version=2&timestamp=0');
});
