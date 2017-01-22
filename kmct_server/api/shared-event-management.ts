/**
 * Created by Maxi- PC on 16.01.2017.
 */
import * as express from "express";
import {ProtectedRequest} from "../authentication-manager";
import {database} from "../database-manager";
import {AppointmentInstance} from "../models/data-types";
export const sem = express.Router();

sem.get("/appointments", getAppointments);
sem.post("/appointment", postAppointment);
sem.get("/appointment/:id", getAppointment);
sem.put("/appointment/:id", putAppointment);
sem.delete("/appointment/:id", deleteAppointment);


function getAppointments(req: ProtectedRequest, res: express.Response) {
    database.classes.findById(req.user.class.id).then(cl => {
        cl.getAppointments({attributes: ["id", "name", "start", "end"]}).then((appointments: AppointmentInstance[]) => {
            res.send({appointments: appointments.map(appointment => appointment.toJSON())});
        });
    });
}

function postAppointment(req: ProtectedRequest, res: express.Response) {
    let appointment = req.body.appointment;
    database.classes.findById(req.user.class.id).then(classI => {
        classI.createAppointment(appointment).then(appointment => appointment.update({user_id: req.user.id}).then(user => res.send()));
    }, reason => {
        // TODO        log better
        // TODO send error to client
        console.log(reason);
    });
}

function getAppointment(req: ProtectedRequest, res: express.Response) {
    database.appointments.findById(req.params['id']).then(app => {
        res.send(app.toJSON());
    }, reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });

}

function putAppointment(req: ProtectedRequest, res: express.Response) {
    let appointment = req.body.appointment;
    database.appointments.findById(req.params['id']).then(app => {
        app.name = appointment.name;
        app.description = appointment.description;
        app.start = appointment.start;
        app.end = appointment.end;
        app.save().then(saved => {
            res.send(saved.toJSON());
        }, err => {
            // Irgendwas mit der DB stimmt nicht
            console.log(err);
        });
    }, err => {
        // Irgendwas mit der DB stimmt nicht
        console.log(err);
    });
}

function deleteAppointment(req: ProtectedRequest, res: express.Response) {
    database.appointments.findById(req.params['id']).then(appointment => appointment.destroy()).then(result => res.send(), reason => {
        //TODO log better
        //TODO send error to client
        console.log(reason);
    });
}