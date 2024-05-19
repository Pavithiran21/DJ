const express = require('express');
const userRoute = require('./Controllers/userController.js');
// const employeeRoute = require('./Controllers/employeeCounter.js');

const app = express()

app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());


const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require('./Middleware/Db');


app.use(cors());
dotenv.config();

connectDB();

app.use('/users',()=> userRoute);
// // app.use('/employee',employeeRoute);



const PORT = process.env.PORT || 5764

app.listen(PORT,()=> console.log(`Server running at ${PORT}`));