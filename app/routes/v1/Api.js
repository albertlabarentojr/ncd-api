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
                    var _this = this;
                    this.server = require('express');
                    this.router = this.server.Router();
                    this.Inhabitant = Inhabitant_1.Inhabitant;
                    this.MedicalRecord = MedicalRecord_1.MedicalRecord;
                    this.MedicalRecord.methods(['get', 'put', 'post', 'delete']);
                    this.MedicalRecord.before('delete', function (req, res, next) {
                        _this.MedicalRecord.find({})
                            .sort({ date: 'desc' })
                            .exec(function (err, docs) {
                            var updatedMedicalRecord = {};
                            if (docs.length > 1) {
                                var latestMRecID = docs[0].medical_record_id;
                                console.log(docs);
                                updatedMedicalRecord = { medical_records: latestMRecID, medical_record_id: latestMRecID };
                            }
                            else {
                                updatedMedicalRecord = { medical_records: null, medical_record_id: null };
                                console.log('no latest');
                            }
                            _this.Inhabitant.update({ inhabitant_id: docs.inhabitant_id }, { $set: updatedMedicalRecord }, {}, function (err, numAffected) {
                                next();
                            });
                        });
                    });
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
