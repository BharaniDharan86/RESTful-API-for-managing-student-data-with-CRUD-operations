const { query } = require("express");
const Student = require("../model/studentModel");

exports.getAllStudents = async (req, res) => {
  const { page, limit, fields, sort, ...reqObj } = req.query;

  let queryString = JSON.stringify(reqObj);
  queryString = queryString.replace(
    /\b(lte|lt|gte|gt)\b/g,
    (match) => `$${match}`
  );

  try {
    const query = Student.find(JSON.parse(queryString));

    if (sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query.sort(sortBy);
    }

    if (fields) {
      const field = req.query.fields.split(",").join(" ");
      query.select(field);
    }

    const students = await query;
    res.status(200).json({
      status: "Success",
      results: students.length,
      students,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Something Went Wrong",
      data: error,
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const studentById = await Student.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      students: studentById,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Something Went Wrong",
      data: error,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json({
      status: "Success",
      message: "Created New Student",
      data: newStudent,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Something Went Wrong",
      data: error,
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      status: "success",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Something Went Wrong",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "Success",
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Cannot able to delete",
    });
  }
};
