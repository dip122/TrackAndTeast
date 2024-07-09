const CalAvgRat = require('../Helper/CalAvgRat');
const ratingsModel = require('../Models/ReviewsAndRatingsModel');
const menumodel = require('../Models/MenuModel');
const ratingsmodel = require('../Models/ReviewsAndRatingsModel');
const redis = require('../Config/RedisConfig');
const addRatingController = async(req,res)=>{
    try{
        const id = req.user.id;
        const foodid = req.params.id;//food id
        const {ratings,reviews} = req.body;

        const newRating = await new ratingsModel({
            userid : id,
            menuid : foodid,
            ratings,
            reviews
        }).save();

        const menu = await menumodel.findById(foodid);
        const rating = menu.ratings;
        const count = menu.count;
        const newRatings = rating + Number(ratings);
        const newCount = count+1;

        const averageratings =  newRatings/newCount

        const newmenu = await menumodel.findByIdAndUpdate(foodid,{
            ratings : newRatings,
            count : newCount,
            averagerating : averageratings
        }, {new : true})

        await redis.del('topratedfood');

        return res.status(200).send({success : true, message : "successfully rating update", newRating , newmenu});
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in addRatingController",
            error
        })
    }
}
const getreviewscontroller = async(req,res)=>{//for single food/menu all reviews
    try{
        const reviews = await ratingsmodel.find({menuid : req.body.id}).populate('userid');
        return res.status(200).send({
            success : true,
            message : "all reviews successfully got",
            reviews : reviews
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of getreviewcontrollers",
            error
        })
    }
}

const deleteratingscontroller = async (req, res) => {
    try {
        const { id, ratings, foodid } = req.body;

        // Find and delete the rating entry
        await ratingsmodel.findByIdAndDelete(id);

        // Find the menu item
        const menu = await menumodel.findById(foodid);
        

        // Check if menu exists
        if (!menu) {
            return res.status(404).send({
                success: false,
                message: "Menu item not found",
            });
        }

        const { ratings: oldTotalRatings, count } = menu;
        const newCount = count - 1;

        // Check if newCount is zero to prevent division by zero
        if (newCount <= 0) {
            return res.status(400).send({
                success: false,
                message: "Cannot have zero or negative count of ratings",
            });
        }

        const newRatings = oldTotalRatings - Number(ratings);

        const averageratings = newCount>0 ? newRatings/newCount : 0;

        // Update the menu item with new ratings and count
        await menumodel.findByIdAndUpdate(foodid, {
            ratings: newRatings,
            count: newCount,
            averagerating : averageratings
        }, { new: true });

        await redis.del('topratedfood');

        return res.status(200).send({
            success: true,
            message: "Successfully deleted the rating",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Server side error in case of deleteratingscontroller",
            error,
        });
    }
}

const getallreviewscontroller = async(req,res)=>{//for admin panel
    try{
        const reviews = await ratingsmodel.find({}).populate("menuid");
        return res.status(200).send({
            success : true,
            message : "Successfully received all the reviews",
            reviews : reviews
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of getallreviewscontroller",
            error
        })
    }
}

module.exports = {addRatingController,getreviewscontroller,
    deleteratingscontroller,getallreviewscontroller}