import * as express from "express";
import {ProtectedRequest, protect, verifyIdToken, requireRole} from "../authentication-manager";
import {database} from "../database-manager";
import {ROLES, UsersInstance} from "../models/data-types";
import {userAdministration} from "./user-administration";
import {kmctCache} from "../app";
export const index = express.Router();

index.use("/uas", protect, userAdministration);
index.post('/user', postUser);
index.patch('/user', protect, patchUser);
index.get('/user', protect, getUser);


function postUser(req: express.Request, res: express.Response, next) {
    database.invitations.getInvitationByUUID(req.body.uuid).then(invitation => {
        if (invitation) {
            verifyIdToken(req.body.authenticationToken, (error, userData) => {
                if (!error) {
                    database.users.findOrCreate({
                        where: {gid: userData.getPayload()['sub']},
                        defaults: {
                            gid: userData.getPayload()['sub'],
                            class: invitation.classId,
                            company: null,
                            name: invitation.name,
                            firstname: invitation.firstname,
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
        user.name = req.body.user.name;
        user.firstname = req.body.user.firstname;
        user.save().then(saved => {
            req.user.firstname = saved.firstname;
            req.user.name = saved.name;
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
}
