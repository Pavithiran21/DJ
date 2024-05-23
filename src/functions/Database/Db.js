const { MongoClient } = require("mongodb");



let connectDB = async() =>{
    try{
        let connection = await MongoClient.connect(process.env.MONGODB_URL);
        console.log("MongoDB is connected Successfully!!!");
        return connection
    }
    catch(err){
        console.log("Unable to connect MongoDB",err);

    }
    
}

module.exports.connectDB = connectDB;