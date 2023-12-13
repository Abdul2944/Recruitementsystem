const mongoose=require('mongoose');

const employeepostSchema=mongoose.Schema({
   jobtitle:{
    type:String,
    required:true,
   },
   jobdescription:{
    type:String,
    required:true,
   },
   companyname:{
    type:String,
    required:true,
   },
   location:{
    type:String,
    required:true,
   },
   jobtype:{
    type:String,
    required:true,
   },
   industryname:{
    type:String,
    required:true,
   },
   skillandqualificationrequired:{
    type:String,
    required:true,
   },
   experiencelevel:{
    type:String,
    required:true,
   },
   contactinformation:{
    type:Number,
    required:true,
   },
   dataposted:{
    type:Date,
    default:Date.now()
   }
});
const employeejobmodel=mongoose.model('employeepostmodel',employeepostSchema);
module.exports=employeejobmodel;