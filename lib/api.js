/**
 * Gingersoftware-nodejs-api
 *
 * Romain Karpinski
 * GNU V3.0 License
 */

/**
 * Dependencies.
 */
var crypto = require('crypto');
var os = require('os');
var xml2js = require('xml2js');
var request = require('request');
//require('request').debug = true

var API_KEY = '6ae0c3a0-afdc-4532-a810-82ded0054236';
var ACTION = '/Ginger/correct/json/GingerTheText';

/**
 * `Api` constructor.
 *
 * @param {Array} Ignored types.
 */
function Api(ignored) {
  this.url = 'http://services.gingersoftware.com';
  this.parser = new xml2js.Parser;
};

/**
 * Build a request options in order to spell check the
 * supplied text.
 *
 * @param {String} Text.
 * @param {Function} Callback.
 * @api public
 */
Api.prototype.get = function(text, fn) {
  var self = this;

  var options = {
    method: 'GET',
    url: this.url + '/' + ACTION,
    qs: {
      lang: "US",
      clientVersion: "2.0",
      apiKey: API_KEY,
      text: text
    },
    qsStringifyOptions :
    {
      format : 'RFC1738'
    },
  };

  this.request(options, function(err, res, body) {
    if (err) return fn(err, null);
    fn(null, res.body);
  });
};

/**
 * Send a HTTP request to ginger server.
 *
 * @param {Object} Request options.
 * @param {Function} Callback.
 * @api private
*/
Api.prototype.request = function(options, fn) {
  request(options, fn);
};

/**
 * Expose `Api`.
*/
module.exports = Api;
