/// <reference path="../../typings/tsd.d.ts" />

import { BaseModel } from '../base/BaseModel';

module App.Models {

    export class User extends BaseModel {

        bcrypt = require('bcrypt');

        constructor() {
            super(require('node-restful'));
        }

        schema(){
            let UserSchema = new this.mongoose.Schema({
                first_name : String,
                last_name : String,
                email_address : { type : String, unique : true },
                password : String
            });
            let _self = this;
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
                } else {
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
        }
    }
}

// module.exports = (new App.Models.User()).schema();

export const User = (new App.Models.User()).schema();