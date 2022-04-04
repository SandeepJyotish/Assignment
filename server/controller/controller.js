const mongoose=require('mongoose');
const signupModel=require('../model/signupmodel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var session = require('express-session');
const accountModel=require('../model/Accounts');
const transAcc=require("../model/tnsModel");

//@signup//
exports.create=(req,res,next)=>{ 
    let username=req.body.username;
    let email=req.body.email;
    let phone=req.body.phone;
    let password=req.body.password;
    let reenter=req.body.reenter;
    //console.log("password= ",password," re=",reenter)
    if(reenter!==password){
        res.json({
            message:"Password Not Match!"
        });
    }

    else{
        bcrypt.hash(password, 10, function(err, hash) {
            if(err){
                return res.json({
                    message:"somthing wrong try later!",
                    error:err
                });
            }
            else{
                var userDetails=new signupModel({
                    username:username,
                    email:email,
                    phone:phone,
                    password:hash
                })
            
                userDetails.save(userDetails)
                .then(doc=>{
                   
                    res.redirect('/signin')
                })
                .catch(err=>{
                    res.json(err);
                    console.log(err);
                }) 

            }
        });
 
    }

}
//@signin//
exports.check=(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
   //console.log(req.body.email,req.body.password);
    signupModel.find({email:email})
    .exec()
    .then(user=>{
        if(user.length<1){
            res.status(404).json({
                message:"authentication failed"
            })
        }
        else{
            bcrypt.compare(req.body.password, user[0].password,function(err,result) {
                if(err){
                    res.status(404).json({
                        message:"authentication failed"})
                }
                if(result){
                 var tokens=jwt.sign({
                        username:user[0].username,
                        email:user[0].email
                        },
                         'secret',
                         {
                            expiresIn:'1h'
                         } );
                    res.status(201).redirect('/IndexAcc')
                }
                else{
                    res.status(404).json({
                        message:"authentication failed"})
                }              
            })           
        }
    })
    .catch(err=>{
       res.status(500).json({
        error:err
       })
       
    })
}
//Logout//

//create an acount of user//
exports.ac_create=(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"content can not be empty!"
        });
        return;
    }
    //new user
    else{
        var acdetail=new accountModel({
            username:req.body.username,
            phone:req.body.phone,
            email:req.body.email
        })
    
        acdetail.save(acdetail)
        .then(data=>{   
           // res.send(data)
           res.redirect('/addnewAc')
        })
        .catch(err=>{
            res.json(err);
            console.log(err);
        }) 

    }
}
//find the all accounts//
exports.find=(req,res)=>{
    if(req.query._id){
        const id=req.query._id;
        accountModel.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message:"user not found"
                })
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    }
    else{
    accountModel.find()
    .then(user=>{
        res.send(user);
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    }
}
//Update the existing users//
exports.update=(req,res)=>{
    if(!req.body){
       return res.status(400).send({
            message:"content can not be empty!"
        });
    }
    const id=req.params.id;
    accountModel.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot Update user with ${id}.may be user not found`})
        }
        else{
           res.send(data)
           
        }
    })
    .catch(err=>{
    res.status(500).send({message:"Error Update user information"})
    })
    
}
//delete the accounts//
exports.delete=(req,res)=>{
    const id=req.params.id;
    accountModel.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).json({
                message:" data not found"
            })
        }else{
            res.send({message:"user was deleted successfully"})
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}



//@ Transactions

// create a transactions

exports.tr_create=(req,res)=>{
        if(!req.body){
            res.status(400).send({
                message:"content can not be empty!"
            });
            return;
        }
        //new user
        else{
            var trdetail=new transAcc({
                selectAc:req.body.selectAc,
                TypeT:req.body.TypeT,
                Amount:req.body.Amount,
                Date:req.body.Date,
                Catagory:req.body.Catagory,
                Descp:req.body.Descp
            })
        
            trdetail.save(trdetail)
            .then(data=>{   
               // res.send(data)
               res.redirect('/trans')
            })
            .catch(err=>{
                res.json(err);
                console.log(err);
            }) 
    
        }
    }
// All transactions
exports.tr_find=(req,res)=>{
    if(req.query._id){
        const id=req.query._id;
        transAcc.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message:"user not found"
                })
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    }
    else{
    transAcc.find()
    .then(user=>{
        res.send(user);
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    }
}
//edit transactions
exports.tr_Update=(req,res)=>
{
    if(!req.body){
        return res.status(400).send({
             message:"content can not be empty!"
         });
     }
     const id=req.params.id;
     transAcc.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
     .then(data=>{
         if(!data){
             res.status(404).send({message:`Cannot Update user with ${id}.may be user not found`})
         }
         else{
            res.send(data)
            
         }
     })
     .catch(err=>{
     res.status(500).send({message:"Error Update user information"})
     })
}
//delete transactions
exports.tr_Delete=(req,res)=>{
    const id=req.params.id;
    transAcc.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).json({
                message:" data not found"
            })
        }else{
            res.send({message:"user was deleted successfully"})
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}
