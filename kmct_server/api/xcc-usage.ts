/**
 * Created by L on 05.01.2017.
 */
import * as express from "express";
import {ProtectedRequest} from "../authentication-manager";
import {database} from "../database-manager";
import * as uuid from "uuid";
let router = express.Router();
router.get('/journals', getAusbildungsnachweise);

function getAusbildungsnachweise(req: ProtectedRequest, res: express.Response){
    let where: {[key: string]: any} = {};
    where['classId'] = req.user.class.id;
    database.ausbildungsnachweise.findAll({
        where: where, attributes: []
    }).then(nachweis => res.send({
        ausbildungsnachweise: nachweis, classId: req.user.class.id    }), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    })
}

