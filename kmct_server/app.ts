import * as express from "express";
import * as index from "./routes/index";
import * as users from "./routes/users";
import * as path from "path";
import * as cors from "cors";
import {DatabaseManager} from "./database-manager";
import bodyParser = require("body-parser");
import morgan = require("morgan");
import {protect, ProtectedRequest} from "./authentication-manager";


// let index = require('./coreRoutes/index');
// let users = require('./coreRoutes/users');

let app = express();


app.set('views', path.join(__dirname, 'views'));

app.use(cors({origin: "http://localhost:4200"}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);

app.use(protect);
app.get('/testen', function (req: ProtectedRequest, res: express.Response) {
   res.send(req.user);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err: any, req: express.Request, res: express.Response, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

let databaseManager = new DatabaseManager();
console.log("läuft!");


export {app}
