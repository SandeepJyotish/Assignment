const axios=require('axios');

exports.homeRoutes=(req,res)=>{
    res.render('SignUp&SignIn');
}
exports.sign_up=(req,res)=>{
    res.render("signup");
}
exports.sign_in=(req,res)=>{
    res.render('signin')
}
//Show All accounts//
exports.Index_Acc=(req,res)=>{
    axios.get('http://localhost:3000/api/acc')
    .then(function(response){
        //console.log (response.data);
        res.render("IndexAcc",{users:response.data});
    })
    .catch(err=>{
        res.status(500).send(err);
    })
   
}
exports.add_Acc=(req,res)=>{
    res.render("addnewAc");
}
//Edit user Accoutnt//
exports.edit_Acc=(req,res)=>{
    axios.get('http://localhost:3000/api/acc?',{params:{_id:req.query._id}})
    
    .then(function(userdata){
        res.render('editnewAc',{user:userdata.data})
    })
    .catch(err=>{
        res.send(err)
    })
}
   
//@  Transactions
//
// All transactions
exports.all_trans=(req,res)=>{
    axios.get('http://localhost:3000/api/trans')
    .then(function(respdata){
        //console.log (response.data);
        res.render('Transaction',{users:respdata.data});
    })
    .catch(err=>{
        res.status(500).send(err);
    })
   
}
//Add a transactions.
exports.add_trans=(req,res)=>{
    res.render('add_trans');
}

//Edit transactions
exports.edit_trans=(req,res)=>{
    axios.get('http://localhost:3000/api/trans?',{params:{_id:req.query._id}})
    
    .then(function(userdata){
        res.render('edit_trans',{used:userdata.data})
    })
    .catch(err=>{
        res.send(err)
    })
    
}


