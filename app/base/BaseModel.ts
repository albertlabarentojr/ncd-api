/// <reference path="../../typings/tsd.d.ts" />

module App.Base {
    
    export abstract class BaseModel {

        protected restful;

        protected mongoose;

        abstract schema();

        constructor(restful) {
            this.restful = restful;
            this.mongoose = restful.mongoose;
        }
    }
}

export const BaseModel = App.Base.BaseModel;