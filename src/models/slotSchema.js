import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SlotModel = new Schema({
    fromTime: { type: String },
    toTime: { type: String },
    isScheduled: { type: Boolean, default: false },
    date: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

export const Slots = mongoose.model('slot', SlotModel);