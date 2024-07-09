const usermodel = require("../Models/Usermodel");


const AddtoCartController = async(req,res)=>{
    try{
        const id = req.user.id;
        const {ItemId} = req.body;
        const user = await usermodel.findById(id);
        const cartData = await user.cartData;
        if(!cartData[ItemId]){
            cartData[ItemId] = 1;
        }else{
            cartData[ItemId]++;
        }

        const updateduser = await usermodel.findByIdAndUpdate(id,{cartData : cartData},{new : true});
        return res.status(200).send({
            success : true,
            message : "Successfully added to cart",
            updateduser : updateduser
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({success : false, message :"Server side error in case of add-to-cart controller",error})
    }
}

// const getCartController = async(req,res)=>{
//     try{
//         const id = req.user.id;
//         const user = await usermodel.findById(id);
//         const cartData = await user.cartData;
//         return res.status(200).send({success : true , message : "Successfully got the cart data",cartData});
//     }catch(error){
//         console.log(error);
//         return res.status(500).send({
//             success : false, message : "Server side error in case of getcartcontroller",error
//         })
//     }
// }

const removeformcartController = async(req,res)=>{
    try{
        const {ItemId} = req.body;
        const id = req.user.id;
        // console.log(id
        const user = await usermodel.findById(id);
        // console.log(ItemId)
        const cartData = await user.cartData;
        if(cartData[ItemId] > 0){
            cartData[ItemId]--;
        }
        const updatedcart = await usermodel.findByIdAndUpdate(id,{cartData : cartData},{new : true});
        return res.status(200).send({
            success : true ,
            message : "Removed from cart",
            cartData : updatedcart
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({success : false , message : "Server side error in case of removeformcartcontroller",error});
    }
}

module.exports = {AddtoCartController,removeformcartController};