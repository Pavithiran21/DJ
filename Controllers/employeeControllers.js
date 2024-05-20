// import Employee from '../Models/employeeModel.js';

const { connectDB } = require("../middleware/Database");

// export const CreateEmployee = async(req,res)=>{
//     try{
//         const {employeeName,employeeIdNo,DOB,Address,Salary,JoinDate,Experience} = req.body;

//         const employee = await Employee.findOne({employeeIdNo:employeeIdNo});
//         console.log(employee);
//         if(employee){
//             res.status(401).json({status:false,message:"Employee details  already created."});
//         }
//         else{
//             const newEmployee = new Employee({
//                 employeeName:employeeName,
//                 employeeIdNo:employeeIdNo,
//                 DOB:DOB,
//                 Address:Address,
//                 Salary:Salary,
//                 JoinDate:JoinDate,
//                 Experience:Experience
//             });
//             newEmployee.save();
//             console.log(newEmployee);
//             res.status(200).json({status:false,message:"Employee details Created Successfully"});


//         }
        
//     }
//     catch(err){
//         console.log(err);
//         res.status(404).json({ststus:false,message:"Internal Server Error"})
//     }
// }


// export const UpdateEmployee = async(req,res)=>{

//     try{
//         const {employeeName,employeeIdNo,DOB,Address,Salary,JoinDate,Experience} = req.body;

//         const oldemployee = await Employee.findOneAndUpdate({_id:req.params.id},{new:true});

//         if(oldemployee){
//             oldemployee.employeeName = employeeName,
//             oldemployee.employeeIdNo = employeeIdNo,
//             oldemployee.DOB = DOB,
//             oldemployee.Address = Address,
//             oldemployee.Salary = Salary,
//             oldemployee.JoinDate = JoinDate,
//             oldemployee.Experience = Experience,
//             oldemployee.updatedAt = Date.now()

//             oldemployee.save();
//             res.status(200).json({status:false,message:"Employee details Updated Successfully"});
//         }
//         else{
//             res.status(401).json({status:false,message:"Employee details cannot update. please try again"});
//         }
       


//     }
//     catch(err){
//         console.log(err);
//         res.status(404).json({ststus:false,message:"Internal Server Error"})
//     }
    
// }



// export const DeleteEmployee = async(req,res)=>{

//     try{
//         const employee = await Employee.findOneAndDelete({"id":req.params.id});
//         console.log(employee);
//         if(employee){
//             res.status(200).json({status:true,message:" Employee details can be deleted Successfully"})
//         }
//         else{
//             res.status(401).json({status:false,message:"Employee details  cannot be deleted. Please try again"});
//         }

//     }
//     catch(err){
//         console.log(err);
//         res.status(404).json({ststus:false,message:"Internal Server Error"})
//     }
    
// }


// export const ViewEmployee = async(req,res)=>{

//     try{
//         const viewemployee = await Employee.findOne({"id":req.params.id});
//         console.log(viewemployee);
//         if(viewemployee){
//             res.status(200).json({status:true,message:" Employee details can be viewed Successfully",data:viewemployee})
//         }
//         else{
//             res.status(401).json({status:false,message:"Employee details  cannot be viewed. Please try again"});
//         }

//     }
//     catch(err){
//         console.log(err);
//         res.status(404).json({ststus:false,message:"Internal Server Error"})
//     }
    
// }


// export const AllEmployee = async(req,res)=>{

//     try{
//         const employeelist = await Employee.find({});
//         if(employeelist){
//             res.status(200).json({status:true,message:"All Employeelist are shown Successfully",data:employeelist})
//         }
//         else{
//             res.status(401).json({status:false,message:"Employeelist cannot be shown. Please try again"});
//         }

//     }
//     catch(err){
//         console.log(err);
//         res.status(404).json({ststus:false,message:"Internal Server Error"})
//     }
    
// }


// import bcrypt from 'bcrypt';
// import JWT from 'jsonwebtoken';



// const salt =  bcrypt.genSaltSync(10);

// export const register = async(req,res) =>{
    
//     try{
//         const {firstname,lastname,email,password} = req.body;


//         const users = await db.collection("users").findOne({"email":email});
//         console.log(users); 
//         if(users){
//             res.status(401).json({status:"User Already exists",data:users})
//         }
//         else{
//             const user = db.collection("users").insertOne({
//                 firstname:firstname,
//                 lastname:lastname,
//                 email:email,
//                 password:await bcrypt.hash(password,salt)
//             })
//             user.isAdmin = true;
//             user.save();
//             console.log(user);
//             res.status(200).json({status:true,message:"User Registered Successfully"})
//         }
        

//         // const users = await User.findOne({"email":email});
//         // console.log(users);
//         // if(users){
//         //     res.status(401).json({status:false,message:"User Already Exists"});
//         // }
//         // else{
//         //     const user = new User();
//         //        user.firstname = firstname,
//         //         user.lastname = lastname,
//         //         user.email = email, 
//         //         user.isAdmin = true    // for admin  user is set as true
//         //        user.password = await bcrypt.hash(password,salt);

//         //     user.save();
//         //     console.log(user);
//         //     res.status(200).json({status:true,message:"User Registered Successfully",data:user})
//         // }
//     }
//     catch(err){
//         console.log(err);
//         res.status(404).json({ststus:false,message:"Internal Server Error"})
//     }
// };


// export const login = async(req,res)=>{
//     try{
//         const {email,password} = req.body;
//         const user = await User.findOne({email:email});
//         if(user){
//             const isPasswordMatched = await bcrypt.compare(password, user.password);
//             if(isPasswordMatched){
//                 const token = JWT.sign({
//                     id:user._id
//                 },
//                 process.env.JWT_TOKEN
//             )
//             console.log(token);
//             res.status(200).json({
//                 status:true,
//                 message:"User LoggedIn Successfully",data:user,user_token:token
//             })
//             } 
//             else{
//                 res.status(401).json({status:false,message:"Invalid email and Password. Please check it"});
//             }
            
//         }
//         else{
//             res.status(401).json({status:false,message:"User Cannot loggedin. Please check it"});
//         }

//     }
//     catch(err){
//         console.log(err);
//         res.status(404).json({ststus:false,message:"Internal Server Error"})
//     }
    


// }


function isNonEmptyString(str) {
    return str !== undefined && str !== null && str.trim() !== '';
}

// Function to validate email format
function isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate date format (dd/mm/yyyy)
function isValidDateFormat(date) {
    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateFormat.test(date);
}

exports.createEmployee = async (req, res, db) => {
    try {
        // Extract employee input from request body
        const { firstname, lastname, companyName, dob, employeeId, gender, email, joindate  } = req.body;

        // Check if all fields are provided and valid
        if (!firstname || !isNonEmptyString(firstname)) {
            return res.status(400).json({ status: false, message: "First name is required and must be a non-empty string" });
        }
        if (!lastname || !isNonEmptyString(lastname)) {
            return res.status(400).json({ status: false, message: "Last name is required and must be a non-empty string" });
        }
        if (!dob || !isNonEmptyString(dob)) {
            return res.status(400).json({ status: false, message: "Date of birth is required and must be a non-empty string" });
        }
        if (!employeeId || !isNonEmptyString(employeeId)) {
            return res.status(400).json({ status: false, message: "Employee ID is required and must be a non-empty string" });
        }
        if (!gender || !isNonEmptyString(gender)) {
            return res.status(400).json({ status: false, message: "Gender is required and must be a non-empty string" });
        }
        if (!email || !isEmail(email)) {
            return res.status(400).json({ status: false, message: "Email is required and must be a valid email address" });
        }
        if (!companyName || !isNonEmptyString(companyName)) {
            return res.status(400).json({ status: false, message: "Company Name is required and must be a non-empty string" });
        }
        if (!joindate || !isNonEmptyString(joindate) || !isValidDateFormat(joindate)) {
            return res.status(400).json({ status: false, message: "Join date is required and must be in the format dd/mm/yyyy" });
        }


        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Check if email already exists
        const connection = await connectDB();
        const existingEmployee = await connection.db("DJ").collection('employees').findOne({ email });
        console.log(existingEmployee);
        if (existingEmployee) {
            res.status(400).json({ status: false, message: "Employee with this email already exists" });
        }else{
            // Insert the new employee document
            const newEmployee = {
                firstname,
                lastname,
                dob,
                age,
                companyName,
                employeeId,
                gender,
                email,
                joindate
            };
            await connection.db("DJ").collection('employees').insertOne(newEmployee);
            console.log(newEmployee);
            // Send success response
            res.status(201).json({ status: true, message: "Employee created successfully", data: newEmployee });
        }      
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}


exports.editEmployeeById = async (req, res, db) => {
    try {
        const { id } = req.params; // Extract employee ID from URL parameters
        const { firstname, lastname, dob, employeeId, gender, email, joindate } = req.body; // Extract updated employee details from request body

        // Check if all fields are provided and valid
        if (!firstname || !isNonEmptyString(firstname)) {
            return res.status(400).json({ status: false, message: "First name is required and must be a non-empty string" });
        }
        if (!lastname || !isNonEmptyString(lastname)) {
            return res.status(400).json({ status: false, message: "Last name is required and must be a non-empty string" });
        }
        if (!dob || !isNonEmptyString(dob)) {
            return res.status(400).json({ status: false, message: "Date of birth is required and must be a non-empty string" });
        }
        if (!employeeId || !isNonEmptyString(employeeId)) {
            return res.status(400).json({ status: false, message: "Employee ID is required and must be a non-empty string" });
        }
        if (!gender || !isNonEmptyString(gender)) {
            return res.status(400).json({ status: false, message: "Gender is required and must be a non-empty string" });
        }
        if (!email || !isEmail(email)) {
            return res.status(400).json({ status: false, message: "Email is required and must be a valid email address" });
        }
        if (!joindate || !isNonEmptyString(joindate) || !isValidDateFormat(joindate)) {
            return res.status(400).json({ status: false, message: "Join date is required and must be in the format dd/mm/yyyy" });
        }

        // Check if employee with the given ID exists
        const existingEmployee = await db.collection('employees').findOne({ _id: db.ObjectId(id) });
        console.log(existingEmployee);
        if (!existingEmployee) {
            return res.status(404).json({ status: false, message: "Employee not found" });
        }
        else{

              // Update employee details
            await db.collection('employees').updateOne(
                { _id: db.ObjectId(id) }, // Filter by employee ID
                {
                    $set: {
                        firstname,
                        lastname,
                        dob,
                        employeeId,
                        gender,
                        email,
                        joindate: new Date(joindate)
                    }
                }
            );

            // Fetch updated employee details
            const updatedEmployee = await db.collection('employees').findOne({ _id: db.ObjectId(id) });

            console.log(updatedEmployee);

            // Send success response with updated employee details
            res.status(200).json({ status: true, message: "Employee details updated successfully", data: updatedEmployee });

        }

      
    } catch (error) {
        console.error("Error updating employee details:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}


exports.viewEmployee = async (req, res, db) => {
    try {
        const { id } = req.params;

        const employee = await db.collection('employees').findOne({ _id: db.ObjectId(id) });

        if (employee) {
            res.status(200).json({ status: true, message: "Employee details viewed successfully", data: employee });
        } else {
            res.status(404).json({ status: false, message: "Employee details not found" });
        }
    } catch (error) {
        console.log("Error viewing employee details:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}


exports.listEmployees = async (req, res) => {
    
    try {
        const connection = await connectDB();
        const employees = await connection.db("DJ").collection('employees').find({}).toArray();
        console.log(employees);

        if (employees) {
            res.status(200).json({ status: true, message: "Employees listed successfully", data: employees });
        } else {
            res.status(400).json({ status: false, message: "No employees found" });
        }
    } catch (error) {
        console.log("Error listing employees:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}


exports.deleteEmployee = async (req, res, db) => {
    try {
        const { id } = req.params;

        // Check if employee with the given ID exists
        const existingEmployee = await db.collection('employees').findOne({ _id: db.ObjectId(id) });
        console.log(existingEmployee);
        if (!existingEmployee) {
            res.status(404).json({ status: false, message: "Employee not found" });
        }
        else{
            // Delete the employee
            await db.collection('employees').deleteOne({ _id: db.ObjectId(id) });

            // Send success response
            res.json({ status: true, message: "Employee deleted successfully" });

        }
       
    } catch (error) {
        console.log("Error deleting employee:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}



exports.aggregateEmployees = async (req, res, db) => {
    try {
        // Aggregate pipeline to group employees by age and gender and add fields
        const pipeline = [
            {
                $addFields: {
                    salary: "$salary",
                    experience: "$experience",
                    phoneNumber: "$phoneNumber"
                }
            },
            {
                $group: {
                    _id: { age: "$age", gender: "$gender" },
                    count: { $sum: 1 },
                    totalSalary: { $sum: "$salary" },
                    averageExperience: { $avg: "$experience" },
                    employees: { $push: "$$ROOT" }
                }
            }
        ];

        // Execute aggregation query
        const result = await db.collection('employees').aggregate(pipeline).toArray();

        // Send success response with aggregated data
        res.status(200).json({ status: true, message: "Aggregation successful", data: result });
    } catch (error) {
        console.error("Error aggregating employees:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
};



exports.aggregateEmployees = async (req, res, db) => {
    try {
        // Define the aggregation pipeline
        const pipeline = [
            {
                $addFields: {
                    salary: "$salary",
                    experience: "$experience",
                    phoneNumber: "$phoneNumber"
                }
            },
            {
                $group: {
                    _id: { age: "$age", gender: "$gender" },
                    count: { $sum: 1 },
                    avgSalary: { $avg: "$salary" },
                    avgExperience: { $avg: "$experience" }
                }
            }
        ];

        // Execute the aggregation query
        const result = await db.collection('employees').aggregate(pipeline).toArray();

        // Send the success response with aggregated data
        res.status(200).json({ status: true, message: "Aggregation successful", data: result });
    } catch (error) {
        console.error("Error aggregating employees:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}