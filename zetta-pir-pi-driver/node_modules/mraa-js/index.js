var os = require('os');

module.exports = ( (os.arch() === 'ia32' && os.platform() === 'linux') || process.env.TEST ) ? require('./mraa/') : require('./mock-mraa');
