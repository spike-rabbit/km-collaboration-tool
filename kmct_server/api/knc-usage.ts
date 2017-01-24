/**
 * Created by L on 17.01.2017.
 */
import * as express from "express";
import {ProtectedRequest} from "../authentication-manager";
import {database} from "../database-manager";
import {ThreadInstance} from "../models/data-types";
let router = express.Router();
router.get('/threads', getAllThreads);
router.get('/thread/:id', getThread);
router.post('/thread', postThread);
router.post('/answer', postAnswer);
router.post('/like', postLike);
router.get('/categories', getAllCategories);
router.post('/categories', postCategory);
//category & sort


function getAllThreads(req: ProtectedRequest, res: express.Response){
    database.threads.findAll({ where: { class: req.user.class.id}})
        .then(threads => {
        res.send(
            {
                threads: threads.sort(function(a,b){
                    return b.created_at.getDate() - a.created_at.getDate();
                })
            }
            )
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function getThread(req: ProtectedRequest, res: express.Response){
    database.threads.findAll(
        {where: { id: req.params['id']},
            include: [{
                 all: true,
                 include: [{all: true}]}
        ]}
        ).then((thread: ThreadInstance[]) =>{
        let tarray = [];
        for (let t of thread){
            let tJSON = t.toJSON();
            tarray.push(tJSON);
            for(let a of tJSON.answers){
                for(let l of a.likes){
                    a.liked = l.user_id == req.user.id;
                }
            }
            t.answers = t.answers.sort(function(a,b){
                return a.creationDate.getDate() - b.creationDate.getDate() ;
            });
        }
            res.send({thread: thread}), reason => {
                //TODO log better
                //TODO send error to client
                console.log(reason);
            }
        }
    );
}

function postThread(req: ProtectedRequest, res: express.Response){

    let thread =  req.body.thread;
    database.threads.create(thread).then(() => res.send(), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });

}

function postAnswer(req: ProtectedRequest, res: express.Response) {

    let answer = req.body.answer;
    database.answers.create(answer).then(() => res.send(), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}




function postLike(req: ProtectedRequest, res: express.Response){
    database.likes.create(req.body.like).then(() => res.send(), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}


function getAllCategories(req: ProtectedRequest, res: express.Response){

    database.categories.findAll({ where: { class_id: req.user.class.id}}).then(categories => {
        res.send({categories: categories}), reason => {
            //TODO log better
            //TODO send error to client
            console.log(reason);
        }
    });
}

function postCategory(req: ProtectedRequest, res: express.Response){

    let cat = req.body.category;
    database.categories.create(cat).then(() => res.send(), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });

}

export {router as kncUsage};