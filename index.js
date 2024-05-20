// import express from "express";
// import dotenv from "dotenv";
// import userRoute from './Routers/userRoute.js';
// import { connectDB } from "./middleware/Database.js";


// // import employeeRoute from './Routers/employeeRoute.js'

// const app = express();
// app.use(express.json())

// dotenv.config();


// connectDB();





// app.use('/api/user/',userRoute);
// // app.use('/api/employee/',employeeRoute)

// const PORT = process.env.PORT || 4002


// app.listen(PORT,()=> console.log(`server running at ${PORT} `));


const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require('./middleware/Database.js');
const userRoute = require('./Routers/userRoute.js');
const employeeRoute = require('./Routers/employeeRoute.js')
const companyRoute = require('./Routers/companyRoute.js')


const app = express()

app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());

app.use(cors());
dotenv.config();

connectDB()

app.use('/users',userRoute);
app.use('/employee',employeeRoute);
app.use('/company',companyRoute);


const PORT = process.env.PORT || 5764

app.listen(PORT,()=> console.log(`Server running at ${PORT}`));