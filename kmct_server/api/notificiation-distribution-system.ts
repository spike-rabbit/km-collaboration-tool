/**
 * Created by Maxi- PC on 26.01.2017.
 */
import * as express from "express";
import {ProtectedRequest} from "../authentication-manager";
import {database} from "../database-manager";
export const notificationDistributionSystem = express.Router();
//tesdf

notificationDistributionSystem.get("/notifications", (req: ProtectedRequest, res, next) => {
    database.sequelize.query("SELECT n.description, n.link, n.id from notifications n, notification_targets nt where n.id = nt.notification_id and nt.user_id = ?;",
        {replacements: [req.user.id]}).then(([r1]) => {
        res.send({notifications: r1});
    });
});

notificationDistributionSystem.delete("/notification/:id", (req: ProtectedRequest, res, next) => {
    database.notificationTarget.findAll({where: {notification_id: req.params["id"]}}).then(((not) => {
        not[0].destroy().then(() => {
            res.send();
        });
    }));
});