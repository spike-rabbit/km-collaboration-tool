import {database} from "./database-manager";
/**
 * Created by Maxi- PC on 22.01.2017.
 */


export function transferAppointmentKarma(toUserId: number, appointmentId: number) {
    return database.karmaTransactions.create({appointmentId: appointmentId, toUser: toUserId});
}