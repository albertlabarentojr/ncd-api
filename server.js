/// <reference path="typings/tsd.d.ts" />
"use strict";
var express = require('express');
var App;
(function (App) {
    var Init;
    (function (Init) {
        var Bootstrap = (function () {
            function Bootstrap() {
                var _this = this;
                this.server = express;
                this.mongoose = require('mongoose');
                this.bodyParser = require('body-parser');
                this.jwt = require('jwt-simple');
                this.app = this.server();
                this.controller = require('./app/routes/v1/ApiController');
                this.database = function () {
                    _this.mongoose.connect('mongodb://127.0.0.1:27017/test');
                };
                this.parser = function () {
                    _this.app.use(_this.bodyParser.urlencoded({ extended: true }));
                    _this.app.use(_this.bodyParser.json());
                };
                this.apiConfig = function () {
                    _this.app.use(function (req, res, next) {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                        res.header("Access-Control-Allow-Methods", "PUT");
                        next();
                    });
                };
                this.apiController = function () {
                    _this.app.use('/api/v1/', [require('./app/routes/v1/ApiController'), _this.controller]);
                };
                this.apiRest = function () {
                    _this.app.use('/api/v1/', require('./app/routes/v1/Api'));
                };
                this.init = function () {
                    _this.app.listen(3000);
                    console.log('Api running');
                };
                this.database();
                this.bodyParser();
                this.apiConfig();
                this.apiController();
                this.apiRest();
                this.init();
                this.app.get('/', function (req, res) {
                    res.send('Hello');
                });
            }
            return Bootstrap;
        }());
        Init.Bootstrap = Bootstrap;
    })(Init = App.Init || (App.Init = {}));
})(App || (App = {}));
new App.Init.Bootstrap();
