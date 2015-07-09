var Pwm = module.exports = function(pin) {
  this._pin = pin;
};

Pwm.prototype.write = function() {};
Pwm.prototype.read = function() {};
Pwm.prototype.period = function() {};
Pwm.prototype.period_ms = function() {};
Pwm.prototype.period_us = function() {};
Pwm.prototype.pulsewidth = function() {}
Pwm.prototype.pulsewidth_ms = function() {};
Pwm.prototype.enable = function() {};
Pwm.prototype.config_ms = function() {};
Pwm.prototype.config_percent = function() {};


