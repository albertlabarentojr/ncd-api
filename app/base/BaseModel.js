/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var App;
(function (App) {
    var Base;
    (function (Base) {
        var BaseModel = (function () {
            function BaseModel(restful) {
                this.restful = restful;
                this.mongoose = restful.mongoose;
            }
            return BaseModel;
        }());
        Base.BaseModel = BaseModel;
    })(Base = App.Base || (App.Base = {}));
})(App || (App = {}));
exports.BaseModel = App.Base.BaseModel;
