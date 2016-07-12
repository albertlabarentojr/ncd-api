/// <reference path="../../typings/tsd.d.ts" />

import * as IExpress from 'express'; 
import { User } from '../models/User';

module App.Auth {

    export class Authenticate {

        express = require('express');

        jwt = require('jwt-simple');

        app = this.express();

        moment = require('moment');

        User = User;

        constructor() {
            this.app.set('jwtTokenSecret', '341D2355A6A48E7FE4CC5D35A9A9A');
        }

        respondWithToken = (res : IExpress.Response, user) => {
            var expires = this.moment().add(7, 'days').valueOf();
            var token = this.jwt.encode({
            iss: user._id,
            exp: expires
            }, this.app.get('jwtTokenSecret'));

            res.json({
            token : token,
            expires: expires,
            user: user.toJSON()
            });
        }

        doAuth = (req, res) => {
            var email_address = req.body.email_address,
            password = req.body.password;
            var _self = this;
            this.User.findOne({ email_address : email_address}, function(err, user) {
                if (err) { 
                    // user not found 
                    return res.send(401);
                }

                if (!user) {
                    // incorrect username
                    return res.send(401);
                }

                user.comparePassword(password, function(perror, isMatch) {
                    if(isMatch && !perror) {
                        _self.respondWithToken(res, user);
                    }else {
                        return res.send('Wrong Password');
                    }
                });
            });
        }
    }
}

// module.exports = (new App.Auth.Authenticate()).doAuth;

export const Authenticate = new App.Auth.Authenticate();