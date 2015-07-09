var zetta = require('zetta');
var PIR = require('../index');

zetta()
  .use(PIR)
  .listen(1337);
