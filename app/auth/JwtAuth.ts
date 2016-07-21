/// <reference path="../../typings/tsd.d.ts" />

import * as IExpress from 'express';

module App.Auth {

    export class JwtAuth {

        express = require('express');

        app = this.express();

        jwt = require('jwt-simple');

        User = require('../models/User');

        constructor() {
            this.app.set('jwtTokenSecret', '341D2355A6A48E7FE4CC5D35A9A9A');
        }

        validateUser = (req : IExpress.Request , res : IExpress.Response , next : IExpress.NextFunction) => {
            var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    
                if (token) {
                    try {
                        var decoded = this.jwt.decode(token, this.app.get('jwtTokenSecret'));

                        if (decoded.exp <= Date.now()) {
                            res.end('Access token has expired', '400');
                        }
                        next();
                    } catch (err) {
                        res.end('Unauthorize FIrst');
                        next();
                    }
                } else {
                    res.end('Unauthorize');
                    next();
            }
        }
    }
}

// module.exports = (new App.Auth.JwtAuth()).validateUser;

export const JwtAuth = (new App.Auth.JwtAuth()).validateUser;