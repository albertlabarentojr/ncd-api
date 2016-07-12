/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var User_1 = require('../models/User');
var App;
(function (App) {
    var Auth;
    (function (Auth) {
        var Authenticate = (function () {
            function Authenticate() {
                var _this = this;
                this.express = require('express');
                this.jwt = require('jwt-simple');
                this.app = this.express();
                this.moment = require('moment');
                this.User = User_1.User;
                this.respondWithToken = function (res, user) {
                    var expires = _this.moment().add(7, 'days').valueOf();
                    var token = _this.jwt.encode({
                        iss: user._id,
                        exp: expires
                    }, _this.app.get('jwtTokenSecret'));
                    res.json({
                        token: token,
                        expires: expires,
                        user: user.toJSON()
                    });
                };
                this.doAuth = function (req, res) {
                    var email_address = req.body.email_address, password = req.body.password;
                    var _self = _this;
                    _this.User.findOne({ email_address: email_address }, function (err, user) {
                        if (err) {
                            // user not found 
                            return res.send(401);
                        }
                        if (!user) {
                            // incorrect username
                            return res.send(401);
                        }
                        user.comparePassword(password, function (perror, isMatch) {
                            if (isMatch && !perror) {
                                _self.respondWithToken(res, user);
                            }
                            else {
                                return res.send('Wrong Password');
                            }
                        });
                    });
                };
                this.app.set('jwtTokenSecret', '341D2355A6A48E7FE4CC5D35A9A9A');
            }
            return Authenticate;
        }());
        Auth.Authenticate = Authenticate;
    })(Auth = App.Auth || (App.Auth = {}));
})(App || (App = {}));
// module.exports = (new App.Auth.Authenticate()).doAuth;
exports.Authenticate = new App.Auth.Authenticate();
