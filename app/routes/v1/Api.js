/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../models/Inhabitant.ts" />
"use strict";
var Inhabitant_1 = require('../../models/Inhabitant');
var MedicalRecord_1 = require('../../models/MedicalRecord');
var App;
(function (App) {
    var Routes;
    (function (Routes) {
        var V1;
        (function (V1) {
            var Api = (function () {
                function Api() {
                    this.server = require('express');
                    this.router = this.server.Router();
                    this.Inhabitant = Inhabitant_1.Inhabitant;
                    this.MedicalRecord = MedicalRecord_1.MedicalRecord;
                    this.MedicalRecord.methods(['get', 'put', 'post', 'delete']);
                    this.MedicalRecord.register(this.router, '/medical_records');
                    this.Inhabitant.methods(['get', 'put', 'post', 'delete']);
                    this.Inhabitant.register(this.router, '/inhabitants');
                }
                return Api;
            }());
            V1.Api = Api;
        })(V1 = Routes.V1 || (Routes.V1 = {}));
    })(Routes = App.Routes || (App.Routes = {}));
})(App || (App = {}));
module.exports = (new App.Routes.V1.Api()).router;
