const express = require('express'); //
const { registercontroller, logincontroller, getallusercontroller, 
    changepasswordcontroller, changeaddresscontroller, forgetpasswordcontroller, 
    resetpasswordcontroller} = require('../Controllers/authcontroller');
    
const { requireSignIn, requireSignInAsAdmin } = require('../Middlewares/authMiddlewares');
const router = express.Router();

router.post('/register',registercontroller);
router.post('/login',logincontroller);
router.get('/getuser',requireSignIn,getallusercontroller);
router.post('/change-password',requireSignIn,changepasswordcontroller);
router.post('/change-address',requireSignIn,changeaddresscontroller);
router.post('/forget-password',forgetpasswordcontroller);
router.post('/resetpassword/:token',resetpasswordcontroller);



//testing
//admin test
router.get('/admin-auth',requireSignInAsAdmin,(req,res)=>{
    return res.status(200).send({'success' : true})
})
//user test
router.get('/user-auth',requireSignIn,(req,res)=>{
    return res.status(200).send({'success' : true})
})


module.exports = router;