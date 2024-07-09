const ratingsmodel = require('../Models/ReviewsAndRatingsModel');

const CalAvgRat = async(id)=>{
    try{
        const allratings = await ratingsmodel.find({menuid : id});
        let ans = 0;
        let count = allratings.length;
        for(let i = 0;i<allratings.length ;i++){
            ans+=allratings[i].ratings;
        }
        let average = ans/count;
        return average;
    }catch(error){
        console.log(error);
        return 0;
    }
}

module.exports = CalAvgRat;