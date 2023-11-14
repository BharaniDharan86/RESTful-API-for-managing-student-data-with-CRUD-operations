const express = require("express");
const {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentById,
} = require("../controller/studentController");

const studentRouter = express.Router();

studentRouter.route("/").get(getAllStudents).post(createStudent);
studentRouter
  .route("/:id")
  .get(getStudentById)
  .patch(updateStudent)
  .delete(deleteStudent);

module.exports = studentRouter;
