const express = require('express');
const express = require('express')
const userSchema = require('../models/userSchema')
const router = express.Router()

// User create
router.post('/createUser',(req,res) => userSchema.create({email:req.body.email})
.then(user=>{
    res.status(201).json({
        message:'user Created for application',
        user:user.email
    })
})
.catch(err => res.status(500).json({ error: err }))
)

//User Approval
router.post('/userApprove',(req,res,next)=>{
    if(req.body.superAdminPassword == 'secretSuperKey') next();
    else res.status(401).json({
        message:'Invalid Admin Password'
    })
},(req,res)=>{userSchema.updateOne({email:req.body.email},{$set:{approve:true}})
.then(()=>res.json({message:'approved'})).catch(err => res.status(500).json({error: err}))})

module.exports = router