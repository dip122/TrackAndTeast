const express = require('express');
const app = express();
const path = require('path');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
const connectDB = require('./Config/Conn');
const Authrouters = require('./Routers/authrouter');
const Orderrouters = require('./Routers/orderrouter');
const categoryRouters = require('./Routers/categoryRoutes');
const menuRoutes = require('./Routers/menuRouter');
const contactRouters = require('./Routers/contactRoutes');
const ratingsRouters = require('./Routers/ratingsRouter');
const cartrouter = require('./Routers/cartrouter')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { Server } = require('socket.io');
const Emitter = require('events')
const port = 2065
// const Razorpay = require("razorpay");

// exports.instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET,
// });


dotenv.config();
connectDB();

//config the cloudinary
cloudinary.v2.config({
    cloud_name: process.env.cloudinary_client_name,
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_secretkey,
});

//Middlewares
app.use(express.json());//for json data passing
app.use(express.urlencoded({extended : true}));//for FormData passing
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );


app.use('/api/v1/auth',Authrouters);
app.use('/api/v1/order',Orderrouters);
app.use('/api/v1/category',categoryRouters);
app.use('/api/v1/menu',menuRoutes);
app.use('/api/v1/contact',contactRouters);
app.use('/api/v1/ratings',ratingsRouters);
app.use('/api/v1/cart',cartrouter)


// --------------------Deployment-------------------------
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1,'./frontend/build')))
    app.get('*',(req, res)=>{
        res.sendFile(path.resolve(__dirname1, './frontend', 'build', 'index.html'))
    });
}
else{
    app.get('*',(req, res)=>{
        res.send("API is running successfully.")
    });
}
// --------------------Deployment-------------------------

const server = app.listen(process.env.PORT || port,()=>{
    console.log(`Running at port ${port}`);
})

const eventEmitter = new Emitter();
app.set('eventEmitter',eventEmitter);



//socket is running on my server default 
const io = new Server(server,{
  pingTimeout : 60000,
  cors : {
    origin : [process.env.FRONTEND_URL],
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
  }
});


io.on('connection',(socket)=>{
  //join  .... for each order there will be a private room....if a order changes we have to notify that order only

  socket.on('setup',(OrderId)=>{
    socket.join(OrderId);
    socket.emit('Connected');
  })

})
//ddd

eventEmitter.on('OrderUpdated',(data)=>{
  io.to(`order_handle`).emit('OrderUpdated', data);
})

