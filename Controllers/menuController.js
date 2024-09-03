const menuModel = require('../Models/MenuModel');
const cloudinary = require('cloudinary');
const redis = require('../Config/RedisConfig')
const addFoodController = async(req,res)=>{
    try{
        const {name , categoryid , description , price , size} = req.body;
        if(!name || !categoryid){
            return res.status(200).send({success : true , message : "Name and category is not Defined"});
        }
        if(!description || !price || !size){
            return res.status(400).send({
                success : false,
                message : "please enter all fields"
            })
        };

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(200).send({
                success : false,
                message : "Food Image Not received"
            })
        }

        const {image} = req.files;

        if(!image){
            return res.status(400).send({success : false, message : "Image not provided"});
        }
        const allowedFormats =  ["image/png", "image/jpeg", "image/webp","image/jpg"];
        if(!allowedFormats.includes(image.mimetype)){
            return res.status(400).send({
                success :false,
                message : "Please enter a png or jpg or webp image"
            })
        }

        const cloudinaryresponse = await cloudinary.uploader.upload(image.tempFilePath);
        if(!cloudinaryresponse){
            return res.status(400).send({
                success : false,
                message : "Image not sent successfully"
            })
        }

        await redis.del(`products${categoryid}`);
        // console.log(`products${categoryid}`);

        const addedmenu= await new menuModel({
            name ,
            category : categoryid,
            description,
            image : {
                public_id : cloudinaryresponse.public_id,
                url : cloudinaryresponse.secure_url
            },
            price,
            size
        }).save();

        return res.status(201).send({
            success : true ,
            message : "Food Added successfully",
            menu : addedmenu
        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in addFoodController",
            error,
        })
    }
};

const deletemenuController = async(req,res)=>{
    try{
        const id = req.params.id;
        // id of menu
        const deletemenu = await menuModel.findByIdAndDelete(id).lean();
        const categoryid = deletemenu.category;

        await redis.del(`products${categoryid}`);
        // console.log(`products${categoryid}`);


        return res.status(200).send({
            success : true, message : "successfully delete", deletemenu
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of deleteMenusController",
            error,
        })
    }
}

const getallFoodController = async(req,res)=>{
    try{//get food by category id
        const id = req.params.id;//id of category
        const isExist = await redis.exists(`products${id}`);
        if(isExist){
            const getproducts = await redis.get(`products${id}`);
            const foods = JSON.parse(getproducts);
            // console.log('foods');
            return res.status(200).send({
                success : true,
                message : "Successfully recieved all foods",
                menus : foods
            })
        }
        const menus = await menuModel.find({category : id});

        await redis.set(`products${id}`, JSON.stringify(menus));
        return res.status(200).send({
            success : true,
            message : "Server side error in case of getallFoodController",
            menus
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({success : false , message : "Server side error in case of getallFoodController"});
    }
}

const AdminallFoodController = async(req,res)=>{
    try{
        const Foods = await menuModel.find({}).populate("category");
        return res.status(200).send({
            success : true,
            message : "Successfully received food",
            Foods
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of getallFoodController",
            error,
        })
    }
}

const getFoodbyidController = async(req,res)=>{
    try{
        const id = req.params.id;
        const food = await menuModel.findById(id).populate("category");
        //findById always returns an object 
        //find({}) return array of objects
        return res.status(200).send({
            success : true, Food : food
        })
    }catch(error){
        console.log(error);
        return res.status(200).send({
            success : false, message : "Server side error in case of getFoodbyidCOntroller",error
        })
    }
}

const getTopratedfoodController = async(req,res)=>{
    try{
        const isExist = await redis.exists('topratedfood');
        if(isExist){
            const data = await redis.get('topratedfood');
            const foods = JSON.parse(data);
            return res.status(200).send({
                success : true,
                message : "Successfully received all topratedfood",
                products : foods
            })
        }
        const food = await menuModel.find({}).sort({averagerating : -1});
        const topRatedFoods = [];
        let count = 0;
        for(let i=0;i<food.length;i++){
            if(food[i].averagerating >= 4){
                topRatedFoods.push(food[i]);
                count++;
                if(count >= 4)break;
            }
        }

        await redis.set('topratedfood', JSON.stringify(topRatedFoods));
        return res.status(200).send({
            success : true,
            message : "TopRated Products",
            products : topRatedFoods
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of getTopRatedFoodController",
            error
        })
    }
}
module.exports = {addFoodController,deletemenuController,getallFoodController,AdminallFoodController,getFoodbyidController
    ,getTopratedfoodController
};