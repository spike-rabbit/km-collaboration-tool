import * as express from "express";
import {ProtectedRequest, requireRole} from "../authentication-manager";
import {database} from "../database-manager";
import * as uuid from "uuid";
import {ROLES, Invitation} from "../models/data-types";
import * as multer from "multer";
import {kmctCache} from "../app";
let router = express.Router();
let upload = multer({storage: multer.memoryStorage()});

router.get('/invitations', requireRole(ROLES.ksspr), getInvitations);
//TODO auch admin Rolle geht
router.post('/invitation', requireRole(ROLES.ksspr), postInvitation);
router.delete('/invitation/:uuid', requireRole(ROLES.ksspr), deleteInvitation);
router.get('/class-members', requireRole(ROLES.ksspr), getClassMember);
router.get('/classes', requireRole(ROLES.admin), getClasses);
router.post('/class', requireRole(ROLES.admin), postClass);
router.get('/companies', requireRole(ROLES.admin), getCompanies);
router.post('/company', requireRole(ROLES.admin), postCompany);
router.get("/company/:id/logo", requireRole(ROLES.admin), getLogo);
router.post("/company/:id/logo", requireRole(ROLES.admin), upload.single("file"), postLogo);
router.put('/company', requireRole(ROLES.admin), putCompany);


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
    if (!invitation.classId) {
        invitation.classId = req.user.class.id;
    }
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

function postClass(req: ProtectedRequest, res: express.Response) {
    database.classes.create(req.body.class).then(() => {
        res.send();
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

interface ClassWithInitialInvitation extends Invitation {
    id: string;
}

function getCompanies(req: ProtectedRequest, res: express.Response) {
    database.companies.findAll({attributes: ["id", "name"]}).then(comps => res.send({
        companies: comps
    }), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}
function postCompany(req: ProtectedRequest, res: express.Response) {
    let company = req.body;
    kmctCache.get("company" + company.id, file => {
        if(file) {
            company.logo = file.buffer;
        }
        database.companies.create(company).then(() => {
            res.send();
        }, reason => {
            //TODO log better
            //TODO send error to client
            console.log(reason);
        });
    });

}
function putCompany(req: ProtectedRequest, res: express.Response) {
    database.companies.findById(req.body.company.id).then(comp => {
        comp.name = req.body.company.name;
        comp.save().then(saved => {
            res.send(saved.toJSON());
        }, err => {
            // Irgendwas mit der DB stimmt nicht
            console.log(err);
        });
    }, err => {
        // Irgendwas mit der DB stimmt nicht
        console.log(err);
    });
}

function getLogo(req: ProtectedRequest, res: express.Response) {
    database.companies.findById(req.params["id"], {attributes: ["logo"]}).then(ci => {
        if (ci) {
            res.contentType("application/blob");
            res.setHeader("Content-Length", ci.logo.length + "");
            res.send(ci.logo);
        } else {
            res.status(404).send();
        }
    });
}

function postLogo(req: ProtectedRequest, res: express.Response) {
    console.log("Ich war hier");
    kmctCache.set("company" + req.params["id"], req.file);
    res.send();
}


export {router as userAdministration};
