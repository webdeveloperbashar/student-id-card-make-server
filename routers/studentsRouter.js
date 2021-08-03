const express = require("express");
const { Student } = require("../models/students");
const router = express.Router();

const studentList = async (req, res) => {
  const studentList = await Student.find().sort({ _id: -1 });
  res.send(studentList);
};

const newStudent = async (req, res) => {
  const { name, age, section, presentDay, id } = req.body;
  const student = new Student(req.body);
  try {
    if (!id) {
      const result = await student.save();
      res.send(result);
    }
     else if (id) {
      const students = await Student.findOneAndUpdate(
        { _id: id },
        { $set: { name, age, section, presentDay } },
        { new: true, useFindAndModify: false }
      );
      res.send(students);
    }
  } catch (err) {
    const errMsgs = [];
    for (field in err.errors) {
      errMsgs.push(err.errors[field].message);
    }
    return res.status(400).send(errMsgs);
  }
};

const studentDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    res.send(student);
  } catch (error) {
    return res.status(400).send("Id NOT FOUND");
  }
};

// const studentUpdate = async (req, res) => {
//   const id = req.params.id;
//   const updateData = req.body;
//   try {
//     const student = await Student.findByIdAndUpdate(id, updateData, {
//       new: true,
//       useFindAndModify: false,
//     });
//     res.send(student);
//   } catch (error) {
//     return res.status(400).send("Id NOT FOUND");
//   }
// };

const studentDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByIdAndDelete(id);
    res.send(student);
  } catch (error) {
    return res.status(400).send("Id NOT FOUND");
  }
};

router.route("/").get(studentList).post(newStudent);

router.route("/:id").get(studentDetail).delete(studentDelete);

module.exports = router;
