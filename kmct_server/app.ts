import * as express from "express";
import bodyParser = require("body-parser");
import morgan = require("morgan");
import * as path from 'path';


// let index = require('./routes/index');
// let users = require('./routes/users');

let app = express();

app.set('views', path.join(__dirname, 'views'));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

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
    res.send('error');
});

export = app;
