import * as express from "express";
let router = express.Router();
let GoogleAuth = require('google-auth-library');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.get("authentication-token"));
    res.send({sinnlos: "dataText"});
});

router.post("/login", login);

function login(req: express.Request, res: express.Response) {
    let auth = new GoogleAuth();
    console.log(req.get("authentication-token"));

    let client = new auth.OAuth2('815289840446-0trcb2angmlb128gjgsfu488jhcam3n0.apps.googleusercontent.com');
    client.verifyIdToken(req.body.token, '815289840446-0trcb2angmlb128gjgsfu488jhcam3n0.apps.googleusercontent.com', function (e, login) {
        console.log(login.getPayload()['sub']);
        console.log(login.getPayload()['email']);
    });
    res.send('Complete');
}

export = router;
