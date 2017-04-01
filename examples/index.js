/**
 * Gingersoftware-nodejs-api
 *
 * Romain Karpinski
 * GNU V3.0 License
 */

/**
 * Dependencies.
 */
var ginger = require('../lib/');


/**
 * Simple.
 */
ginger.check('This si wrogn', function(err, data) {
	console.log(data);
});
