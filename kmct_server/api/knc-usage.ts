/**
 * Created by L on 17.01.2017.
 */
import * as express from "express";
import {ProtectedRequest} from "../authentication-manager";
import {database} from "../database-manager";
import {ThreadInstance, LikeInstance} from "../models/data-types";
let router = express.Router();
router.get('/threads', getAllThreads);
router.get('/thread/:id', getThread);
router.post('/thread', postThread);
router.post('/answer', postAnswer);
router.post('/thread/answer/:id/like', postLike);
router.get('/categories', getAllCategories);
router.get('/category/:id', getCategory);
router.patch('/category/:id', patchCategory);
router.post('/category', postCategory);
//category & sort


function getAllThreads(req: ProtectedRequest, res: express.Response) {
    database.threads.findAll({
        where: {class: req.user.class.id},
        include: [{model: database.categories, attributes: ["category"]}, {
            model: database.users,
            attributes: ["name", "firstname"]
        }]
    })
        .then(threads => {
            res.send(
                {
                    threads: threads.sort(function (a, b) {
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

function getThread(req: ProtectedRequest, res: express.Response) {
    database.threads.findById(req.params['id'], {
            include: [{
                model: database.answers,
                include: [database.likes, {model: database.users, attributes: ["name", "firstname"]}]
            }, {
                model: database.users,
                attributes: ["name", "firstname"]
            }, {model: database.categories, attributes: ["id", "category"]}]
        }
    ).then((thread: ThreadInstance) => {
            let tJSON = thread.toJSON();
            for (let a of tJSON.answers) {
                (<any>a).likeCount = a.likes.length;
                a.liked = a.owner == req.user.id;
                for (let l of a.likes) {
                    if (l.user_id == req.user.id) {
                        a.liked = true;
                        break;
                    }
                }
                delete a.likes;
            }
            tJSON.answers = tJSON.answers.sort(function (a, b) {
                return a.created_at.getDate() - b.created_at.getDate();
            });
            res.send({thread: tJSON});
        }, reason => {
            //TODO log better
            //TODO send error to client
            console.log(reason);
        }
    );
}

function postThread(req: ProtectedRequest, res: express.Response) {
    let thread = req.body;
    thread.class = req.user.class.id;
    thread.owner = req.user.id;
    database.threads.create(thread).then((post: ThreadInstance) => {
        post.setCategory(thread.categoryId).then(() => {
            res.send(post.toJSON());
        }, reason => {
            //TODO log better
            //TODO send error to client
            console.log(reason);
        });
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });

}

function postAnswer(req: ProtectedRequest, res: express.Response) {

    let answer = req.body;
    answer.owner = req.user.id;
    database.answers.create(answer).then(() => res.send(), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}


function postLike(req: ProtectedRequest, res: express.Response) {
    database.likes.create({}).then((like: LikeInstance) => {
        return like.setAnswer(req.params["id"]).then(() => like.setUser(req.user.id)).then(() => res.send(), reason => {
            //TODO log better
            //TODO send error to client
            console.log(reason);
        });
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}


function getAllCategories(req: ProtectedRequest, res: express.Response) {

    database.categories.findAll({where: {class_id: req.user.class.id}}).then(categories => {
        res.send({categories: categories}), reason => {
            //TODO log better
            //TODO send error to client
            console.log(reason);
        }
    });
}

function postCategory(req: ProtectedRequest, res: express.Response) {
    let cat = req.body;
    database.categories.create(cat).then((category) => {
        category.setClass(req.user.class.id).then(() => res.send());
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });

}

function getCategory(req: ProtectedRequest, res: express.Response) {
    database.categories.findById(req.params["id"]).then(c => res.send(c.toJSON()), reason => {
            //TODO log better
            //TODO send error to client
            console.log(reason);
        }
    )

}
function patchCategory(req: ProtectedRequest, res: express.Response) {
    database.categories.findById(req.params["id"]).then(category => {
            category.update({category: req.body.category}).then(() => res.send(), reason => {
                //TODO log better
                //TODO send error to client
                console.log(reason);
            })
        }, reason => {
            //TODO log better
            //TODO send error to client
            console.log(reason);
        }
    )
}

export {router as kncUsage};