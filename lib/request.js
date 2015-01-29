'use strict';

var http = require('http');

function IoRequest(socket, io, data, response) {
  this.socket = socket;
  this.data = data;

  var req = socket.client.request;
  this.sessionID = req.sessionID;
  this.headers = req.headers;
  this.query = req._query;
  this.cookies = req.cookies;
  this.signedCookies = req.signedCookies;
  this.url = req.url;
  if (req.user) {
    this.user = req.user;
  }

  this.session = socket.session;
  this.handshake = socket.session.handshake;

  this.response = response;

  this.io = {
    route: function(route) {
      return io.route(route, this, this.response);
    }.bind(this)
  };
}

IoRequest.prototype.param = function param(name, defaultValue) {
  var data = this.data || {};
  var query = this.query || {};

  if (null != data[name]) {
    return data[name];
  }
  if (null != query[name]) {
    return query[name];
  }

  return defaultValue;
};

module.exports = IoRequest;