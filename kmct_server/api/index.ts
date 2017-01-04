import * as express from "express";
import {ProtectedRequest, protect, verifyIdToken, requireRole} from "../authentication-manager";
import {database} from "../database-manager";
import {ROLES, UsersInstance} from "../models/data-types";
import {userAdministration} from "./user-administration";
let router = express.Router();

router.use("/uas", protect, requireRole(ROLES.ksspr), userAdministration);
router.post('/user', postUser);
router.get('/user', protect, getUser);


function postUser(req: express.Request, res: express.Response, next) {
    database.invitations.getInvitationByUUID(req.body.uuid).then(invitation => {
        if (invitation) {
            verifyIdToken(req.body.authenticationToken, (error, userData) => {
                if (!error) {
                    database.users.findOrCreate({
                        where: {gid: userData.getPayload()['sub']},
                        defaults: {
                            gid: userData.getPayload()['sub'],
                            classId: invitation.classId,
                            company: null,
                            name: invitation.name,
                            firstname: invitation.firstname,
                        }
                    }).spread((user: UsersInstance, created) => {
                        if (created) {
                            user.addRole(ROLES.ksmem).then(value => {
                                user.roles = [{id: ROLES.ksmem}];
                                res.send(user);
                                invitation.destroy().then();
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

export = router;
