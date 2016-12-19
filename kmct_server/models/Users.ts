/**
 * Created by Maxi- PC on 18.12.2016.
 */
import * as Sequelize from "sequelize";

let UsersSchema = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.CHAR(45),
    firstname: Sequelize.CHAR(45),
    class_id: Sequelize.CHAR(5)
};

export interface Users {
    id: number;
    name: string;
    firstname: string;
    class_id: string;
}

export interface UsersModel extends Sequelize.Model<any, Users> {
}

export const UsersTable = 'USERS';

export {UsersSchema}