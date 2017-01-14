/**
 * Created by L on 05.01.2017.
 */
import * as express from "express";
import {ProtectedRequest} from "../authentication-manager";
import {database} from "../database-manager";
let router = express.Router();
router.get('/journals', getAusbildungsnachweise);
router.get('/journal/:id', getJournal);
router.post('/journal', postAusbildungsnachweis);
router.patch('/edit', editNachweis);
//TODO journalTemplates moved to later state

function getAusbildungsnachweise(req: ProtectedRequest, res: express.Response){
    let where: {[key: string]: any} = {};
    where['classId'] = req.user.class.id;
    database.journals.findAll({
        where: where, attributes: []
    }).then(journal => res.send({
        journals: journal, classId: req.user.class.id    }), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function getJournal(req: ProtectedRequest, res: express.Response){
    let where: {[key: string]:any} = {};
    where['id'] = req.params['id'];
    database.journals.find({where, attributes:[]}).then(journal => res.send({journal: journal, classId: req.user.class.id}),
        reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function postAusbildungsnachweis(req: ProtectedRequest, res: express.Response){
    database.journals.create(req.params['journal']).then(null , reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function editNachweis(req: ProtectedRequest, res: express.Response){

    let where:{[key: string]:any} = {};
    //TODO look into order
    where['id'] = req.params['id'];
    database.journals.find(where).then(journal =>
        journal.update(
            {monday: req.params['monday'], tuesday:  req.params['tuesday'],
                wednesday:  req.params['wednesday'], thursday: req.params['thursday'],
                friday: req.params['friday'], spe:  req.params['spe']}).then(journal => res.send({journal}),
        reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    }));

}

export {router as xccUsage};