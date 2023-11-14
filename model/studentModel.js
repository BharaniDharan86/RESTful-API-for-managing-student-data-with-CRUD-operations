const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require,
  },
  regId: {
    type: Number,
    unique: true,
  },
  department: {
    type: String,
    require,
  },
  yearOfPassOut: {
    type: Number,
    require,
  },
  cgpa: {
    type: Number,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
