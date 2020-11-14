import express from "express";
import data from "./data";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute"
import product from "./routes/productRoute"
// net start mongoDB

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true,
}).catch(error =>console.log(error.reason))
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/users",userRoute)
app.use("/api/products",product)

// app.get("/api/products/:id",(req,res)=>{
//     const productId = req.params.id;
//   const product = data.products.find(x=>x._id ==productId);
   
//   if(product){
//              return res.send(product);
//     }else{
//        return res.status(404).send({msg:"product Not Found"});
//   }
//     })


// app.get("/api/products",(req,res)=>{
//    return res.send(data.products);
// })
app.listen(5000,()=>{
    console.log("server is listening at http://localhost:5000");
})