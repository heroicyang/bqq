/**
 * Module dependencies
 */
var qs = require('querystring');
var hyperquest = require('hyperquest');

module.exports = {
  get: function(url, callback) {
    var req = hyperquest.get(url);
    resolveRequest(req, callback);
    return req;
  },

  post: function(url, data, callback) {
    var req = hyperquest.post(url);
    var buf = new Buffer(qs.stringify(data));

    req.setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    req.setHeader("Content-Length", buf.length);
    req.end(buf);

    resolveRequest(req, callback);
    return req;
  }
};

/**
 * Streams a stream value into a Buffer
 *
 * @param {Object} stream Readable stream
 * @param {Function} callback Callback function with (err, data)
 */
function resolveRequest(stream, callback) {
  var responded = false;
  var chunks = [];
  var chunkLen = 0;

  stream.on('error', function(err) {
    if (responded) {
      return;
    }

    responded = true;
    callback(err);
  });

  stream.on('data', function(chunk) {
    if (chunk && chunk.length) {
      chunks.push(chunk);
      chunkLen += chunk.length;
    }
  });

  stream.on('end', function() {
    if (responded) {
      return;
    }
    responded = true;

    var data;

    try {
      data = Buffer.concat(chunks, chunkLen);
    } catch (e) {
      return callback(e);
    }

    callback(null, data);
  });
}
