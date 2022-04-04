const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyparser=require('body-parser');
const path=require('path');
const connectdb=require('./server/database/connections');

const app=express();
dotenv.config({path:'config.env'});
const port=process.env.PORT;

app.use(morgan('tiny'));
//connections//
connectdb();
app.use(bodyparser.urlencoded({extened:true}));

//set View engine
app.set("view engine",'ejs');
//app.set("views",)

//load my assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));

app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
//Load router file
app.use('/',require('./server/routes/router'))

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})