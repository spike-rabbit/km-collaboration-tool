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
router.get('/answer/:answerId', getAnswer);
router.get('like/:likeId', getLike);
router.get('likes/:answerId', getLikes);
router.post('/thread', postThread);
router.post('/answer', postAnswer);
router.post('/like', postLike);
//category & sort


function getAllThreads(req: ProtectedRequest, res: express.Response){
    database.threads.findAll({ where: { class: req.user.class.id}, include: [{  all:true,

        include: [{all: true}]}]})
        .then((threads: ThreadInstance[]) => {
            let tarray = [];
            for (let t of threads){
                 let tJSON = t.toJSON();
                tarray.push(tJSON);
                for(let a of tJSON.answers){
                    for(let l of a.likes){
                        a.liked = l.user_id == req.user.id;
                    }
               }
            }
        res.send(
            {
                threads: tarray
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
        ).then(thread => res.send({thread: thread}), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
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



function getAnswer(req: ProtectedRequest, res: express.Response){
    database.answers.findById(req.params['id']).then(answer => res.send({answer: answer}), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}

function getLikes(req: ProtectedRequest, res: express.Response){

}

function getLike(req: ProtectedRequest, res: express.Response){

}

function postLike(req: ProtectedRequest, res: express.Response){
    database.likes.create(req.body.like).then(() => res.send(), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}


export {router as kncUsage};