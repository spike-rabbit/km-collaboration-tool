/**
 * Created by Maxi- PC on 16.12.2016.
 */
import * as express from "express";
import {database} from "./database-manager";
import {User} from "./models/data-types";
const GoogleAuth = require('google-auth-library');
const application = '815289840446-0trcb2angmlb128gjgsfu488jhcam3n0.apps.googleusercontent.com';
const googleAuthClient = new (new GoogleAuth()).OAuth2(application);

export function protect(req: ProtectedRequest, res: express.Response, next: express.NextFunction) {
    let token = req.get("authentication-token");
    if (token) {
        verifyIdToken(token, function (e, login) {
            if (e) {
                res.send({error: e});
            } else {
                database.users.getUserByGid(login.getPayload()['sub']).then(user => {
                    req.user = user.toJSON();
                    next();
                }).catch(reason => {
                    res.status(404).send({error: "user not found"});
                });
            }
        });
    }
    else {
        res.status(401).send({error: "not authenticated"});
    }
}

export function verifyIdToken(token: any, callback: (error: any, userData: any) => void) {
    googleAuthClient.verifyIdToken(token, application, callback);
}

export interface ProtectedRequest extends express.Request {
    user?: User;
}
