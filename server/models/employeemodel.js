const mongoose=require('mongoose');

const employeeSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    option:{
        type:String,
        required:true
    }
});

const employmentmodel=mongoose.model('RecruitmentRegister',employeeSchema);
module.exports={mongoose,employmentmodel};