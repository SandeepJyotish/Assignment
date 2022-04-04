const mongoose=require('mongoose');
var userAcSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:{
            unique:true
        }
    },
    
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        index:{
            unique:true
        },
        match:/([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
    },
    Date:{
        type:Date,
        default:Date.now
    }
});
var accountModel=mongoose.model('Account',userAcSchema);
module.exports=accountModel;