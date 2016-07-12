/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../base/BaseModel.ts" />
/// <reference path="MedicalRecord.ts" />


import Model = require('../base/BaseModel');

declare let _ :  any;

module App.Models {

    export class Inhabitant extends Model.BaseModel{

        constructor() {
            super(require('node-restful'));
        }

        schema() {
            let ObjectId = this.mongoose.Schema.Types.ObjectId;
            let InhabitantSchema = new this.mongoose.Schema({
                first_name : String,
                middle_name : String,
                last_name : String,
                birthdate : Date,
                civil_status : String,
                gender : String,
                no_of_children : Number,
                educational_attainment : String,
                occupation : String,
                religion : String,
                phone_home : String,
                cp_number : String,
                barangay : String,
                purok_street : String,
                city : String,
                medical_records : {type : ObjectId, ref : 'MedicalRecord'},
                inhabitant_id : ObjectId
            });

            InhabitantSchema.set('toJSON', {
                transform: function (doc, ret, options) {
                    ret.inhabitant_id = ret._id;
                    ret.full_name = `${ret.first_name} ${ret.middle_name} ${ret.last_name}`;
                    delete ret._id;
                    delete ret.__v;
                }
            });
            
            return this.restful.model('Inhabitant', InhabitantSchema);
        }
    }   
}

// module.exports = (new App.Models.Inhabitant()).schema();

export const Inhabitant = (new App.Models.Inhabitant()).schema();