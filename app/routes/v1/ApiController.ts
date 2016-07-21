/// <reference path="../../../typings/tsd.d.ts" />

import * as express from 'express';
import { User } from '../../models/User';
import { JwtAuth } from '../../auth/JwtAuth';
import { Authenticate } from '../../auth/Authenticate';

module App.Routes.V1 {

    export class ApiController {
        
        express = express;

        app = this.express();

        bodyParser = require('body-parser');

        authenticate = Authenticate.doAuth;

        User = User;

        jwtauth = JwtAuth;

        constructor() {
            this.app.use(this.bodyParser.urlencoded({ extended : true }));
            this.app.use(this.bodyParser.json());
            
            this.app.post('/authenticate', this.authenticate);

            this.app.post('/register', (req, res) => {
                var newUser = new this.User({
                    first_name : req.body.first_name,
                    last_name : req.body.last_name,
                    email_address : req.body.email_address,
                    password : req.body.password
                });

                newUser.save(function(err){
                    console.log(err);
                    if(err) {
                        res.send({
                            error : `Error Code`
                        });
                    } else {
                        res.send('Success');
                    }
                });
            });

            this.app.get('/protected', [this.jwtauth], function(req, res) {
                res.send('Authorized to access endpoint');
            });
        }
    }
}

module.exports = (new App.Routes.V1.ApiController()).app;

// export const ApiController = new App.Routes.V1.ApiController();