import clubSchema from "../../models/club.schema.js";

export const updateClub = async (req, res) => {
    const { id } = req.body;
      if (!id) {
        return res.send({ status: false, data: null, desc: "data missing" });
      }

    const clubs = await clubSchema.findByIdAndUpdate(id, req.body, { new: true });
    if (clubs === null) {
        res.send({ status: false, data: null, desc: "No clubs found" });
    } else {
        res.send({ status: true, data: clubs });
    }
};
