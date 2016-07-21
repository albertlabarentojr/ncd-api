/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var App;
(function (App) {
    var Auth;
    (function (Auth) {
        var JwtAuth = (function () {
            function JwtAuth() {
                var _this = this;
                this.express = require('express');
                this.app = this.express();
                this.jwt = require('jwt-simple');
                this.User = require('../models/User');
                this.validateUser = function (req, res, next) {
                    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
                    if (token) {
                        try {
                            var decoded = _this.jwt.decode(token, _this.app.get('jwtTokenSecret'));
                            if (decoded.exp <= Date.now()) {
                                res.end('Access token has expired', '400');
                            }
                            next();
                        }
                        catch (err) {
                            res.end('Unauthorize FIrst');
                            next();
                        }
                    }
                    else {
                        res.end('Unauthorize');
                        next();
                    }
                };
                this.app.set('jwtTokenSecret', '341D2355A6A48E7FE4CC5D35A9A9A');
            }
            return JwtAuth;
        }());
        Auth.JwtAuth = JwtAuth;
    })(Auth = App.Auth || (App.Auth = {}));
})(App || (App = {}));
// module.exports = (new App.Auth.JwtAuth()).validateUser;
exports.JwtAuth = (new App.Auth.JwtAuth()).validateUser;
