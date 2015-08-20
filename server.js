#!/usr/bin/env node
/// <reference path="typings/node/node.d.ts"/>

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('farm_defence_nodeWebServer:server');
var http = require('http');
var models = require("./models"); //추가한 부분.

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen(port); //주석처리
server.on('error', onError);
server.on('listening', onListening);

//추가한 부분.
	//sequelize의 싱크 작업을 시작하고 완료되면 설정된 포트를 통해서 통신 가능하도록 한다.
models.sequelize.sync().then(function () {
  server.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

