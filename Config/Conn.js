const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{        });
        console.log("MongoDB successfully connected");
        console.log(`MongoDB is running at port ${conn.connection.port}`);
    }catch(error){
        console.log(error);
        console.log('mongoDB is not connected');
    }
};

module.exports  = connectDB;