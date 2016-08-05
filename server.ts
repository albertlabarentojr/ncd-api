/// <reference path="typings/tsd.d.ts" />

import * as express from 'express';

module App.Init {
    

   export class Bootstrap {

        server  = express;

        mongoose = require('mongoose');

        bodyParser = require('body-parser');

        jwt = require('jwt-simple');

        app = this.server();

        controller = require('./app/routes/v1/ApiController');

        mongooseOptions = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                            replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
       
        constructor() {
            this.database();
            this.bodyParser();
            this.apiConfig();
            this.apiController();
            this.apiRest();
            this.init();

            this.app.get('/', function(req, res) {
                res.send('Hello');
            });
        }

       database = () => {
           this.mongoose.connect('mongodb://ncdadmin:qweasdzxc@ds145295.mlab.com:45295/ncd_db', this.mongooseOptions);
       }

       parser = () => {
           this.app.use(this.bodyParser.urlencoded({ extended : true }));
           this.app.use(this.bodyParser.json());
       }

       apiConfig = () => {
            this.app.use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Methods", "PUT, DELETE, OPTIONS");
                next();
            });
       }

       apiController = () => {
           this.app.use('/api/v1/', [require('./app/routes/v1/ApiController'), this.controller]);
       }

       apiRest = () => {
           this.app.use('/api/v1/', require('./app/routes/v1/Api'));
       }

       init = () => {
           this.app.listen(3000);
           console.log('Api running');
       }
   }
}

new App.Init.Bootstrap();