import * as Sequelize from "sequelize";
/**
 * Created by Maxi- PC on 15.12.2016.
 */
let CompanySchema = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
};

export interface Company {
    id?: number;
    name: string;
}

export interface CompanyModel extends Sequelize.Model<any,Company> {
}

export const CompanyTable = "COMPANIES";

export {CompanySchema}