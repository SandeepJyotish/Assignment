const mongoose=require('mongoose');
const accountModel=require("../model/Accounts");
var acTransSchema=new mongoose.Schema({
    
    selectAc:{
        type:String,
        required:true
    },
    TypeT:{
        type:String,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    Date:{
        type:String,
       required:true
    },
    Catagory:{
        type:String,
        required:true
    },
    Descp:{
        type:String,
        required:true,
        allowNull:false
    }

})
var transAcc=mongoose.model('tnsModel',acTransSchema);
module.exports=transAcc;