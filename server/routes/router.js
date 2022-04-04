const express=require('express');
const route=express.Router();
const services=require('../services/render');
const controller=require('../controller/controller');
const signupModel=require('../model/signupmodel');
const mongoose=require('mongoose');


/**
 * @description home routes 
 * @method GET
 */
route.get('/',services.homeRoutes);

/**
 * @description signup routes 
 * @method GET
 */
route.get('/signup',services.sign_up);

/**
 * @description signin routes 
 * @method GET
 */
route.get('/signin',services.sign_in);
/**
 * @description Sign out routes 
 * @method GET
 */


/**
 * @description IndexAcc All account routes 
 * @method GET
 */
route.get('/IndexAcc',services.Index_Acc);

/**
 * @description Add new Account
 * @method GET
 */
route.get('/addnewAc',services.add_Acc);

/**
 * @description Edit Account
 * @method GET
 */
route.get('/editnewAc',services.edit_Acc);

/**
 * @description All Transactions
 * @method GET
 */
route.get('/trans',services.all_trans);
/**
 * @description Add Transactions
 * @method GET
 */
route.get('/add-trans',services.add_trans);

/**
 * @description Edit Transaction
 * @method GET
 */
route.get('/edit-trans',services.edit_trans);

//API//
route.post('/api/signup',controller.create);
route.post('/api/signin',controller.check);

route.post('/api/acc',controller.ac_create);
route.get('/api/acc',controller.find);
route.put('/api/acc/:id',controller.update);
route.delete('/api/acc/:id',controller.delete);
//@route the Trsansactions

route.post('/api/trans',controller.tr_create);
route.get('/api/trans',controller.tr_find);
route.put('/api/trans/:id',controller.tr_Update);
route.delete('/api/trans/:id',controller.tr_Delete);

module.exports=route;