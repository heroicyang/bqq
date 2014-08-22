/**
 * Module dependencies
 */
var qs = require('querystring');
var _ = require('lodash');
var request = require('./request');

/**
 * BQQ Constructor
 * @param {Object} options
 */
function BQQ(options) {
  options = options || {};

  this.companyId = options.companyId;
  this.companyToken = options.companyToken;
}

/* BQQ 静态方法 */
_.extend(BQQ, {
  init: function(options) {
    options = options || {};

    this.appId = options.appId;
    this.appSecret = options.appSecret;
    this.baseSite = options.baseSite || 'https://openapi.b.qq.com';
    this.redirectUrl = options.redirectUrl;
    this.ip = options.ip;
  },

  getAuthorizeUrl: function(options) {
    options = options || {};

    var queryParams = {
      response_type: 'code',
      app_id: this.appId,
      redirect_uri: this.redirectUrl,
      state: options.state || 1,
      ui: options.ui || 'auto'
    };
    return this.baseSite + '/oauth2/authorize?' + qs.stringify(queryParams);
  },

  getAccessToken: function(code, state, callback) {
    var queryParams = {
      grant_type: 'authorization_code',
      app_id: this.appId,
      app_secret: this.appSecret,
      code: code,
      state: state,
      redirect_uri: this.redirectUrl,
    };
    var tokenUrl = this.baseSite + '/oauth2/token?' + qs.stringify(queryParams);

    request.get(tokenUrl, callback);
  },

  refreshAccessToken: function(refreshToken, callback) {
    var queryParams = {
      app_id: this.appId,
      app_secret: this.appSecret,
      refresh_token: refreshToken
    };
    var tokenUrl = this.baseSite + '/oauth2/companyRefresh?' + qs.stringify(queryParams);

    request.get(tokenUrl, callback);
  }
});

/* BQQ 实例方法 */
_.extend(BQQ.prototype, {
  getBaseParams: function() {
    return {
      company_id: this.companyId,
      company_token: this.companyToken,
      app_id: BQQ.appId,
      open_id: this.openId,
      client_ip: this.clientIp || BQQ.ip,
      oauth_version: 2
    };
  },

  getApiUrl: function(path, extraQueryParams) {
    var queryParams = _.extend(this.getBaseParams(), extraQueryParams);
    return BQQ.baseSite + path + '?' + qs.stringify(queryParams);
  }
});

/* BQQ 相应的 API 实现 */
_.extend(BQQ.prototype, require('./api/company'));
_.extend(BQQ.prototype, require('./api/user'));
_.extend(BQQ.prototype, require('./api/department'));
_.extend(BQQ.prototype, require('./api/message'));

/**
 * Expose BQQ module
 */
module.exports = exports = BQQ;
