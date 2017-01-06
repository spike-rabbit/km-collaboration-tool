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
    RoleModel, AusbildungsdayModel,
    AusbildungsnachweisModel, AusbildungsnachweisTemplateModel,
    AusbildungsnachweisTable,
    AusbildungnachweisDayTable,
    AusbildungsnachweisTemplateTable, AusbildungsnachweisInstance, Ausbildungsnachweis,
    AusbildungsnachweisTemplateInstance, AusbildungsnachweisTemplate, AusbildungsdayInstance, AusbildungsDay, days
} from "./models/data-types";
import DefineOptions = Sequelize.DefineOptions;

class DatabaseManager {
    private sequelize: Sequelize.Sequelize;
    companies: CompanyModel;
    users: UsersModel;
    invitations: InvitationModel;
    roles: RoleModel;
    ausbildungsnachweise: AusbildungsnachweisModel;
    templates: AusbildungsnachweisTemplateModel;
    days: AusbildungsdayModel;

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
            }
        }, withDefOpts());

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
            classId: {type: Sequelize.CHAR(5), field: "class_id"},
        }, withDefOpts({
            classMethods: {
                getUserByGid: (gid: string) => {
                    let where: {[key: string]: any} = {};
                    where['gid'] = gid;
                    return this.users.find({where: where});
                }
            }
        }));
        this.users.belongsTo(this.companies);

        let userHasRolesModel = this.sequelize.define("user_has_roles", {
            user_id: Sequelize.INTEGER,
            role_id: Sequelize.CHAR(5)
        }, withDefOpts({freezeTableName: true}));


        this.users.belongsToMany(this.roles, {through: userHasRolesModel});
        this.roles.belongsToMany(this.users, {through: userHasRolesModel});


        this.invitations = this.sequelize.define<InvitationInstance, Invitation>(InvitationTable, {
            uuid: {type: Sequelize.CHAR(45), primaryKey: true},
            classId: {type: Sequelize.CHAR(5), field: "class_id"},
            name: Sequelize.CHAR(45),
            firstname: Sequelize.CHAR(45),
            email: Sequelize.CHAR(45)
        }, withDefOpts({
            classMethods: {
                getInvitationByUUID: (uuid: string) => {
                    let where: {[key: string]: any} = {};
                    where['uuid'] = uuid;
                    return this.invitations.find({where: where});
                }
            }
        }));

        this.ausbildungsnachweise = this.sequelize.define<AusbildungsnachweisInstance, Ausbildungsnachweis>(AusbildungsnachweisTable, {
            id: {type: Sequelize.INTEGER, primaryKey: true},
            classId: {type: Sequelize.CHAR(5), field: "class_id"},
            week: Sequelize.CHAR(45)
        }, withDefOpts({classMethods: {
                getNachweisById: (id: number) => {
                    let where: {[key: string]: any} = {};
                where['id'] = id;
                return this.ausbildungsnachweise.find({where: where});
                }
            }
        }));

        this.templates = this.sequelize.define<AusbildungsnachweisTemplateInstance, AusbildungsnachweisTemplate>(AusbildungsnachweisTemplateTable, {
            id: {type : Sequelize.INTEGER, primaryKey:true},
        template: {type: Sequelize.CHAR(255)},
        userId: Sequelize.INTEGER
        }, withDefOpts({
            classMethods: {
                getTemplateById: (id: number) => {
                    let where: {[key: string]: any} = {};
                    where['id'] = id;
                    return this.templates.find({where: where});
                }
            }
        }));

        let userHasTemplates = this.sequelize.define("user_has_templates", {
            user_id: Sequelize.INTEGER,
            template_id: Sequelize.INTEGER
        }, withDefOpts({freezeTableName: true}));

        this.users.belongsToMany(this.templates, {through: userHasTemplates});
        this.templates.belongsToMany(this.users, {through: userHasTemplates});

        this.days = this.sequelize.define<AusbildungsdayInstance, AusbildungsDay>(AusbildungnachweisDayTable, {
            id: Sequelize.INTEGER,
            weekday: Sequelize.ENUM("Monday","Tuesday","Wednesday","Thursday","Friday") ,
            value: Sequelize.CHAR(255),
            weekId: Sequelize.INTEGER
        }, withDefOpts({
            classMethods: {
                getDayById: (id: number) => {
                    let where: {[key: string]: any} = {};
                    where['id'] = id;
                    return this.days.find({where: where});
                }
            }
        }));
        this.days.belongsTo(this.ausbildungsnachweise);
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
