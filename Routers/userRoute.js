// import express from "express";
// import { login, register } from "../Controllers/userControllers.js";
// const router =  express.Router();

// router.post('/register',register);
// router.post('/',login);


// export default router




const express = require("express");
const { loginUser, registerUser, } = require("../Controllers/userControllers.js");

const router  = express.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);


module.exports = router ;