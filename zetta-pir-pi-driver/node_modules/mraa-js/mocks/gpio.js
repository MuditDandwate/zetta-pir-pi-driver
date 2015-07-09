var Gpio = module.exports = function(pin) {
  this._pin = pin;
  this._dir = null;
  this._value = 0;
};

Gpio.prototype.dir = function(d) {
  this._dir = d;
};
Gpio.prototype.write = function(v) { this._value = v; };
Gpio.prototype.read = function() {
  return this._value;
};
Gpio.prototype.edge = function() {};
