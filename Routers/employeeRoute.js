// import express from "express";
// import { AllEmployee, CreateEmployee, DeleteEmployee, UpdateEmployee, ViewEmployee } from "../Controllers/employeeControllers.js";
// import { authorizate, isAdmin } from "../middleware/verification";

// const router =  express.Router();



// router.post('/create-employee',authorizate,isAdmin,CreateEmployee);
// router.put('/edit-employee/:id',authorizate,isAdmin,UpdateEmployee);
// router.get('/all-employee/',authorizate,isAdmin,AllEmployee);
// router.delete('/delete-employee/:id',authorizate,isAdmin,DeleteEmployee);
// router.get('/view-employee/:id',ViewEmployee);


// export default router





const express = require("express");
const { createEmployee, listEmployees } = require("../Controllers/employeeControllers.js");
const router = express.Router();

router.post('/add-employee', createEmployee);
// router.post('/register',registerUser);
// router.post('/login',editEmployeeById);
router.get('/all-employee/',listEmployees);
// router.post('/login',deleteEmployee);
// router.post('/register',listEmployees);


module.exports = router