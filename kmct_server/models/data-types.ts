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
    classId: string;
    company?: Company;
    roles?: Role[];
}

export interface Invitation {
    uuid: string;
    classId: string;
    name: string;
    firstname: string;
    email: string;
}

export interface Role {
    id: string;
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
export interface InvitationInstance extends Sequelize.Instance<Invitation>,Invitation {
}
export interface RoleInstance extends Sequelize.Instance<Role>,Role {
}

// Models
export interface CompanyModel extends Sequelize.Model<CompanyInstance,Company> {
}
export interface UsersModel extends Sequelize.Model<UsersInstance, User> {
    getUserByGid?: (gid: string) => Promise<UsersInstance>;
}
export interface InvitationModel extends Sequelize.Model<InvitationInstance, Invitation> {
    getInvitationByUUID?: (uuid: string) => Promise<InvitationInstance>;
}
export interface RoleModel extends Sequelize.Model<RoleInstance, Role> {
}

// Tables
export const CompanyTable = "company";
export const UsersTable = 'user';
export const InvitationTable = "invitation";
export const RoleTable = "role";


// Other Types
export const ROLES = {admin: "ADMIN", ksmem: "KSMEM", ksspr: "KSSPR"};