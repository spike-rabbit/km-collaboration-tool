import * as express from "express";
import {ProtectedRequest, requireRole} from "../authentication-manager";
import {database} from "../database-manager";
import * as uuid from "uuid";
import {ROLES, Invitation} from "../models/data-types";
let router = express.Router();

/* GET users listing. */
router.get('/invitations', requireRole(ROLES.ksspr), getInvitations);
router.post('/invitation', requireRole(ROLES.ksspr), postInvitation);
router.delete('/invitation/:uuid', requireRole(ROLES.ksspr), deleteInvitation);
router.get('/class-members', requireRole(ROLES.ksspr), getClassMember);
router.get('/classes', requireRole(ROLES.admin), getClasses);

function getInvitations(req: ProtectedRequest, res: express.Response) {
    let where: {[key: string]: any} = {};
    where['class_id'] = req.user.class.id;
    database.invitations.findAll({
        where: where,
        attributes: ['uuid', 'name', 'firstname', 'email']
    }).then(invs => res.send({
        invitations: invs,
        classId: req.user.class.id
    }), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function postInvitation(req: ProtectedRequest, res: express.Response) {
    let invitation = req.body.invitation;
    invitation.classId = req.user.class.id;
    invitation.uuid = uuid.v4();
    database.invitations.create(invitation).then(invitation => {
        res.send({invitation: invitation.toJSON()});
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });

    // TODO Send email to Target Address
}

function deleteInvitation(req: ProtectedRequest, res: express.Response) {
    database.invitations.getInvitationByUUID(req.params['uuid']).then(invitation => invitation.destroy()).then(result => res.send(), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function getClassMember(req: ProtectedRequest, res: express.Response) {
    database.users.findAll({where: {"class_id": req.user.class.id}}).then(users => {
        res.send({classMembers: users, classId: req.user.class.id});
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function getClasses(req: ProtectedRequest, res: express.Response) {
    database.sequelize.query("select * from classes_with_initial_invitations").then((classesWithInitialInvitations: ClassWithInitialInvitation) => {
        res.send({classes: classesWithInitialInvitations[0]});
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

interface ClassWithInitialInvitation extends Invitation {
    id: string;
}

export {router as userAdministration};
