/**
 * Created by Maxi- PC on 15.12.2016.
 */
import * as Sequelize from "sequelize";
import {
    UsersModel,
    UsersTable,
    CompanyModel,
    CompanyTable,
    Company,
    CompanyInstance,
    User,
    UsersInstance,
    InvitationModel,
    InvitationTable,
    InvitationInstance,
    Invitation,
    Role,
    RoleInstance,
    RoleTable,
    RoleModel,
    JournalModel,
    JournalTemplateModel,
    JournalTable,
    JournalTemplateTable,
    JournalInstance,
    Journal,
    JournalTemplateInstance,
    JournalTemplate,
    ClassModel,
    ClassInstance,
    Class,
    ClassTable,
    AppointmentModel,
    Appointment,
    AppointmentInstance,
    AppointmentTable,
    ThreadModel,
    AnswerModel,
    LikeModel,
    ThreadInstance,
    ThreadTable,
    Thread,
    AnswerInstance,
    Answer,
    AnswerTable,
    LikeInstance,
    Like,
    LikeTable,
    KarmaTransactionModel,
    KarmaTransaction,
    KarmaTransactionInstance,
    KarmaTransactionTable,
    APPOINTEMENT_TYPES, CategoryModel, CategoryTable, CategoryInstance, Category
} from "./models/data-types";
import DefineOptions = Sequelize.DefineOptions;

class DatabaseManager {
    sequelize: Sequelize.Sequelize;
    companies: CompanyModel;
    users: UsersModel;
    classes: ClassModel;
    invitations: InvitationModel;
    roles: RoleModel;
    journals: JournalModel;
    journalTemplates: JournalTemplateModel;
    appointments: AppointmentModel;
    threads: ThreadModel;
    answers: AnswerModel;
    likes: LikeModel;
    karmaTransactions: KarmaTransactionModel;
    categories: CategoryModel;

    constructor() {
        this.sequelize = new Sequelize('kmct', 'kmct_admin', 'G2i65%7089@u', {
            host: 'h2614523.stratoserver.net',
            dialect: 'mysql',
            pool: {max: 5, min: 1, idle: 10000}
        });

        this.companies = this.sequelize.define<CompanyInstance, Company>(CompanyTable, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING
            },
            logo: Sequelize.BLOB
        }, withDefOpts());

        this.classes = this.sequelize.define<ClassInstance, Class>(ClassTable, {
            id: {type: Sequelize.CHAR(5), primaryKey: true},
            profession: Sequelize.CHAR(24)
        }, withDefOpts({name: {plural: "classes"}}));

        this.roles = this.sequelize.define<RoleInstance, Role>(RoleTable, {
            id: {
                type: Sequelize.CHAR(5),
                primaryKey: true
            }
        }, withDefOpts());

        this.users = this.sequelize.define<UsersInstance, User>(UsersTable, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            gid: Sequelize.CHAR(45),
            name: Sequelize.CHAR(45),
            firstname: Sequelize.CHAR(45),
        }, withDefOpts({
            classMethods: {
                getUserByGid: (gid: string) => {
                    let where: {[key: string]: any} = {};
                    where['gid'] = gid;
                    let include = [{model: this.classes}];
                    return this.users.find({where: where, include: include});
                }
            }
        }));
        this.users.belongsTo(this.companies);
        this.users.belongsTo(this.classes);

        let userHasRolesModel = this.sequelize.define("user_has_roles", {
            user_id: Sequelize.INTEGER,
            role_id: Sequelize.CHAR(5)
        }, withDefOpts());


        this.users.belongsToMany(this.roles, {through: userHasRolesModel});
        this.roles.belongsToMany(this.users, {through: userHasRolesModel});


        this.invitations = this.sequelize.define<InvitationInstance, Invitation>(InvitationTable, {
            uuid: {type: Sequelize.CHAR(45), primaryKey: true},
            classId: {type: Sequelize.CHAR(5), field: "class_id"},
            name: Sequelize.CHAR(45),
            firstname: Sequelize.CHAR(45),
            email: Sequelize.CHAR(45),
            targetRole: {type: Sequelize.CHAR(5), field: "target_role"}
        }, withDefOpts({
            classMethods: {
                getInvitationByUUID: (uuid: string) => {
                    let where: {[key: string]: any} = {};
                    where['uuid'] = uuid;
                    return this.invitations.find({where: where});
                }
            }
        }));
        this.invitations.belongsTo(this.classes);

        this.journals = this.sequelize.define<JournalInstance, Journal>(JournalTable, {
            id: {type: Sequelize.INTEGER, primaryKey: true},
            // classId: {type: Sequelize.CHAR(5), field: "class_id"},
            monday: Sequelize.CHAR(255),
            tuesday: Sequelize.CHAR(255),
            wednesday: Sequelize.CHAR(255),
            thursday: Sequelize.CHAR(255),
            friday: Sequelize.CHAR(255),
            week: Sequelize.CHAR(45),
            owner: Sequelize.INTEGER,
            startDate: Sequelize.DATE,
            location: Sequelize.CHAR(4),
            activated: Sequelize.BOOLEAN

        }, withDefOpts({
            classMethods: {
                getNachweisById: (id: number) => {
                    let where: {[key: string]: any} = {};
                    where['id'] = id;
                    return this.journals.find({where: where});
                }
            }
        }));
        this.classes.hasMany(this.journals);

        this.journalTemplates = this.sequelize.define<JournalTemplateInstance, JournalTemplate>(JournalTemplateTable, {
            id: {type: Sequelize.INTEGER, primaryKey: true},
            template: {type: Sequelize.CHAR(255)},
            userId: Sequelize.INTEGER
        }, withDefOpts({
            classMethods: {
                getTemplateById: (id: number) => {
                    let where: {[key: string]: any} = {};
                    where['id'] = id;
                    return this.journalTemplates.find({where: where});
                }
            }
        }));

        let userHasTemplates = this.sequelize.define("user_has_templates", {
            user_id: Sequelize.INTEGER,
            template_id: Sequelize.INTEGER
        }, withDefOpts({freezeTableName: true}));

        this.users.belongsToMany(this.journalTemplates, {through: userHasTemplates});
        this.journalTemplates.belongsToMany(this.users, {through: userHasTemplates});

        this.appointments = this.sequelize.define<AppointmentInstance, Appointment>(AppointmentTable, {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            name: Sequelize.CHAR(15),
            description: Sequelize.CHAR(200),
            start: Sequelize.DATE,
            end: Sequelize.DATE,
            repetitionType: {type: Sequelize.CHAR(6), field: "repetition_type"},
            repetitionCount: {type: Sequelize.INTEGER, field: "repetition_count"},
            type: {type: Sequelize.ENUM({values: [APPOINTEMENT_TYPES.atiw, APPOINTEMENT_TYPES.exam, APPOINTEMENT_TYPES.lecture, APPOINTEMENT_TYPES.standart, APPOINTEMENT_TYPES.spe]})}
        }, withDefOpts());

        this.classes.hasMany(this.appointments);
        this.appointments.belongsTo(this.users);


        this.threads = this.sequelize.define<ThreadInstance, Thread>(ThreadTable, {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            title: Sequelize.CHAR(34),
            question: Sequelize.CHAR(500),
            owner: Sequelize.INTEGER,
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
            class: Sequelize.CHAR(5)
        }, withDate());


        this.answers = this.sequelize.define<AnswerInstance, Answer>(AnswerTable, {
            id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            threadId: {type: Sequelize.INTEGER, field: "thread_id"},
            answer: Sequelize.CHAR(255)
        }, withDefOpts());

        this.threads.hasMany(this.answers);
        this.answers.belongsTo(this.threads);

        this.likes = this.sequelize.define<LikeInstance, Like>(LikeTable, {
            id: {type: Sequelize.INTEGER, primaryKey: true}
        }, withDefOpts());

        this.answers.hasMany(this.likes);
        this.likes.belongsTo(this.answers);
        this.users.hasMany(this.likes);
        this.likes.belongsTo(this.users);

        this.karmaTransactions = this.sequelize.define<KarmaTransactionInstance, KarmaTransaction>(KarmaTransactionTable, {
            id: {type: Sequelize.INTEGER, primaryKey: true},
            toUser: {type: Sequelize.INTEGER, field: "to_user"},
            fromUser: {type: Sequelize.INTEGER, field: "from_user"},
            appointmentId: {type: Sequelize.INTEGER, field: "appointment_id"},
            productId: {type: Sequelize.INTEGER, field: "product_id"},
            value: Sequelize.INTEGER
        }, withDefOpts());


        this.categories = this.sequelize.define<CategoryInstance, Category>(CategoryTable, {
            id: {type: Sequelize.INTEGER, primaryKey: true},
            category: Sequelize.CHAR(30),
            class_id: Sequelize.CHAR(5)
        }, withDefOpts());

        this.classes.hasMany(this.categories);
        this.categories.belongsTo(this.classes);
        this.threads.belongsTo(this.categories);
        this.threads.belongsTo(this.users, {foreignKey: "owner"});


    }
}

export const database = new DatabaseManager();

function withDefOpts(defOpts?: Sequelize.DefineOptions<any>) {
    if (defOpts) {
        defOpts.timestamps = false;
        defOpts.underscored = true;
        return defOpts;
    }
    else return {
        timestamps: false,
        underscored: true
    };
}

function withDate(defOpts?: Sequelize.DefineOptions<any>){
    if (defOpts) {
        defOpts.timestamps = true;
        defOpts.underscored = true;
        return defOpts;
    }
    else return {
        timestamps: true,
        underscored: true
    };
}
