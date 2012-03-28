var express = require('express');
var host = process.env.VCAP_APP_HOST || "localhost";
var port = process.env.VCAP_APP_PORT || "3000";

var app = module.exports = express.createServer();

//load express configurations
var expressConfig = require('./lib/express_config');
expressConfig(app);

//load routes (after configurations)
var routes  = require('./lib/routes');
routes(app);

app.listen(port, host);
