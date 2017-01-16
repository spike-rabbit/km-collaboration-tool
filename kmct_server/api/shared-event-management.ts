/**
 * Created by Maxi- PC on 16.01.2017.
 */
import * as express from "express";
import {ProtectedRequest} from "../authentication-manager";
import {database} from "../database-manager";
import {AppointmentInstance} from "../models/data-types";
export const sem = express.Router();

sem.get("/appointments", getAppointments);
sem.post("/appointment");
sem.get("/appointment/:id");
sem.put("/appointment/:id");
sem.delete("/appointment/:id");


function getAppointments(req: ProtectedRequest, res: express.Response) {
    database.classes.findById(req.user.class.id).then(cl => {
        cl.getAppointments({attributes: ["id", "name", "start", "end"]}).then((appointments: AppointmentInstance[]) => {
            res.send({appointments: appointments.map(appointment => appointment.toJSON())});
        });
    });
}

