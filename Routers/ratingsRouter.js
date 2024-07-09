const express = require('express');
const { requireSignIn } = require('../Middlewares/authMiddlewares');
const { addRatingController, getaverageratingsController, getTopTrendingController, getreviewscontroller, deleteratingscontroller, getallreviewscontroller } = require('../Controllers/RatingsController');
const router = express.Router();


router.post('/add-rating/:id',requireSignIn,addRatingController);
router.post('/getratings',requireSignIn ,getreviewscontroller);
router.post('/delete',requireSignIn,deleteratingscontroller);
router.get('/getallreviews',requireSignIn,getallreviewscontroller);


// router.get('/getaverageratings/:id',requireSignIn,getaverageratingsController);
// router.get('/Top-trending',requireSignIn,getTopTrendingController);
module.exports = router;