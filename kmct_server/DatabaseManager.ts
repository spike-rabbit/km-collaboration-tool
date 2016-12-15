/**
 * Created by Maxi- PC on 15.12.2016.
 */
import * as Sequelize from "sequelize";
import {CompanyModel, CompanyTable, CompanySchema} from "./models/Companies";

export class DatabaseManager {
    sequelize: Sequelize.Sequelize;
    companies: CompanyModel;

    constructor() {
        this.sequelize = new Sequelize('kmct', 'kmct_admin', 'G2i65%7089@u', {
            host: 'h2614523.stratoserver.net',
            dialect: 'mysql',
            pool: {max: 5, min: 0, idle: 10000}
        });

        this.companies = this.sequelize.define(CompanyTable, CompanySchema, defaultOptions);
    }
}

let defaultOptions = {
    timestamps: false
};