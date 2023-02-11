import bookingSchema from "../../models/booking.schema.js";
import hallSchema from "../../models/hall.schema.js";
import userSchema from "../../models/user.schema.js";
import mongoose from "mongoose";
import moment from "moment";
import bookings from "../../models/booking.schema.js";
import hall from "../../models/hall.schema.js";

export const getDataByDate = async (req, res) => {
    const { user_id } = req.query;
    const user = await userSchema.findById(user_id);
    if (!user) {
        return res.send({ status: false, desc: "User not found" });
    }

    const used = await bookings
        .find({ "schedule.date": moment().format("YYYY-MM-DD") })
        .populate([
            {
                path: "requested_by",
                populate: {
                    path: "requested_by",
                },
            },
            {
                path: "requested_hall",
                populate: {
                    path: "incharge",
                },
            },
            {
                path: "event",
                populate: {
                    path: "club staff_incharge",
                },
            },
        ]);
    const usedArr = [];
    for (let i = 0; i < used.length; i++) {
        usedArr.push(used[i].requested_hall._id);
    }
    const unused = await hallSchema
        .find({
            _id: {
                $nin: usedArr,
            },
        })
        .populate("incharge");
    res.send({
        status: true,
        data: { usedHalls: used, unusedHalls: unused },
    });
};

export const getDataByWeek = async (req, res) => {
    const dateArr = []; //Array where rest of the dates will be stored

    let prevDate;
    
    let nextDate = moment().add(7, 'days');//Date after 15 days from today (This is the end date)
    
    //extracting date from objects in MM-DD-YYYY format
    prevDate = moment().format('YYYY-MM-DD');
    nextDate = moment(nextDate._d).format('YYYY-MM-DD');
    
    //creating JS date objects
    var start = new Date(prevDate);
    var end = new Date(nextDate);
    
    //Logic for getting rest of the dates between two dates("FromDate" to "EndDate")
    while(start < end){
       dateArr.push(moment(start).format('YYYY-MM-DD'));
       var newDate = start.setDate(start.getDate() + 1);
       start = new Date(newDate);  
    }
    for(let i=0;i< dateArr.length;i++){
        const used = await bookings
        .find({ "schedule.date": dateArr[i] })
        .populate([
            {
                path: "requested_by",
                populate: {
                    path: "requested_by",
                },
            },
            {
                path: "requested_hall",
                populate: {
                    path: "incharge",
                },
            },
            {
                path: "event",
                populate: {
                    path: "club staff_incharge",
                },
            },
        ]);
        const usedArr = [];
        for (let i = 0; i < used.length; i++) {
            usedArr.push(used[i].requested_hall._id);
        }
        const unused = await hallSchema
            .find({
                _id: {
                    $nin: usedArr,
                },
            })
            .populate("incharge");
        dateArr[i] = {date: dateArr[i], usedHalls: used, unusedHalls: unused}
    }
    res.send({status:true, data: dateArr});
}