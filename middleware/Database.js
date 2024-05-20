// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// export const ConnectDB = () =>{
//     // mongoose.connect(process.env.URL)
//     // .then(()=>{
//     //     console.log("MongoDB is Connected")
//     // })
//    const URI = process.env.MONGO_URL;
//     mongoose.connect(URI).then(()=>{
//         console.log("MongoDB is Connected")
//     })
        
    
    
// }

// import { MongoClient } from "mongodb";

// const URI = process.env.MONGO_URL;

// export const connectDB = async() =>{

//     const client = new MongoClient(URI);
//     try{
//         await client.connect();
//         console.log("MongoDB is Connected!!!!")

//     }
//     catch(err){
//         console.log(err);

//     }
// }




const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

exports. connectDB = async() =>{
    try {
        let connect = await MongoClient.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected successfully");
        return connect
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// exports.DB = async(req,res) =>{
//     req.client = client;
//     next();
// }

// exports.getDB = async() =>{
//     console.log(client);
//     return client;
// }


// process.on('SIGINT', () => {
//     client.close().then(() => {
//         console.log('MongoDB Atlas connection closed');
//         process.exit(0);
//     }).catch(err => {
//         console.error('Error closing MongoDB Atlas connection:', err);
//         process.exit(1);
//     });
// })