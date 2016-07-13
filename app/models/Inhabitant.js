/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../base/BaseModel.ts" />
/// <reference path="MedicalRecord.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Model = require('../base/BaseModel');
var App;
(function (App) {
    var Models;
    (function (Models) {
        var Inhabitant = (function (_super) {
            __extends(Inhabitant, _super);
            function Inhabitant() {
                _super.call(this, require('node-restful'));
            }
            Inhabitant.prototype.schema = function () {
                var ObjectId = this.mongoose.Schema.Types.ObjectId;
                var InhabitantSchema = new this.mongoose.Schema({
                    first_name: String,
                    middle_name: String,
                    last_name: String,
                    birthdate: Date,
                    civil_status: String,
                    gender: String,
                    no_of_children: Number,
                    educational_attainment: String,
                    occupation: String,
                    religion: String,
                    phone_home: String,
                    cp_number: String,
                    barangay: String,
                    purok_street: String,
                    city: String,
                    medical_records: { type: ObjectId, ref: 'MedicalRecord' },
                    inhabitant_id: ObjectId
                }, {
                    timestamps: true
                });
                InhabitantSchema.set('toJSON', {
                    transform: function (doc, ret, options) {
                        ret.inhabitant_id = ret._id;
                        ret.full_name = ret.first_name + " " + ret.middle_name + " " + ret.last_name;
                        delete ret._id;
                        delete ret.__v;
                    }
                });
                return this.restful.model('Inhabitant', InhabitantSchema);
            };
            return Inhabitant;
        }(Model.BaseModel));
        Models.Inhabitant = Inhabitant;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
// module.exports = (new App.Models.Inhabitant()).schema();
exports.Inhabitant = (new App.Models.Inhabitant()).schema();
