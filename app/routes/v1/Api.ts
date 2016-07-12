
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../models/Inhabitant.ts" />


import * as express from 'express';
import { Inhabitant } from '../../models/Inhabitant';
import { MedicalRecord } from '../../models/MedicalRecord';

module App.Routes.V1 {

    export class Api {

        server = require('express');

        router = this.server.Router();

        Inhabitant = Inhabitant;

        MedicalRecord = MedicalRecord;

        constructor() {
            this.MedicalRecord.methods(['get', 'put', 'post', 'delete']);
            this.MedicalRecord.register(this.router, '/medical_records');
            
            this.Inhabitant.methods(['get', 'put', 'post', 'delete']);
            this.Inhabitant.register(this.router, '/inhabitants');
        }

    }

}

module.exports = (new App.Routes.V1.Api()).router;