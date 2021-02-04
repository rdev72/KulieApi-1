const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    email:{type:String,require:true,unique:true},//,unique:true
    approve:{type:Boolean,require:true,default:false}
})
module.exports = mongoose.model('user',userSchema)