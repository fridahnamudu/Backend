const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    pdf: String,
    title: String,
    studentsName: String,
    regno: String,
},{collection:"pdfDetails"});

mongoose.model("pdfDetails", pdfSchema);