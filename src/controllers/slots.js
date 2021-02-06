import { Slots } from "../models/slotSchema";

export const createTimeSlots = async(req, res) => {
    try {
        let reqData = req.body;
        let reqDate = reqData.date;

        let slots = await getTimeIntervals(reqData.fromTime, reqData.toTime, 30)
        for (const slot of slots) {

            var startTime = slot.from_time.split(':');
            var endTime = slot.to_time.split(':');

            if (startTime[0] < 10 && !startTime[0].startsWith('0')) {
                slot.from_time = '0' + slot.from_time;
            }
            if (endTime[0] < 10 && !endTime[0].startsWith('0')) {
                slot.to_time = '0' + slot.to_time;
            }
            let slotExists = await Slots.findOne({
                fromTime: slot.from_time,
                toTime: slot.to_time,
                date: reqDate
            }).lean();
            console.log("slotExists", slotExists, reqData);
            let saveObj = {
                date: reqDate,
                fromTime: slot.from_time,
                toTime: slot.to_time,
            };
            if (!slotExists) {
                let slot = new Slots(saveObj)
                await slot.save();
            } else {
                console.log('Timeslot NOT Saved');
                return res.send({
                    status: false,
                    message: `Timeslot already exists for ${slot.from_time} - ${slot.to_time}`
                })
            }
        }
        return res.send({
            status: true,
            message: `Timeslots has been created!.`
        })
    } catch (err) {
        console.log('error while add timeslot', err);
        res.json({ status: false, message: 'Error while adding timeslots' })
    }
}

export const getSlotsByDate = async(req, res) => {
    try {
        let slots = await Slots.find({ date: req.query.date });
        res.send({ status: true, data: slots })
    } catch (error) {
        res.json({ status: false, msg: 'something went wrong' })
    }
}

export const getTimeIntervals = async(startTime, endTime, increment = 30) => {
    // console.log("starttime",startTime)
    startTime = startTime.split(':');
    endTime = endTime.split(':');
    increment = parseInt(increment, 10);
    // console.log("increment",increment)

    var _format = function(n) { return (n < 10) ? '0' + n.toString() : n; }
    let startHr = parseInt(startTime[0], 10);
    let startMin = parseInt(startTime[1], 10);
    let endHr = parseInt(endTime[0], 10);
    let endMin = parseInt(endTime[1], 10);
    let currentHr = startHr;
    let currentMin = startMin;
    console.log("_format ", _format(currentMin));
    let previous = currentHr + ':' + _format(currentMin)
    let current = '';
    let timeArr = [];
    while (currentHr * 60 + currentMin <= endHr * 60 + endMin) {
        currentMin += increment;
        if ((currentMin % 60) === 0 || currentMin > 60) {
            currentMin = (currentMin === 60) ? 0 : currentMin - 60;
            currentHr += 1;
        }
        current = currentHr + ':' + _format(currentMin);
        if (currentHr * 60 + currentMin <= endHr * 60 + endMin) {
            // console.log("fromtime", previous)
            timeArr.push({ from_time: previous, to_time: current });
        }
        previous = current;
    }

    return timeArr;
};