/// <reference path="../../../typings/tsd.d.ts" />
"use strict";
var express = require('express');
var User_1 = require('../../models/User');
var JwtAuth_1 = require('../../auth/JwtAuth');
var Authenticate_1 = require('../../auth/Authenticate');
var App;
(function (App) {
    var Routes;
    (function (Routes) {
        var V1;
        (function (V1) {
            var ApiController = (function () {
                function ApiController() {
                    var _this = this;
                    this.express = express;
                    this.app = this.express();
                    this.bodyParser = require('body-parser');
                    this.authenticate = Authenticate_1.Authenticate.doAuth;
                    this.User = User_1.User;
                    this.jwtauth = JwtAuth_1.JwtAuth;
                    this.app.use(this.bodyParser.urlencoded({ extended: true }));
                    this.app.use(this.bodyParser.json());
                    this.app.post('/authenticate', this.authenticate);
                    this.app.post('/register', function (req, res) {
                        var newUser = new _this.User({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email_address: req.body.email_address,
                            password: req.body.password
                        });
                        newUser.save(function (err) {
                            console.log(err);
                            if (err) {
                                res.send({
                                    error: "Error Code"
                                });
                            }
                            else {
                                res.send('Success');
                            }
                        });
                    });
                    this.app.get('/protected', [this.jwtauth], function (req, res) {
                        res.send('Authorized to access endpoint');
                    });
                }
                return ApiController;
            }());
            V1.ApiController = ApiController;
        })(V1 = Routes.V1 || (Routes.V1 = {}));
    })(Routes = App.Routes || (App.Routes = {}));
})(App || (App = {}));
module.exports = (new App.Routes.V1.ApiController()).app;
// export const ApiController = new App.Routes.V1.ApiController(); 
