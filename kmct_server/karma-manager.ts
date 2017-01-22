import {database} from "./database-manager";
/**
 * Created by Maxi- PC on 22.01.2017.
 */


export function transferAppointmentKarma(toUserId: number, appointmentId: number) {
    return database.karmaTransactions.create({appointmentId: appointmentId, toUser: toUserId, value: 10});
}

export function karmaPoints(userid: number) {
    return Promise.all([database.sequelize.query("select sum(kt.value) as sum from karma_transactions kt where kt.TO_USER = ?", {replacements: [userid]}), database.sequelize.query("select sum(kt.value) as sum from karma_transactions kt where kt.FROM_USER = ?", {replacements: [userid]})])
        .then(([val1, val2]) => {
            return new Promise((resolve, reject) => {
                resolve(val1[0][0].sum - val2[0][0].sum);
            });
        });
}