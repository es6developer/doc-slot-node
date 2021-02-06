import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjecId = Schema.Types.ObjectId;

const AppointmentModel = new Schema({
    patientName: { type: String },
    mobileNumber: { type: String },
    appointmentDate: { type: Date },
    status: { type: String, default: "Booked" },
    slot: {
        type: ObjecId,
        ref: 'slot'
    },
    createdAt: { type: Date, default: Date.now }
});


export const Appointment = mongoose.model('appointment', AppointmentModel);