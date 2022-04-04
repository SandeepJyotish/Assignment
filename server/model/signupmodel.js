const mongoose=require('mongoose');
var userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    email:{
        type:String,
        required:true,
        index:{
            unique:true
        },
        match:/([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    Date:{
        type:Date,
        default:Date.now
    }
});
var signupModel=mongoose.model('signup',userSchema);
module.exports=signupModel;