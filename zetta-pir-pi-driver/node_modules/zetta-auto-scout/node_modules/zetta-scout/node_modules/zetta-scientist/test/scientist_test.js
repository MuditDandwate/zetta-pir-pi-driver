var Scientist = require('../scientist');

describe('Configuration', function() {
  beforeEach(function(){
    machine = Scientist.create(TestDriver);
    machine = Scientist.init(machine);
  });

  it('should be configured by Scientist#configure', function() {
    assert.ok(machine.call);
    assert.equal(machine.type, 'testdriver');
    assert.equal(machine.state, 'ready');
    assert.equal(machine.name, 'Matt\'s Test Device');
  });

  it('should have an id automatically generated for it', function(){
    assert.ok(machine.id);
  });

  it('should have properties function', function() {
    assert.equal(typeof machine.properties, 'function');
  });

  it('properties function should return filtered property list', function() {
    machine._foo = 123;
    var p = machine.properties();
    assert.equal(p._foo, undefined);
  });
});

var TestDriver = module.exports = function(){
  this.foo = 0;
  this.bar = 0;
  this.value = 0;
  this._fooBar = 0;
};

TestDriver.prototype.init = function(config) {
  config
    .state('ready')
    .type('testdriver')
    .name('Matt\'s Test Device')
    .when('ready', { allow: ['change', 'test'] })
    .when('changed', { allow: ['prepare', 'test'] })
    .map('change', this.change)
    .map('prepare', this.prepare)
    .map('test', this.test, [{ name: 'value', type: 'number'}])
    .monitor('foo')
    .stream('bar', this.streamBar)
    .stream('foobar', this.streamFooBar, {binary: true});
};

TestDriver.prototype.test = function(value, cb) {
  this.value = value;
  cb();
};

TestDriver.prototype.change = function(cb) {
  this.state = 'changed';
  cb();
};

TestDriver.prototype.prepare = function(cb) {
  this.state = 'ready';
  cb();
};

TestDriver.prototype.incrementStreamValue = function() {
  this.bar++;
  if(this._stream) {
    this._stream.write(this.bar);
  }
}

TestDriver.prototype.streamBar = function(stream) {
  this._stream = stream;
}

TestDriver.prototype.incrementFooBar = function(stream) {
  this._fooBar++;
  var buf = new Buffer([this._fooBar]);
  this._streamFooBar.write(buf);
}

TestDriver.prototype.streamFooBar = function(stream) {
  this._streamFooBar = stream;
}
