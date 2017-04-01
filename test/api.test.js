/**
 * Gingersoftware-nodejs-api
 *
 * Romain Karpinski
 * GNU V3.0 License
 */

/**
 * Support.
 */
var should = require('chai').should();
var jack = require('jack');


/**
 * Context
 */
var Api = require('../lib/api');

describe('Api', function() {
  describe('when constructed', function() {
    it('should setup url', function() {
      var api = new Api;
      api.url.should.eql('http://services.gingersoftware.com');
    });
  });

  describe('when a request is made', function() {
    it('should contain data, key and valid url', function(done) {
      var api = new Api;
      var data = 'This is worng';
      var key = api.key();

      api.mock('request').and.replace(function(options, cb) {
        options.should.eql({
          method: 'POST',
          url: 'https://en.service.afterthedeadline.com/checkDocument',
          form: {data: data, key: key}
        });
        api.request.reset()
        done();
      });

      api.get(data, 'checkDocument', 'en');
    });

    describe('and returned', function() {
      it('should contain errors if any', function(done) {
        var api = new Api;

        api.stub('request').and.replace(function(options, cb) {
          cb(new Error('test'));
        });

        api.get('foo', 'checkDocument', 'en', function(err) {
          err.should.be.ok;
          done();
        });
      });

      it('should parse the xml respones', function(done) {
        var api = new Api;

        api.stub('request').and.replace(function(options, cb) {
          var res = "<results>\n  <error>\n    <string>worng</string>\n    <description>Spelling</description>\n    <precontext>is</precontext>\n    <suggestions>\n        <option>wrong</option>\n        <option>worn</option>\n        <option>wong</option>\n    </suggestions>\n    <type>spelling</type>\n    \n  </error>\n</results>";
          cb(null, null, res);
        });

        api.get('foo', 'checkDocument', 'en', function(err, data) {
          data.should.be.a('object');
          data.should.have.property('error');
          done();
        });
      });
    });
  });
});
