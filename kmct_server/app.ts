import * as express from "express";
import * as index from "./api/index";
import * as path from "path";
import * as cors from "cors";
import bodyParser = require("body-parser");
import morgan = require("morgan");


// let index = require('./coreRoutes/index');
// let users = require('./coreRoutes/users');

let app = express();


app.set('views', path.join(__dirname, 'views'));

app.use(cors({origin: "http://localhost:4200"}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', index);


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

console.log("läuft!");


export {app}
