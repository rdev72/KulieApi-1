const mongoose= require('mongoose')

const licenceSchema = mongoose.Schema({
    email:{type:String,require:true,unique:true},//,unique:true
    description:{type:String},
    companyName:{type:String,require:true}, // One company may have 2 licence
    licenceKey:{type:String,require:true,unique:true},//,unique:true
    expiryDate:{type:String,require:true}
})
module.exports = mongoose.model('licence',licenceSchema)