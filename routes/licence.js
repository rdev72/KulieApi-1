const { Router } = require('express');
const express = require('express')
const userSchema = require('../models/userSchema')
const licenceSchema = require('../models/licenceSchema')
const router = express.Router()
const {transporter,mailOptions1,mailOptions2} = require('../helpers/nodemailer')


router.post("/add", (req, res) => {
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
          .then(info =>
              res.status(201).json({
                  message: "Handling POST request to /add",
                  createdLicence: { licenceData },
                  info: 'Email sent: ' + info.response
                }) )//{console.log('Email sent: ' + info.response)}
        })
  
        .catch(err => 
          console.log(err)
        //   res.status(500).json({ error: err })
          );
    }
    else{
      transporter.sendMail(mailOptions2)
      .then(info =>
          res.status(202).json({
              message:'Your application is rejected for licence',
              info: 'Email sent: ' + info.response
          })) 
       }})
    .catch(err => res.status(500).json({ error: err })); 
});
  
router.get("/read", (req, res) => {
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
  
router.patch("/update/:id", (req, res) => {
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
module.exports = router