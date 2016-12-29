import * as express from "express";
import {ProtectedRequest, protect, verifyIdToken} from "../authentication-manager";
import {database} from "../database-manager";
let router = express.Router();

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
                            classId: invitation.classId,
                            company: null,
                            name: userData.getPayload()['family_name'],
                            firstname: userData.getPayload()['given_name']
                        }
                    }).spread((user, created) => {
                        if (created) {
                            res.send(user);
                        } else {
                            //TODO send Error 400
                            // Der User existiert bereits
                            // Sollte bei korrektem Client nie vorkommen
                        }
                    }).catch(next); // Irgendwas mit der DB stimmt nicht
                } else {
                    //TODO send Error 498
                    // ID-Token ist fehlerhaft
                }
            });
        } else {
            //TODO send Error 400
            // Invitation uuid wurde nicht gefunden
        }
    }).catch(next); // Irgendwas mit der DB stimmt nicht
}

function getUser(req: ProtectedRequest, res: express.Response) {
    res.send(req.user);
}

export = router;
