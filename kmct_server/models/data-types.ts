/**
 * Created by Maxi- PC on 18.12.2016.
 */
import * as Sequelize from "sequelize";

// POJOs
export interface Company {
    id?: number;
    name: string;
}

export interface User {
    id?: number;
    name: string;
    gid: string;
    firstname: string;
    class: Class;
    company?: Company;
    roles?: Role[];
}

export interface Class {
    id: string;
}

export interface Invitation {
    uuid: string;
    classId: string;
    name: string;
    firstname: string;
    email: string;
    targetRole: string;
}

export interface Role {
    id: string;
}

//TODO rename to more usable name
export interface AusbildungsnachweisTemplate {
    id: string;
    template: string;
    userId: number;
}

export interface Ausbildungsnachweis {
    id?: number;
    week: string;
    classId: string;
}

export interface AusbildungsDay {
    id?: number
    weekday: days;
    value: string;
    weekId: number;
}


export enum days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}

// Instances
export interface CompanyInstance extends Sequelize.Instance<Company>, Company {
}
export interface UsersInstance extends Sequelize.Instance<User>, User {
    getRoles?: () => Promise<RoleInstance[]>;
    setRoles?: (roles: any) => any;
    addRole?: (role: any) => any;
    addRoles?: (roles: any) => any;
}
export interface ClassInstance extends Sequelize.Instance<Class>, Class {
}
export interface InvitationInstance extends Sequelize.Instance<Invitation>,Invitation {
}
export interface RoleInstance extends Sequelize.Instance<Role>,Role {
}

export interface AusbildungsdayInstance extends Sequelize.Instance<AusbildungsDay>, AusbildungsDay {
}

export interface AusbildungsnachweisInstance extends Sequelize.Instance<Ausbildungsnachweis>, Ausbildungsnachweis {
}

export interface AusbildungsnachweisTemplateInstance extends Sequelize.Instance<AusbildungsnachweisTemplate>, AusbildungsnachweisTemplate {
}


// Models
export interface CompanyModel extends Sequelize.Model<CompanyInstance,Company> {
}
export interface UsersModel extends Sequelize.Model<UsersInstance, User> {
    getUserByGid?: (gid: string) => Promise<UsersInstance>;
}
export interface ClassModel extends Sequelize.Model<ClassInstance, Class> {
}
export interface InvitationModel extends Sequelize.Model<InvitationInstance, Invitation> {
    getInvitationByUUID?: (uuid: string) => Promise<InvitationInstance>;
}
export interface RoleModel extends Sequelize.Model<RoleInstance, Role> {
}

export interface AusbildungsdayModel extends Sequelize.Model<AusbildungsdayInstance, AusbildungsDay> {
}

export interface AusbildungsnachweisModel extends Sequelize.Model<AusbildungsnachweisInstance, Ausbildungsnachweis> {
}

export interface  AusbildungsnachweisTemplateModel extends Sequelize.Model<AusbildungsnachweisTemplateInstance, AusbildungsnachweisTemplate> {
}

// Tables
export const CompanyTable = "company";
export const UsersTable = 'user';
export const ClassTable = 'class';
export const InvitationTable = "invitation";
export const RoleTable = "role";

export const AusbildungsnachweisTable = "ausbildungsnachweis";
export const AusbildungnachweisDayTable = "ausbildungsnachweisDay";
export const AusbildungsnachweisTemplateTable = "ausbildungsnachweisTemplate";
// Other Types
export const ROLES = {admin: "ADMIN", ksmem: "KSMEM", ksspr: "KSSPR"};