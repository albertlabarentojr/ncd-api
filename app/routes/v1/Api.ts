
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../models/Inhabitant.ts" />


import * as express from 'express';
import * as url from 'url';
import { Inhabitant } from '../../models/Inhabitant';
import { MedicalRecord } from '../../models/MedicalRecord';
import { JwtAuth } from '../../auth/JwtAuth';

module App.Routes.V1 {

    export class Api {

        server = require('express');

        router = this.server.Router();

        Inhabitant = Inhabitant;

        MedicalRecord = MedicalRecord;

        constructor() {
            this.MedicalRecord.methods(['get', 'put', 'post', 'delete']);
            this.MedicalRecord.before('delete', (req, res, next) => {
                let query = url.parse(req.url, true).query;
                this.MedicalRecord.find({ inhabitant_id : query.inhabitant_id })
                    .sort({ date : 'desc' })
                    .exec((err, docs) => {
                        let updatedMedicalRecord : any = {};
                        if(docs.length >= 0) {
                            let indexmr = 0;
                                if( docs.length == 1 ) {
                                    indexmr = 0;
                                } else if (docs.length > 1) {
                                    indexmr = 1;
                                }
                            let latestMRecID = docs[indexmr]._id;   
                            updatedMedicalRecord = { medical_records :  latestMRecID, medical_record_id : latestMRecID};
                        } else {
                            updatedMedicalRecord = { medical_records :  null, medical_record_id : null };
                        }
                        this.Inhabitant.update( { inhabitant_id : docs.inhabitant_id }, { $set: updatedMedicalRecord }, {}, (err, numAffected) => {
                            next();
                        } );
                    });
            });
            this.MedicalRecord.register(this.router, '/medical_records');
            
            
            this.Inhabitant.methods(['get', 'put', 'post', 'delete']);
            this.Inhabitant.register(this.router, '/inhabitants');
        }

    }

}

module.exports = (new App.Routes.V1.Api()).router;