import eventSchema from "../../models/event.schema.js";

const createEventController = async (req, res) => {
    const { name, club, staff_incharge, event_capacity, description, requirements } =
        req.body;

    try {
        const data = await eventSchema({
            name,
            club,
            staff_incharge,
            event_capacity,
            description,
            requirements,
        }).save();
        const event = await data.populate("staff_incharge", "-password");
        res
            .status(200)
            .send({ status: true, data: event, message: "Event Created Successfully" });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ status: true, error: error, message: "Something went wrong" });
    }
}

export default createEventController;