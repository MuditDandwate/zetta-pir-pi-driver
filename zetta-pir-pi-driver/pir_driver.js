var Device = require('zetta-device');
var util = require('util');
var Gpio = require('onoff').Gpio;

var MOTION_THRESHOLD = 500; // ms
var READ_INTERVAL = 50;

var PinStates = {
  0: 'no-motion',
  1: 'motion'
};

var PIR = module.exports = function(pin) {
  Device.call(this);
  this.pin = pin || 6;
  this.motionStatus = 0;
  this._pin = new Gpio(pin, 'in', 'both');
  // Set the gpio direction to input
};

util.inherits(PIR, Device);

PIR.prototype.init = function(config) {
  config
  .state('undetermined')
  .type('pir')
  .name('PIR Sensor')
  .monitor('motionStatus')
  .when('undetermined', { allow: ['motion', 'no-motion'] })
  .when('no-motion', { allow: ['motion'] })
  .when('motion', { allow: ['no-motion'] })
  .map('motion', this.motion)
  .map('no-motion', this.noMotion);

  var self = this;
  var timer = null;

  setInterval(function() {
    var pirSensorValue = self._pin.readSync();
    self.motionStatus = pirSensorValue;
    if (pirSensorValue === undefined) {
      return;
    }

    if (self.state === 'undetermined') {
      self.call(PinStates[pirSensorValue], function() {});
    }

    // state changed
    if (self.state !== PinStates[pirSensorValue] && timer === null) {
      timer = setTimeout(function() {
        self.call(PinStates[pirSensorValue], function() {});
      }, MOTION_THRESHOLD);
    } else if (self.state === PinStates[pirSensorValue]){
      clearTimeout(timer);
      timer = null;
    }
  }, READ_INTERVAL);
};

PIR.prototype.motion = function(cb) {
  this.state = 'motion';
  console.log('Motion Detected...');
  cb();
};

PIR.prototype.noMotion = function(cb) {
  this.state = 'no-motion';
  console.log('No Motion any where...');
  cb();
};
