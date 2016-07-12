/// <reference path="../../typings/tsd.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require('../base/BaseModel');
var App;
(function (App) {
    var Models;
    (function (Models) {
        var User = (function (_super) {
            __extends(User, _super);
            function User() {
                _super.call(this, require('node-restful'));
                this.bcrypt = require('bcrypt');
            }
            User.prototype.schema = function () {
                var UserSchema = new this.mongoose.Schema({
                    first_name: String,
                    last_name: String,
                    email_address: { type: String, unique: true },
                    password: String
                });
                var _self = this;
                UserSchema.pre('save', function (next) {
                    var user = this;
                    if (this.isModified('password') || this.isNew) {
                        _self.bcrypt.genSalt(10, function (err, salt) {
                            if (err) {
                                return next(err);
                            }
                            _self.bcrypt.hash(user.password, salt, function (err, hash) {
                                if (err) {
                                    return next(err);
                                }
                                user.password = hash;
                                next();
                            });
                        });
                    }
                    else {
                        return next();
                    }
                });
                UserSchema.methods.comparePassword = function (passw, cb) {
                    _self.bcrypt.compare(passw, this.password, function (err, isMatch) {
                        if (err) {
                            return cb(err);
                        }
                        cb(null, isMatch);
                    });
                };
                return this.restful.model('User', UserSchema);
            };
            return User;
        }(BaseModel_1.BaseModel));
        Models.User = User;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
// module.exports = (new App.Models.User()).schema();
exports.User = (new App.Models.User()).schema();
