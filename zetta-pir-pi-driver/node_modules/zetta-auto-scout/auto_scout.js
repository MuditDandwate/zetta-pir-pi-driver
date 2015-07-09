var util = require('util');
var Scout = require('zetta-scout');

var AutoScout = module.exports = function() {
  var args = Array.prototype.slice.call(arguments);

  this.filter = args[0];
  this.constructor = args[1];
  this.params = args.slice(2);

  if (!(this instanceof AutoScout)) {
    var scout = new AutoScout();
    scout.filter = this.filter;
    scout.constructor = this.constructor;
    scout.params = this.params;

    return scout;
  }

  Scout.call(this);
};
util.inherits(AutoScout, Scout);

AutoScout.prototype.init = function(cb) {
  var filter = typeof this.filter === 'string'
                 ? { type: this.filter }
                 : this.filter;

  var query = this.server.where(filter);

  var applyArgs = [].concat(this.params || []);
  applyArgs.unshift(this.constructor);

  var self = this;
  this.server.find(query, function(err, results) {
    if (err) {
      return cb(err);
    };

    if (results.length) {
      results.forEach(function(result) {
        applyArgs.unshift(result);
        self.provision.apply(self, applyArgs);
      });
    } else {
      self.discover.apply(self, applyArgs);
    }

    cb();
  });
};
