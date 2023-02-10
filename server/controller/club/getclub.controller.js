import clubSchema from "../../models/club.schema.js";

export const getClub = async (req, res) => {
  const { id, type } = req.query;
  console.log(id, type);
  if (!type || !id) {
    res.send({ status: false, data: null, desc: "data missing" });
    return;
  }
  let searchQuery;
  if (type == "student") {
    searchQuery = {
      student_coordinator: id,
    };
  } else if (type == "faculty") {
    searchQuery = {
      faculty_coordinator: id,
    };
  } else {
    res.send({ status: false, data: null, desc: "check your type" });
  }

  const clubs = await clubSchema
    .find(searchQuery)
    .populate("faculty_coordinator student_coordinator", "-password");
  if (clubs.length == 0) {
    res.send({ status: false, data: null, desc: "No clubs found" });
  } else {
    res.send({ status: true, data: clubs });
  }
};
