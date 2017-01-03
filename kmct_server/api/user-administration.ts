import * as express from "express";
import {ProtectedRequest} from "../authentication-manager";
import {database} from "../database-manager";
let router = express.Router();

/* GET users listing. */
router.get('/invitations', getInvitations);
router.post('/invitation', postInvitation);
router.delete('/invitation/:uuid', deleteInvitation);
router.get('/class-members', getClassMember);

function getInvitations(req: ProtectedRequest, res: express.Response) {
    let where: {[key: string]: any} = {};
    where['classId'] = req.user.classId;
    database.invitations.findAll({
        where: where,
        attributes: ['uuid', 'name', 'firstname', 'email']
    }).then(invs => res.send({
        invitations: invs,
        classId: req.user.classId
    }), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function postInvitation(req: ProtectedRequest, res: express.Response) {
    // Register DB
    // Send added
    // Send email to Target Address
}

function deleteInvitation(req: ProtectedRequest, res: express.Response, next: express.NextFunction) {
}

function getClassMember(req: ProtectedRequest, res: express.Response) {
    database.users.findAll({where: {"classId": req.user.classId}}).then(users => {
        res.send({classMembers: users, classId: req.user.classId});
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}
export {router as userAdministration};
