const express = require("express");
const app = express(); // initialize express
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload')

const user = require('./routes/user')
const licence= require('./routes/licence')


const PORT = 3000;

//For mongoose
mongoose.connect("mongodb://localhost:27017/Kuliekb", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once("open", () => console.log("mongo connected"));
db.on("error", err => console.log(err));

// Morgan & body-Parser
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//for File Upload
app.use(fileUpload({useTempFiles : true,tempFileDir : '/tmp/'}));



// For Routes
app.use('/user',user)
app.use('/licence',licence)



app.get("/", (req, res) => res.send("Hello Kuliee"));


app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`)
);
