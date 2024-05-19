const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();


const URL = process.env.MONGO_URL;


const client = new MongoClient (URL);


exports. connectDB = async() =>{
    try {
        await client.connect();
        console.log("MongoDB Connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


process.on('SIGINT', () => {
    client.close().then(() => {
        console.log('MongoDB Atlas connection closed');
        process.exit(0);
    }).catch(err => {
        console.error('Error closing MongoDB Atlas connection:', err);
        process.exit(1);
    });
})
