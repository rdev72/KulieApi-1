const express = require("express");
const app = express(); // initialize express
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload')
var nodemailer = require('nodemailer');

const licenceSchema = require("./models/licenceSchema");
const userSchema = require("./models/userSchema");

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

//for Node Mailer
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rohandev.dev74@gmail.com',
    pass: 'Devroh@n9080'
  }
});
// Accept mail
var mailOptions1 = {
  from: '"rohan" <rohandev.dev74@gmail.com>',
  to: 'rohandev.dev72@gmail.com',
  subject: 'Mail for Application',
  text: 'your application is accepted for licence'
};
//reject mail
var mailOptions2 = {
    from: '"rohan" <rohandev.dev74@gmail.com>',
    to: 'rohandev.dev72@gmail.com',
    subject: 'Mail for Application',
    text: 'your application is accepted for licence'
  };






app.get("/", (req, res) => res.send("Hello Kuliee"));

app.post('/createUser',(req,res) => userSchema.create({email:req.body.email})
.then(user=>{
    res.status(201).json({
        message:'user Created for application',
        user:user.email
    })
})
.catch(err => res.status(500).json({ error: err }))
)


app.post('/userApprove',(req,res,next)=>{
    if(req.body.superAdminPassword == 'secretSuperKey') next();
    else res.status(401).json({
        message:'Invalid Admin Password'
    })
},(req,res)=>{userSchema.updateOne({email:req.body.email},{$set:{approve:true}})
.then(()=>res.json({message:'approved'})).catch(err => res.status(500).json({error: err}))})


app.post("/licence/add", (req, res) => {
  userSchema.findOne({email:req.body.email,approve:true}).select('approve').then(user=>{
    //AndDelete
    if(user.approve){
        licenceSchema.create({
        email: req.body.email,
        description: req.body.description,
        companyName: req.body.companyName,
        licenceKey: req.body.licenceKey,
        expiryDate: req.body.expiryDate
      })
      .then(licenceData => {
        console.log(licenceData);
       // send mail : your application is accepted for licence
        transporter.sendMail(mailOptions1)
        res.status(201).json({
          message: "Handling POST request to /add",
          createdLicence: { licenceData },
        });
      })
      .then(info => {console.log('Email sent: ' + info.response),
      res.status(201).json({
        message: 'email sent'+ info.response,
      })
        })
      .catch(err => res.status(500).json({ err: err }));
  }
  else{res.status(404).json({message:'Your application is rejected for licence'})}
  }) 
});

app.get("/licence/read", (req, res) => {
  licenceSchema
    .find()
    .exec()
    .then(allLicenceData => {
      res.status(200).json({
        message: "Handling GET request to /read",
        allLicenceData: { allLicenceData }
      });
    })
    .catch(err => res.status(500).json({ err: err }));
});

app.patch("/licence/update/:id", (req, res) => {
  let toUpdate = {};
  req.body.licence ? toUpdate["licence"] = req.body.licence : "";
  req.body.expiryDate ? toUpdate["expiryDate"] = req.body.expiryDate : "";

  licenceSchema
    .findByIdAndUpdate(req.params.id , { $set: toUpdate })
    .exec()
    .then(updatedLicence => {
      res.status(200).json({
        message: "Handling PATCH request to /update",
        updatedLicence: { updatedLicence }
      });
    })
    .catch(err => res.status(500).json({ err: err }));
});


app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`)
);
