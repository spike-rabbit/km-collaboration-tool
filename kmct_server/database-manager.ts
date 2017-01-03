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
    RoleModel
} from "./models/data-types";
import DefineOptions = Sequelize.DefineOptions;

class DatabaseManager {
    private sequelize: Sequelize.Sequelize;
    companies: CompanyModel;
    users: UsersModel;
    invitations: InvitationModel;
    roles: RoleModel;

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
