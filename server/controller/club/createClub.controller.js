import clubSchema from "../../models/club.schema.js";

const addClubController = async (req, res) => {
    const newClub = new clubSchema(req.body);
    try {
        newClub.save();
        const clubs = await newClub.populate(
            "faculty_coordinator student_coordinator",
            "-password"
        );
        res
            .status(200)
            .send({ status: true, data: clubs, desc: "successfully created" });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ status: true, error: error, desc: "Something went wrong" });
    }
};

export default addClubController;
