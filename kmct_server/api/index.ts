import * as express from "express";
import {ProtectedRequest, protect, verifyIdToken, requireRole} from "../authentication-manager";
import {database} from "../database-manager";
import {ROLES, UsersInstance} from "../models/data-types";
import {userAdministration} from "./user-administration";
import {xccUsage} from "./xcc-usage";
import {kncUsage} from "./knc-usage";
import {kmctCache} from "../app";
import {sem} from "./shared-event-management";
export const index = express.Router();

index.use("/xcc", protect, xccUsage);
index.use("/knc", protect, kncUsage);
index.use("/uas", protect, userAdministration);
index.use("/sem", protect, requireRole(ROLES.ksmem), sem);
index.post('/user', postUser);
index.patch('/user', protect, patchUser);
index.get('/user', protect, getUser);
index.get('/user/company', protect, getCompany);
index.patch("/user/:id/role/:role", protect, requireRole(ROLES.ksspr), patchRole);
index.delete("/user/:id/role/:role", protect, requireRole(ROLES.ksspr), deleteRole);
index.delete("/user/:id", protect, requireRole(ROLES.admin), deleteUser);
index.get("/users", protect, requireRole(ROLES.admin), getUsers);

function postUser(req: express.Request, res: express.Response, next) {
    database.invitations.getInvitationByUUID(req.body.uuid).then(invitation => {
        if (invitation) {
            verifyIdToken(req.body.authenticationToken, (error, userData) => {
                if (!error) {
                    database.users.findOrCreate({
                        where: {gid: userData.getPayload()['sub']},
                        defaults: {
                            gid: userData.getPayload()['sub'],
                            class: {id: invitation.classId, profession: "AddProfession"},
                            company: null,
                            name: invitation.name,
                            firstname: invitation.firstname,
                            workinghours: 0
                        }
                    }).spread((user: UsersInstance, created) => {
                        if (created) {
                            user.addRole(ROLES.ksmem).then(value => {
                                invitation.destroy().then(dvalue => {
                                    let sendUser = user.toJSON();
                                    sendUser.roles = [{id: ROLES.ksmem}];
                                    res.send(sendUser);
                                });
                            });
                        } else {
                            //TODO send Error 400
                            // Der User existiert bereits
                            // Sollte bei korrektem Client nie vorkommen
                        }
                    }).catch(err => {
                        // Irgendwas mit der DB stimmt nicht
                        console.log(err);
                        next(err);
                    });
                } else {
                    //TODO send Error 498
                    // ID-Token ist fehlerhaft
                }
            });
        } else {
            //TODO send Error 400
            // Invitation uuid wurde nicht gefunden
        }
    }).catch(err => {
        // Irgendwas mit der DB stimmt nicht
        console.log(err);
        next(err);
    });
}

function getUser(req: ProtectedRequest, res: express.Response) {
    res.send(req.user);
}

function patchUser(req: ProtectedRequest, res: express.Response, next: express.NextFunction) {
    database.users.findById(req.user.id).then(user => {
        user.update({
            name: req.body.user.name,
            firstname: req.body.user.firstname,
            workinghours: req.body.user.workinghours
        }).then(saved => {
            saved.setCompany(req.body.user.companyId).then(company => {
                req.user.firstname = saved.firstname;
                req.user.name = saved.name;
                (<any>req.user).company_id = company.id;
                req.user.workinghours = saved.workinghours;
                kmctCache.set(req.get("authentication-token"), req.user);
                res.send(saved.toJSON());
            }, err => {
                // Irgendwas mit der DB stimmt nicht
                console.log(err);
                next(err);
            });
        }, err => {
            // Irgendwas mit der DB stimmt nicht
            console.log(err);
            next(err);
        });
    }, err => {
        // Irgendwas mit der DB stimmt nicht
        console.log(err);
        next(err);
    });
}

function getCompany(req: ProtectedRequest, res: express.Response) {
    database.users.findById(req.user.id, {
        include: [{model: database.companies, attributes: ["id", "name"]}],
        attributes: []
    }).then(userwc => {
        res.send(userwc.company);
    });
}

function patchRole(req: ProtectedRequest, res: express.Response, next: express.NextFunction) {
    database.users.findById(req.params["id"]).then(user => {
        user.addRole(req.params["role"]).then(role => {
            res.send();
        })
    }, err => {
        // Irgendwas mit der DB stimmt nicht
        console.log(err);
        next(err);
    });
}

function deleteRole(req: ProtectedRequest, res: express.Response, next: express.NextFunction) {
    database.users.findById(req.params["id"]).then(user => {
        user.removeRole(req.params["role"]).then(() => {
            res.send();
        }, err => {
            // Irgendwas mit der DB stimmt nicht
            console.log(err);
            next(err);
        });
    }, err => {
        // Irgendwas mit der DB stimmt nicht
        console.log(err);
        next(err);
    });
}

function deleteUser(req: ProtectedRequest, res: express.Response, next: express.NextFunction) {
    database.users.findById(req.params["id"]).then(user => {
        user.destroy().then(() => {
            res.send();
        }, err => {
            // Irgendwas mit der DB stimmt nicht
            console.log(err);
            next(err);
        });
    }, err => {
        // Irgendwas mit der DB stimmt nicht
        console.log(err);
        next(err);
    });
}

function getUsers(req: ProtectedRequest, res: express.Response, next: express.NextFunction) {
    database.users.findAll().then(users => {
        res.send({users: users});
    }, err => {
        // Irgendwas mit der DB stimmt nicht
        console.log(err);
        next(err);
    });
}

