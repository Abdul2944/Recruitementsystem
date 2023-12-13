const express=require('express');
const router=express.Router();
const path = require('path');
const dir = path.join(__dirname, '../../../PROJECT/frontend');
//use to create a token which consist of id,username and password
const jwt=require('jsonwebtoken');

const {employmentmodel}=require('../models/employeemodel.js');
const employeejobmodel = require('../models/employeejobpostmodel.js');

var username='';
router.use(express.urlencoded({extended:true}));

router.use(express.json());



router.get('/employerRegister',(req,res)=>{{
    res.render(dir+'/views/html/employerregister.ejs',{option1:'Employer',option2:'Joinee'});
}});

router.post('/employerRegister',async (req,res)=>{{
    const body=req.body;

    console.log(body);
    const regex='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
   
    const errors=[];
    if(body)
    {
            if(!regex.match(body.email))
            {
                errors.push('email not valid!');
            }
            if(body.password!=body.confirmpassword)
            {
                errors.push('password does not match');
                res.json({message:errors});
                return;
            }
            const user=new employmentmodel(body);
            
            user.save().then(e=>res.json('Registered successfully')).catch(e=>res.json('Already registered! Please Login!'));
    }
}});

//route to login for employee register
router.get('/employeeRegister',(req,res)=>{{
    res.render(dir+'/views/html/employerregister.ejs',{option1:'Joinee',option2:'Employer'});
}});

//route to login for employee
router.get('/employeelogin',(req,res)=>{{
    res.render(dir+'/views/html/employeelogin.ejs');
}});


//employee login route
router.post('/employeelogin',async (req,res)=>{
    const body=req.body;
    const regex='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
    const email=body.email;
    if(body){
     
        if(!email.match(regex))
        {
            res.json('email not valid!');
            return;
        }
        const user=await employmentmodel.findOne({email:body.email});
        if(!user)
        {
            res.json('email not found! Register first!');
            return;
        }
        if(user)
        {
            if(user.password!=body.password)
            {
                res.json('Password not match! Please verify your password!');
                 return;
            }
            username=user.name;
            const token=jwt.sign({id:user.name,email:user.email,option:user.option},process.env.JSON_SECRET);
            if(user.option=='Employer')
            {
                res.cookie('token',token,{httpOnly:true});
                res.redirect('/joining/profile');
            }
          
            else
            {
                res.cookie('token',token,{httpOnly:true});
                res.redirect('/joining/profile');
            }
            
        }
    }
});

function checkforcookie(req,res,next)
{
    const token=req.cookies.token;
    if(!token)
    {
        return res.send('Unauthorised login! Please login again!');
    }
    next();
}
router.get('/profile',checkforcookie,(req,res)=>{
    const token=req.cookies.token;
   
    if(token)
    {
        const user=jwt.verify(token,process.env.JSON_SECRET);
        if(user)
        {
            if(user.option=='Joinee')
            res.redirect('/joining/jobpostview');
            else
            res.redirect('/joining/jobpostform');
        }
        else
        res.json('Unable to find the user');
       
    }
    else
    res.json('Authentication failed!');
});
//route to form for employers to post job
router.get('/jobpostform',(req,res)=> {
    res.render(dir+'/views/html/employerjobposting.ejs',{employername:username});
});

router.post('/jobpostform',checkforcookie,async (req,res)=> {
    const body=req.body;
    if(body)
    {
        const {jobtitle,jobdescription,companyname,location,jobtype,industryname,skills,contactinformation,experiencelevel}=body;
        const jobpost=await employeejobmodel.create({
            jobtitle:jobtitle,
               jobdescription:jobdescription,
               companyname:companyname,
               location:location,
               jobtype:jobtype,
               industryname:industryname,
               skillandqualificationrequired:skills,
               experiencelevel:experiencelevel,
               contactinformation:contactinformation,
               dataposted:Date.now(),
        });
        if(jobpost)
        {
            res.render(dir+'/frontend/views/html/jobpostingmessage.ejs');
        }
        else
        {
            res.json('Error found');
        }
    }
    else
    res.json('Error found');
});

//all job post view page route
router.get('/jobpostview',checkforcookie,async (req,res)=> {
    const allposts=await employeejobmodel.find({});
    res.render(dir+'/views/html/employeejobpostviews.ejs',{employeename:username,data:allposts});
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/joining/employeelogin');
});

module.exports=router;