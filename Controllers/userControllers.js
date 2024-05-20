


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectDB } = require('../middleware/Database');




function isNonEmptyString(str) {
    return str !== undefined && str !== null && str.trim() !== '';
}

// Function to validate email format
function isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

exports.registerUser = async (req, res) => {
    try {
        // Extract user input from request body
        const { username, email, password } = req.body;

        // Check if username is provided and valid
        if (!username || !isNonEmptyString(username) || username.length < 5) {
           res.status(400).json({ status: false, message: "Username is required and must be at least 5 characters or above" });
        }

        // Check if email is provided and valid
        if (!email || !isEmail(email)) {
            res.status(400).json({ status: false, message: "Email is required and must be a valid email address" });
        }

        // Check if password is provided and valid
        if (!password || !isNonEmptyString(password) || password.length < 5) {
            res.status(400).json({ status: false, message: "Password is required and must be at least 5 characters long" });
        }

        // Check if username or email already exists
        const connection = await connectDB();
        const existingUser = await connection.db("DJ").collection('users').findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            res.status(400).json({ status: false, message: "Username or email already exists" });
        }
        else{            
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user document
            const newUser = {
                username,
                email,
                password: hashedPassword
            };
            await connection.db("DJ").collection('users').insertOne(newUser);
            console.log(newUser);

            // Send success response
            res.status(201).json({ status: true, message: "User registered successfully", data: newUser });

        }

    } catch (err) {
        console.log("Error registering user:", err);
        res.status(500).json({status: false, message: "Internal server error" });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email is provided and valid
        if (!email) {
            res.status(400).json({ status: false, message: "Email is required" });
        }

        // Check if password is provided
        if (!password) {
            res.status(400).json({ status: false, message: "Password is required" });
        }

        // Find user by email
        const connection = await connectDB();
        const user = await connection.db("DJ").collection('users').findOne({ email });
        console.log(user);
        if (!user) {
            res.status(404).json({ status: false, message: "User not found" });
        }else{

             // Compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).json({ status: false, message: "Incorrect password" });
            }

            // Generate JWT token
            // const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
            // console.log(token);

            // Send success response with token
            res.status(200).json({
                status: true,
                message: "User logged in successfully",
                data: user,
                // token: token
            });

        }

       
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
};

