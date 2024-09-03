const express = require('express'); 
const {AddtoCartController, getCartController, removeformcartController} = require('../Controllers/CartController');
const { requireSignIn } = require('../Middlewares/authMiddlewares');

const router = express.Router();


router.post('/add-to-cart',requireSignIn,AddtoCartController);
// router.get('/get-cart',requireSignIn,getCartController);
router.put('/remove-from-cart',requireSignIn,removeformcartController);



module.exports = router;