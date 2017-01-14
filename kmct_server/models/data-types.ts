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
    profession: string;
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
export interface JournalTemplate {
    id: string;
    template: string;
    userId: number;
}

export interface Journal {
    id?: number;
    week: string;
    classId: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    owner: number;
    startDate: Date;
    spe: boolean;

export interface AusbildungsDay {
    id?: number
    weekday: days;
    value: string;
    weekId: number;
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


export interface JournalInstance extends Sequelize.Instance<Journal>, Journal {
}

export interface JournalTemplateInstance extends Sequelize.Instance<JournalTemplate>, JournalTemplate {
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


export interface JournalModel extends Sequelize.Model<JournalInstance, Journal> {
    getNachweisById?: (id: number) => Promise<JournalInstance>;
}

export interface  JournalTemplateModel extends Sequelize.Model<JournalTemplateInstance, JournalTemplate> {
}

// Tables
export const CompanyTable = "company";
export const UsersTable = 'user';
export const ClassTable = 'class';
export const InvitationTable = "invitation";
export const RoleTable = "role";

export const JournalTable = "journal";
export const JournalTemplateTable = "journalTemplate";
// Other Types
export const ROLES = {admin: "ADMIN", ksmem: "KSMEM", ksspr: "KSSPR"};