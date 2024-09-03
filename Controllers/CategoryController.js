const categorymodel = require('../Models/CategoryModel');
const menuModel = require('../Models/MenuModel');
const usermodel = require('../Models/Usermodel');
const redis = require('../Config/RedisConfig')

const addcategoryController = async(req,res)=>{
    try{
        const id = req.user.id;
        const user = await usermodel.findById(id);
        if(user.role === false){//user is not admin
            return res.status(200).send({
                success : false,
                message : "You are not admin"
            })
        }

        const {name} = req.body;
        if(!name){
            return res.status(400).send({success : false});
        }
        const category = new categorymodel({
            name : name
        });

        const savedcategory = await categorymodel.insertMany([category])

        await redis.del('categories');

        return res.status(201).send({success : true,savedcategory});
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of addCategoryController",
            error,
        })
    }
};

const deletecategoryController = async(req,res)=>{
    try{
        const id = req.params.id;//id of the category
        const deletedCategory = await categorymodel.findByIdAndDelete(id);//category is removed

        const deletedFoods = await menuModel.deleteMany({category : id});//all foods under the current category is removed

        await redis.del('categories')

        return res.status(200).send({
            success : true,
            message : "Category deleted successfully",
            deletedCategory,
            deletedFoods
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of deleteCategoryController",
            error,
        })
    }
}

const updatecategoryController = async(req,res)=>{
    try{
        const id = req.params.id;
        const category = await categorymodel.findByIdAndUpdate(id,{ name : req.body.name }, {new : true});
        return res.status(200).send({
            success : true,
            message : "All category is updated",
            category,
        })
    }catch(error){
        console.log(error);
        return res.status(200).send({
            success : false,

        })
    }
}

const getallcategorycontroller = async(req,res)=>{
    try{
        const isExists = await redis.exists('categories');
        if(isExists){
            // console.log('get category from cache');
            const categories = await redis.get('categories');
            const parsecategories = JSON.parse(categories)
            return res.status(200).send({
                success : true,
                message : "Successfully received all categories",
                getallcategory : parsecategories
            })
        }
        const getallcategory = await categorymodel.find({});

        await redis.set('categories',JSON.stringify(getallcategory))
        return res.status(200).send({
            success : true,
            message : "Successfully we have got all category",
            getallcategory
        })
    }catch(error){
        console.log(error);
        return res.status(200).send({
            success : false,
            message : "Server side error in case of getallcategorycontroller",
            error
        })
    }
}

module.exports = {addcategoryController,deletecategoryController,updatecategoryController,getallcategorycontroller}