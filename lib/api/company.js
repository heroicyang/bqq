/**
 * Module dependencies
 */
var requset = require('../request');

/**
 * 获取企业的基本信息
 *
 * API wiki: http://open.b.qq.com/api:corporation_get
 *
 * @param {Function} callback Callback function with (err, data)
 */
exports.getCompanyInfo = function(callback) {
  var apiUrl = this.getApiUrl('/api/corporation/get');
  requset.get(apiUrl, callback);
};
