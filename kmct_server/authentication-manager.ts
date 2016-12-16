/**
 * Created by Maxi- PC on 16.12.2016.
 */
import * as express from "express";
let GoogleAuth = require('google-auth-library');
const application = '815289840446-0trcb2angmlb128gjgsfu488jhcam3n0.apps.googleusercontent.com';
let client = new (new GoogleAuth()).OAuth2(application);

export function protect(req: ProtectedRequest, res: express.Response, next: express.NextFunction) {
    let token = req.get("authentication-token");
    if (token) {
        client.verifyIdToken(token, application, function (e, login) {
            if (e) {
                res.send({Error: e});
            } else {
                req.user = {
                    id: login.getPayload()['sub'],
                    email: login.getPayload()['email']
                };
                console.log(login.getPayload()['sub']);
                console.log(login.getPayload()['email']);
                next();
            }
        });
    }
    else {
        res.send({error: "not authenticated"});
    }
}

export interface ProtectedRequest extends express.Request {
    user?: GoogleUser;
}

export interface GoogleUser {
    id: string;
    email: string;
}