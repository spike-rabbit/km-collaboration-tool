/**
 * Created by L on 17.01.2017.
 */
import * as express from "express";
import {ProtectedRequest} from "../authentication-manager";
import {database} from "../database-manager";
let router = express.Router();
router.get('/threads', getAllThreads);
router.get('/thread', getThread);
router.get('/answers/:questionId', getAllAnswers);
router.get('/answer/:answerId', getAnswer);
router.get('like/:likeId', getLike);
router.get('likes/:answerId', getLikes);
router.post('/thread', postThread);
router.post('/answer', postAnswer);
router.post('/like', postLike);



function getAllThreads(req: ProtectedRequest, res: express.Response){
}

function getThread(req: ProtectedRequest, res: express.Response){
    database.threads.findById(req.params['id']).then(thread => res.send({thread: thread}), reason => {
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

function getAllAnswers(req: ProtectedRequest, res: express.Response){
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