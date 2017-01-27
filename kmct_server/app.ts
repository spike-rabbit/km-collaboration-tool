import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as NodeCache from "node-cache";
import {index} from "./api/index";
import bodyParser = require("body-parser");
import morgan = require("morgan");
import cookieParser = require("cookie-parser");

export const kmctCache = new NodeCache({stdTTL: 5 * 60});
export const app = express();

app.disable("etag");
app.set("env", "development");

app.use(cors({origin: "http://localhost:4200", credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(function (req, res, next) {
    if (!req.url.startsWith("/api")) {
        let lang = req.cookies["locale"];
        if (!lang) {
            for (let l of req.acceptsLanguages()) {
                if (lang == "de" || lang == "en") {
                    lang = l;
                    break;
                }
            }
        }
        if (!lang) {
            lang = "en";
        }
        req.url = "/" + lang + req.url;

    }
    console.log(req.url);
    next();
});
app.use(morgan('dev'));
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


