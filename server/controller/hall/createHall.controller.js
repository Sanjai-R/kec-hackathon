import hallSchema from "../../models/hall.schema.js";

const createHallController = async (req, res) => {
    const { name, description, gallery, capacity, incharge, department } =
        req.body;

    try {
        const data = await hallSchema({
            name,
            description,
            gallery,
            incharge,
            capacity,
            department,
        }).save();
        const hall = await data.populate("incharge", "-password");
        res
            .status(200)
            .send({ status: true, data: hall, desc: "Hall Created Successfully" });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ status: true, error: error, desc: "Something went wrong" });
    }
};

export default createHallController;
