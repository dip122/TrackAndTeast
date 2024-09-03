const express = require('express'); 
const { requireSignIn } = require('../Middlewares/authMiddlewares');
const { placeordercontroller, listorderscontroller, orderbyuseridcontroller, statusupdatecontroller, verifyordercontroller, orderbyidcontroller } = require('../Controllers/ordercontroller');
const router = express.Router();


router.post('/place-order',requireSignIn,placeordercontroller);//order placed by user
router.post('/verify-order',verifyordercontroller);//admin panel 
router.get('/getallorders',listorderscontroller);//for admin panel
router.get('/orderbyuserid',requireSignIn,orderbyuseridcontroller);//order of current user
router.put('/status-update/:id',requireSignIn,statusupdatecontroller);//admin panel
router.get('/orderbyid/:id',requireSignIn,orderbyidcontroller);//order by id controller

module.exports = router;