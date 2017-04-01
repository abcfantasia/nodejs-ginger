/**
 * Gingersoftware-nodejs-api
 *
 * Romain Karpinski
 * GNU V3.0 License
 */

/**
 * Dependencies.
 */
var Api = require('./api');

/**
 * `Ginger` constructor.
 */
function Ginger() {
  this.api = new Api;
};

/**
 * Check supplied text for spell errors.
 *
 * @param {String} Text
 * @param {Function} Callback.
 * @api public
 */
Ginger.prototype.check = function(text, fn) {
  this.api.get(text, function(err, data) {
    if (err || !data) return fn(err, null);

    if(data.length > 0)
      fn(null,buildSuggestion(text,data));//buildSuggestion();
    else
      fn(null,text);
  });
};

function buildSuggestion(text,data)
{
  var suggestion=text;
  data = JSON.parse(data);
  var results = data.LightGingerTheTextResult
  for(var index in results)
  {
      var result = results[index];
      var from = result.From;
      var to = result.To + 1;
      var sText = result.Suggestions[0].Text;
      suggestion = suggestion.substr(0, from) + sText + suggestion.substr(to);
  }
  return suggestion;
}

/**
 * Expose `Ginger`.
 */
module.exports = Ginger;
