/**
 * Module dependencies
 */
var _ = require('lodash');
var request = require('../request');

/**
 * 获取员工基本资料列表
 *
 * API wiki: http://open.b.qq.com/wiki/api:user_list
 *
 * @param {Number}   timestamp 时间戳（上次拉取获得的时间戳，首次拉取或全量拉取请传0）
 * @param {Function} callback  Callback function with (err, data)
 */
exports.getUsers = function(timestamp, callback) {
  if (_.isFunction(timestamp)) {
    callback = timestamp;
    timestamp = 0;
  }

  var apiUrl = this.getApiUrl('/api/user/list', { timestamp: timestamp });
  request.get(apiUrl, callback);
};

/**
 * 根据 open_id 获取员工基本资料
 *
 * API wiki: http://open.b.qq.com/wiki/api:user_info
 *
 * @param {String}   openIds  员工的 open_id 列表，使用英文逗号分隔
 * @param {Function} callback Callback function with (err, data)
 */
exports.getUsersByOpenIds = function(openIds, callback) {
  var apiUrl = this.getApiUrl('/api/user/info', { open_ids: openIds });
  request.get(apiUrl, callback);
};

/**
 * 根据 open_id 获取员工的头像信息
 *
 * API wiki: http://open.b.qq.com/wiki/api:api_user_face
 *
 * @param {String} openIds  员工的 open_id 列表，使用英文逗号分隔，一次请求限定128个
 * @param {Number} typeId   头像类型
 *   - `1`  40×40 头像
 *   - `2`  40×40 动态头像
 *   - `3`  100×100 头像
 *   - `4`  140×140 头像
 * @param {Function} callback  Callback function with (err, data)
 */
exports.getUsersFace = function(openIds, typeId, callback) {
  if (_.isFunction(typeId)) {
    callback = typeId;
    typeId = 4;
  }

  var apiUrl = this.getApiUrl('/api/user/face', {
    open_ids: openIds,
    type_id: typeId
  });
  request.get(apiUrl, callback);
};

/**
 * 根据 open_id 获取员工的邮箱信息
 *
 * API wiki: http://open.b.qq.com/wiki/api:api_user_email
 *
 * @param {String}   openIds  员工的 open_id 列表，使用英文逗号分隔，一次请求限定128个
 * @param {Function} callback Callback function with (err, data)
 */
exports.getUsersEmail = function(openIds, callback) {
  var apiUrl = this.getApiUrl('/api/user/email', { open_ids: openIds });
  request.get(apiUrl, callback);
};

/**
 * 根据 open_id 获取员工的手机号码信息
 *
 * API wiki: http://open.b.qq.com/wiki/api:api_user_mobile
 *
 * @param {String}   openIds  员工的 open_id 列表，使用英文逗号分隔，一次请求限定128个
 * @param {Function} callback Callback function with (err, data)
 */
exports.getUsersMobile = function(openIds, callback) {
  var apiUrl = this.getApiUrl('/api/user/mobile', { open_ids: openIds });
  request.get(apiUrl, callback);
};

/**
 * 根据 open_id 获取员工的QQ信息
 *
 * API wiki: http://open.b.qq.com/wiki/api:api_user_qq
 *
 * @param {String}   openIds  员工的 open_id 列表，使用英文逗号分隔，一次请求限定128个
 * @param {Function} callback Callback function with (err, data)
 */
exports.getUsersQQ = function(openIds, callback) {
  var apiUrl = this.getApiUrl('/api/user/qq', { open_ids: openIds });
  request.get(apiUrl, callback);
};
