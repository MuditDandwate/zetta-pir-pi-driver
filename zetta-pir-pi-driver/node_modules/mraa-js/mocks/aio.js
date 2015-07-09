var Aio = module.exports = function(pin) {
  this._pin = pin;
};

Aio.prototype.read = function() {
  return 0;
};
Aio.prototype.setBit = function() {};
