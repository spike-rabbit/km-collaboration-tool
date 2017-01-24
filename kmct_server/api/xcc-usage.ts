/**
 * Created by L on 05.01.2017.
 */
import * as express from "express";
import {ProtectedRequest, requireRole} from "../authentication-manager";
import {database} from "../database-manager";
import {ROLES} from "../models/data-types";
let router = express.Router();
router.get('/journals', getJournals);
router.get('/journal/:id', getJournal);
router.post('/journal', postJournal);
router.patch('/journal', patchJournal);
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
    let journal = database.journals.findById(req.params['id']).then(journal =>
        res.send({
            journal: journal,
            editable: journal.owner == req.user.id || requireRole(ROLES.ksspr) ? true : false
        }), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function postJournal(req: ProtectedRequest, res: express.Response) {
    database.journals.create(req.params['journal']).then(null, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function patchJournal(req: ProtectedRequest, res: express.Response) {


    database.journals.findById(req.params['id]']).then(journal =>
        journal.update(
            {
                monday: req.params['monday'], tuesday: req.params['tuesday'],
                wednesday: req.params['wednesday'], thursday: req.params['thursday'],
                friday: req.params['friday'], spe: req.params['spe'], activated: req.params['activated']
            }).then(journal => res.send({
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