/**
 * Module dependencies
 */
var _ = require('lodash');
var request = require('../request');

/**
 * 获取部门基本资料列表
 *
 * API wiki: http://open.b.qq.com/api:dept_list
 *
 * @param {Number}   timestamp 时间戳（上次拉取获得的时间戳，首次拉取或全量拉取请传0）
 * @param {Function} callback  Callback function with (err, data)
 */
exports.getDepartments = function(timestamp, callback) {
  if (_.isFunction(timestamp)) {
    callback = timestamp;
    timestamp = 0;
  }

  var apiUrl = this.getApiUrl('/api/dept/list', { timestamp: timestamp });
  request.get(apiUrl, callback);
};

/**
 * 根据 dept_id 获取部门基本资料
 *
 * API wiki: http://open.b.qq.com/wiki/api:dept_info
 *
 * @param {String}   ids  部门的 dept_id 列表，使用英文逗号分隔
 * @param {Function} callback Callback function with (err, data)
 */
exports.getDepartmentsByIds = function(ids, callback) {
  var apiUrl = this.getApiUrl('/api/dept/info', { dept_ids: ids });
  request.get(apiUrl, callback);
};
