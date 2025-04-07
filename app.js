const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use("/files", express.static("files"));

// MongoDB connection
const mongoUrl = "mongodb+srv://Fridah:fridah2920@cluster0.jkavben.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, {
 useNewUrlParser: true,
})
.then(() => {
  console.log("Connected to database");
})
.catch((e) => console.log(e));

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
require("./pdfDetails");
const pdfSchema=mongoose.model("pdfDetails");

const upload = multer({ storage: storage })

app.post('/upload-files', upload.single('file'), async (req, res) => {
    if(!req.file) {
        return res.send({
            status: false,
            message: 'No file uploaded'
        })
    }

  const title=req.body.title;
  const regno=req.body.regno;
  const studentsName=req.body.studentsName
  const pdf=req.file.filename;
  
  try{
    await pdfSchema.create({
      title: title,
      pdf: pdf,
      studentsName: studentsName,
      regno:regno
    });

    return res.status(200).json({
      status: "ok",
      message: 'File uploaded successfully'
    })

  }catch (error) {
    return res.status(500).json({
        status: false,
        message: 'Error uploading file',
        error: error.message

    })}
    })
  
app.get('/get-files', async (req, res) => {
  try{
    pdfSchema.find({}).then(data=>{
      res.send ({ status: "ok",data: data})
    })
  }catch (error) {
    
  }

      })

// Basic API
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

// Start server
app.listen(5000, () => {
  console.log("Server Started");
});
