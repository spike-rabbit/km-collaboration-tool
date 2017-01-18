/**
 * Created by Maxi- PC on 18.12.2016.
 */
import * as Sequelize from "sequelize";
import Instance = Sequelize.Instance;
import {Category} from "../../kmct_client/src/app/core/knowledge-center/category";

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
}

export interface Thread {
    id?: number;
    question: string;
    owner: number;
    category: number;
}

export interface Answer {
    id?: number;
    thread: number;
    answer: string;
    position: number;
}


export interface Like {

}

export interface category{
    id?: number;
    category: string;
}


export interface Appointment {
    id?: number;
    name: string;
    class: Class;
    description: string;
    start: Date;
    end: Date;
    user: User;
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
    getAppointments?: (options?: Sequelize.FindOptions) => Promise<AppointmentInstance[]>;
    getJournals?: (options?: Sequelize.FindOptions) => Promise<JournalInstance[]>;
}
export interface InvitationInstance extends Sequelize.Instance<Invitation>,Invitation {
}
export interface RoleInstance extends Sequelize.Instance<Role>,Role {
}

export interface JournalInstance extends Sequelize.Instance<Journal>, Journal {
}

export interface JournalTemplateInstance extends Sequelize.Instance<JournalTemplate>, JournalTemplate {
}

export interface AppointmentInstance extends Sequelize.Instance<Appointment>, Appointment {
}

export interface ThreadInstance extends Sequelize.Instance<Thread> , Thread {
}

export interface AnswerInstance extends Sequelize.Instance<Answer>, Answer{
}

export interface  LikeInstance extends Sequelize.Instance<Like>, Like {
}

export interface  CategoryInstance extends  Sequelize.Instance<Category>, Category {
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

export interface AppointmentModel extends Sequelize.Model<AppointmentInstance, Appointment> {
}

export interface ThreadModel extends  Sequelize.Model<ThreadInstance, Thread> {
}

export interface AnswerModel extends Sequelize.Model<AnswerInstance, Answer> {
}

export interface LikeModel extends Sequelize.Model<LikeInstance, Like> {
}

export interface CategoryModel extends Sequelize.Model<CategoryInstance, Category> {
}

// Tables
export const CompanyTable = "company";
export const UsersTable = 'user';
export const ClassTable = 'class';
export const InvitationTable = "invitation";
export const RoleTable = "role";

export const JournalTable = "journal";
export const JournalTemplateTable = "journal_template";
export const AppointmentTable = "appointment";

export const ThreadTable ="thread";
export const AnswerTable ="answer";
export const LikeTable ="like";
export const CategoryTable ="category";
// Other Types
export const ROLES = {admin: "ADMIN", ksmem: "KSMEM", ksspr: "KSSPR"};