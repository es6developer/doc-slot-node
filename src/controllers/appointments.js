import { Appointment } from "../models/appointmentSchema";
import { Slots } from "../models/slotSchema";

export const createAppointment = async(req, res) => {
    try {
        let reqData = req.body;
        let appointmentExists = await Appointment.findOne({ slot: reqData.slot });
        if (appointmentExists) {
            res.send({ status: false, message: 'This time slot was already scheduled' });
        } else {
            let slot = await Slots.findById(reqData.slot)
            reqData.appointmentDate = slot.date;
            let createAppointment = await Appointment.create(reqData);
            if (createAppointment) {
                await Slots.update({ _id: reqData.slot }, { $set: { isScheduled: true } });
                res.send({ status: true, message: 'Your appointment is booked successfully' });
            } else {
                res.send({ status: false, message: 'Sorry! unable to book a appointment' });
            }
        }
    } catch (err) {
        console.log('error while add appointment', err);
        res.json({ status: false, message: 'Unable to add' })
    }
}
export const getAppointments = async(req, res) => {
    try {
        let getAppointments = await Appointment.find({}).populate('slot');
        if (getAppointments && getAppointments.length != 0) {
            res.json({ status: true, data: getAppointments });
        } else {
            res.json({ status: false, message: 'No Data Found' });
        }
    } catch (err) {
        console.log('error while getting appointment', err);
        res.json({ status: false, message: 'Unable to get appointment list' })
    }
}