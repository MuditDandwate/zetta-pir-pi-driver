var util = require('util');
var AutoScout = require('zetta-auto-scout');
var PIR = require('./pir_driver');

var EdisonScout = module.exports = function(pin) {
  AutoScout.call(this, 'pir', PIR, pin);
};

util.inherits(EdisonScout, AutoScout);
