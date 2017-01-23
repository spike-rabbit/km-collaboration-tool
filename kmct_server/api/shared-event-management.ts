/**
 * Created by Maxi- PC on 16.01.2017.
 */
import * as express from "express";
import * as moment from "moment";
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
        cl.getAppointments({attributes: ["id", "name", "start", "end", "repetitionType", "repetitionCount", "type"]}).then((appointments: AppointmentInstance[]) => {
            let mappointments = appointments.map(appointment => appointment.toJSON());
            let toAdd = [];
            for (let appointment of mappointments) {
                if (appointment.repetitionType != "none") {
                    let start = moment(appointment.start);
                    let end = moment(appointment.end);
                    for (let i = 0; i < appointment.repetitionCount; i++) {
                        start.add(1, appointment.repetitionType == "daily" ? "d" : "w");
                        end.add(1, appointment.repetitionType == "daily" ? "d" : "w");
                        let newAppointment = JSON.parse(JSON.stringify(appointment));
                        newAppointment.start = start.toISOString();
                        newAppointment.end = end.toISOString();
                        toAdd.push(newAppointment);
                    }
                }
            }
            mappointments = mappointments.concat(toAdd);
            mappointments.forEach(appointment => {
                delete appointment.repetitionType;
                delete appointment.repetitionCount;
            });
            res.send({appointments: mappointments});
        });
    });
}

function postAppointment(req: ProtectedRequest, res: express.Response) {
    let appointment = req.body.appointment;
    database.classes.findById(req.user.class.id).then(classI => {
        classI.createAppointment(appointment).then(appointment => appointment.update({user_id: req.user.id})
            .then(() => res.send()))
        // transferAppointmentKarma(req.user.id, appointment.id)
        // .then(() => res.send())));
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
        app.repetitionType = appointment.repetitionType;
        app.repetitionCount = appointment.repetitionCount;
        app.type = appointment.type;
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