const express = require('express');
const { requireSignIn } = require('../Middlewares/authMiddlewares');
const { addcategoryController, deletecategoryController, updatecategoryController, getallcategorycontroller } = require('../Controllers/CategoryController');
const router = express.Router();

router.post('/add-category',requireSignIn,addcategoryController);
router.delete('/delete-category/:id',requireSignIn,deletecategoryController);
router.put('/update-category',requireSignIn,updatecategoryController);
router.get('/all-category',getallcategorycontroller);


module.exports = router;