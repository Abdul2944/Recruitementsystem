const express=require('express');
const dotenv=require('dotenv');
const router=require('../server/routes/router.js');
const app=express();
const {mongoose}=require('./models/employeemodel.js');
const cookieparser=require('cookie-parser');
dotenv.config({path:'../server/config.env'});

app.use(cookieparser());
mongoose.connect(process.env.MONGO_URI,{dbName:'RecruitmentDB'}).then(e=>console.log('Database Connected!')).catch(e=>console.log(e));

app.use('/joining',router);

process.chdir('C:/Users/abdul/Desktop/Project');

app.use(express.static(process.cwd()+'/frontend/views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render(process.cwd()+'/frontend/views/html/index.ejs');
});

app.listen(process.env.PORT || '2000',()=>console.log('connection established'));