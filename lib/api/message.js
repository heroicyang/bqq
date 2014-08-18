/**
 * Module dependencies
 */
var request = require('../request');

/**
 * 向指定的员工客户端发送弹窗消息
 *
 * API wiki: http://open.b.qq.com/wiki/api:tips_send
 *
 * @param {Object}   data      消息所需参数参见 API wiki
 * @param {Function} callback  Callback function with (err, data)
 */
exports.sendTip = function(data, callback) {
  if (!data.receivers) {
    data.to_all = 1;
  }

  var apiUrl = this.getApiUrl('/api/tips/send');
  request.post(apiUrl, data, callback);
};

/**
 * 向指定的员工客户端发送广播消息
 *
 * API wiki: http://open.b.qq.com/wiki/api:broadcast_send
 *
 * @param {Object}   data     消息所需参数参见 API wiki
 * @param {Function} callback Callback function with (err, data)
 */
exports.sendBroadcast= function(data, callback) {
  var apiUrl = this.getApiUrl('/api/broadcast/send');
  request.post(apiUrl, data, callback);
};

/**
 * 向指定的员工发送手机短信
 *
 * API wiki: http://open.b.qq.com/wiki/api:sms_send
 *
 * @param {Object}   data     消息所需参数参见 API wiki
 * @param {Function} callback Callback function with (err, data)
 */
exports.sendSms= function(data, callback) {
  var apiUrl = this.getApiUrl('/api/sms/send');
  request.post(apiUrl, data, callback);
};
