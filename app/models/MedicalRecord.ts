/// <reference path="../../typings/tsd.d.ts" />

import { BaseModel } from '../base/BaseModel';

module App.Models {

    export class MedicalRecord extends BaseModel {

        constructor() {
            super(require('node-restful'));
        }

        schema() {
            let ObjectId = this.mongoose.Schema.Types.ObjectId;
            let MedicalRecordShema = new this.mongoose.Schema({
                with_diabetes : [String],
                with_diabetes_year : String,
                with_diabetes_medical_intakes : String,
                with_hypertension : String,
                with_hypertension_year : Number,
                with_hypertension_medical_intakes : [String],
                with_cancer : String,
                with_cancer_year : Number,
                with_cancer_medical_intakes : [String],
                with_lungs: String,
                with_lungs_year: Number,
                with_lungs_medical_intakes: [String],
                with_eyes: String,
                with_eyes_year: Number,
                with_eyes_medical_intakes: [String],
                with_chest_pain_1 : String,
                with_chest_pain_2 : String,
                with_chest_pain_3 : String,
                with_chest_pain_4 : String,
                with_chest_pain_6 : String,
                with_chest_pain_7 : String,
                with_chest_pain_8 : String,
                with_chest_pain_9 : String,
                with_chest_pain_10 : String,
                family_illnesses : [String],
                nutrisyon_oily_food : String,
                nutrisyon_salty_food : String,
                nutrisyon_sweet_food : String,
                nutrisyon_fruits_everyday : String,
                nutrisyon_fruits_everyday_how_may : String,
                nutrisyon_vegetables_everyday : String,
                nutrisyon_vegetables_everyday_how_may : String,
                alcohol_drinking : String,
                alcohol_type : [String],
                alcohol_how_many : String,
                alcohol_times_everyweek : String,
                exercise_regular : String,
                exercise_3x_per_day : String,
                stress_frequent : String,
                stress_source : String,
                is_smoking : String,
                is_smoking_how_many_per_day : Number,
                is_smoking_year : Number,
                is_not_smoking_inhaled_cigarettes_how_many : Number,
                is_not_smoking_inhaled_cigarettes_year : Number,
                is_smoking_reason_initiation : String,
                is_smoking_reason : String,
                is_smoking_pattern : String,
                is_smoking_chest_pain : String,
                is_smoking_breathing : String,
                is_smoking_sound_chest : String,
                is_smoking_blood_phlegm : String,
                is_smoking_sore_throat : String,
                is_smoking_lumps : String,
                is_smoking_edema : String,
                is_smoking_weakness : String,
                is_smoking_leg_camps : String,
                is_smoking_convulsions : String,
                is_smoking_lastyear_how_many_per_day : String,
                is_smoking_age_started : String,
                is_smoking_stop_attempt : Number,
                is_smoking_when_stopped : String,
                is_smoking_regular_how_many : String,
                is_smoking_method_stop_attempt : String,
                is_smoking_type_tobacco : String,
                is_smoking_house_member : String,
                inhabitant_id : ObjectId,
                inhabitants : {type : ObjectId, ref : 'Inhabitant'},
                medical_record_id : ObjectId
            }, {
                timestamps : true
            });

            MedicalRecordShema.set('toJSON', {
                transform: function (doc, ret, options) {
                    ret.medical_record_id = ret._id;
                    delete ret._id;
                    delete ret.__v;
                }
            });

            return this.restful.model('MedicalRecord', MedicalRecordShema);
        }
    }
}

// module.exports = (new App.Models.MedicalRecord()).schema();

export const MedicalRecord = (new App.Models.MedicalRecord()).schema();