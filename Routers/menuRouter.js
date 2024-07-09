const express = require('express');
const { requireSignIn } = require('../Middlewares/authMiddlewares');
const { addFoodController, deletemenuController, getallFoodController, AdminallFoodController, getFoodbyidController, getTopratedfoodController } = require('../Controllers/menuController');
const router = express.Router();


router.post('/addFood',requireSignIn,addFoodController);// add Food 
router.delete('/deleteMenu/:id',requireSignIn,deletemenuController);//delete Menu
router.get('/allMenu/:id',getallFoodController);//get Menu wrt to category id (with respect to category)
router.get('/allFood',requireSignIn,AdminallFoodController);
router.get('/Food/:id',requireSignIn,getFoodbyidController);//single-Food
router.get('/toprated',requireSignIn,getTopratedfoodController);

module.exports = router;