const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const studentRouter = require("./routes/studentRouter");

app.use(express.json());
app.use(morgan("dev"));

const DBURL = process.env.DATABASE;

mongoose.connect(DBURL).then(() => console.log("Connected"));

app.use("/api/v1/student", studentRouter);

module.exports = app;
