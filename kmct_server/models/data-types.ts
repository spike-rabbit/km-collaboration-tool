/**
 * Created by Maxi- PC on 18.12.2016.
 */
import * as Sequelize from "sequelize";
import Instance = Sequelize.Instance;

// POJOs
export interface Company {
    id?: number;
    name?: string;
    logo?: any[];
}

export interface User {
    id?: number;
    name: string;
    gid: string;
    firstname: string;
    class: Class;
    company?: Company;
    roles?: Role[];
    workinghours: number;
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
    location: string;
    activated: boolean;
    editable: boolean;
}

export interface Thread {
    id?: number;
    question: string;
    owner: number;
    category: number;
    created_at: Date;
    updated_at: Date;
    class: string;
    answers: Answer[];
}

export interface Answer {
    id?: number;
    answer: string;
    created_at: Date;
    owner: number;
    liked: boolean;
    likes: Like[];
}


export interface Like {
    id?: number;
    user_id?: number;
    answer?: number;
}

export interface Category {
    id?: number;
    category: string;
    class_id: string;
}


export interface Appointment {
    id?: number;
    name: string;
    class: Class;
    description: string;
    start: Date;
    end: Date;
    user: User;
    repetitionType: string;
    repetitionCount: number;
    type: string;
}

export interface KarmaTransaction {
    id?: number;
    value: number;
    toUser: number;
    fromUser?: number;
    productId?: number;
    appointmentId?: number
}

export interface Notification {
    id?: number;
    description: string;
    link: string;
}

export interface NotificationTarget {
    notification?: Notification;
    user?: User;
}

// Instances
export interface CompanyInstance extends Sequelize.Instance<Company>, Company {
}
export interface UsersInstance extends Sequelize.Instance<User>, User {
    getRoles?: () => Promise<RoleInstance[]>;
    setRoles?: (roles: any) => any;
    addRole?: (role: any) => Promise<RoleInstance>;
    addRoles?: (roles: any) => any;
    removeRole?: (role: any) => Promise<void>;
    setCompany?: (id: number) => Promise<CompanyInstance>;
}
export interface ClassInstance extends Sequelize.Instance<Class>, Class {
    getAppointments?: (options?: Sequelize.FindOptions) => Promise<AppointmentInstance[]>;
    addAppointment?: (appointment: Appointment) => Promise<AppointmentInstance>;
    createAppointment?: (appointmen: Appointment) => Promise<AppointmentInstance>;
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

export interface ThreadInstance extends Sequelize.Instance<Thread>, Thread {
    setCategory: (id: number) => Promise<ThreadInstance>;
}

export interface AnswerInstance extends Sequelize.Instance<Answer>, Answer {
}

export interface  LikeInstance extends Sequelize.Instance<Like>, Like {
    setUser: (id: number) => Promise<UsersInstance>;
    setAnswer: (id: number) => Promise<AnswerInstance>;
}

export interface  CategoryInstance extends Sequelize.Instance<Category>, Category {
    setClass?: (id: number | string) => Promise<ClassInstance>;
}

export interface KarmaTransactionInstance extends Sequelize.Instance<KarmaTransaction>, KarmaTransaction {
}

export interface NotificationInstance extends Sequelize.Instance<Notification>, Notification {
}

export interface NotificationTargetInstance extends Sequelize.Instance<NotificationTarget>, NotificationTarget {
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

export interface ThreadModel extends Sequelize.Model<ThreadInstance, Thread> {
}

export interface AnswerModel extends Sequelize.Model<AnswerInstance, Answer> {
}

export interface LikeModel extends Sequelize.Model<LikeInstance, Like> {
}

export interface CategoryModel extends Sequelize.Model<CategoryInstance, Category> {
}

export interface KarmaTransactionModel extends Sequelize.Model<KarmaTransactionInstance, KarmaTransaction> {
}

export interface NotificationModel extends Sequelize.Model<NotificationInstance, Notification> {
}

export interface NotificationTargetModel extends Sequelize.Model<NotificationTargetInstance, NotificationTarget> {
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

export const ThreadTable = "thread";
export const AnswerTable = "answer";
export const LikeTable = "like";
export const CategoryTable = "category";
export const KarmaTransactionTable = "karma_transaction";

export const NotificationTable = "notification";
export const NotificationTargetTable = "notification_target";
// Other Types
export const ROLES = {admin: "ADMIN", ksmem: "KSMEM", ksspr: "KSSPR", knc: "KNC", xcc: "XCC"};
export const APPOINTEMENT_TYPES = {spe: "SPE", atiw: "ATIW", standart: "STANDARD", exam: "EXAM", lecture: "LECTURE"};