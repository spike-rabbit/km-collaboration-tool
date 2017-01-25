/**
 * Created by L on 05.01.2017.
 */
import * as express from "express";
import {ProtectedRequest} from "../authentication-manager";
import {database} from "../database-manager";
import {ROLES} from "../models/data-types";
let router = express.Router();
router.get('/journals', getJournals);
router.get('/journal/:id', getJournal);
router.patch('/journal/:id', patchJournal);
//TODO journalTemplates moved to later state

function getJournals(req: ProtectedRequest, res: express.Response) {
    database.classes.findById(req.user.class.id).then(cs => {
        cs.getJournals().then(journals => {
            res.send({journals: journals});
        }, reason => {
            //TODO log better
            //TODO send error to client
            console.log(reason);
        })
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function getJournal(req: ProtectedRequest, res: express.Response) {
    let journal = database.journals.findById(req.params['id']).then(journal => {
        let j = journal.toJSON();
        (<any>j).editable = (journal.owner == req.user.id && !journal.activated) || (journal.activated && req.user.roles.some(role => role.id == ROLES.ksspr));
        res.send({journal: j});
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function patchJournal(req: ProtectedRequest, res: express.Response) {


    database.journals.findById(req.params['id']).then(journal =>
        journal.update(req.body).then(journal => res.send({
                journal: journal,
                classId: req.user.class.id
            }),
            reason => {
                //TODO log better
                //TODO send error to client
                console.log(reason);
            }));

}

export {router as xccUsage};