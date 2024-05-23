const { app } = require('@azure/functions');
const { connectDB } = require('./Database/Db');
const bcrypt  = require("bcrypt");


let register = async(request,context) =>{

    try{
        let { username, email, password } = await request.json();
        let connect = await connectDB();
        let existingUser = await connect.db("Azure").collection('users').findOne({ email });
        console.log(existingUser);
        if(existingUser){
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status:400,
                    message: "Username or email already exists",
                })
            }
            return message
        }
        else{
            let hashPassword = await bcrypt.hash(password,10);
            let NewUser = {
                username,
                email, 
                password:hashPassword,
            }
            await connect.db("Azure").collection('users').insertOne(NewUser);

            console.log(NewUser);
            let message = {
                statusCode:200,
                body: JSON.stringify({
                    status:200,
                    message: "User Registered Successfully",
                    data:NewUser
                })
            }
            return message
        }

    }
    catch(err){
        console.log(err);
        let message = {
            statusCode: 200,
            body: JSON.stringify({
                status:500,
                message: "Internal Server Error",
            })
        }
        return message


    }
    
   
}

const loginUser = async (request,context) => {
    try {
        const { email, password } = await request.json();

        // Find user by email
        let connection = await connectDB();
        let users = await connection.db("Azure").collection('users').findOne({ email });
        console.log(users);
        if (!users) {
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status:400,
                    message: "User not found" 
                })
            }
            return message
        }else{

            let passwordMatch = await bcrypt.compare(password, users.password);
            console.log(passwordMatch);
            if (passwordMatch) {
                let message = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: "User logged in successfully" ,
                        data:users
                    })              
                }
                return message     
            }else{
                let message = {
                    statusCode: 200,
                    body: JSON.stringify({
                        status:400,
                        message: "Password does not match" 
                    })
                }
                return message
            }
            
        }

       
    } catch (error) {
        console.error("Error logging in:", error);
        const message = {
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal server error" 
            })
        }
        return message
    }
};







app.http('User-Registration', {
    methods: [ 'POST'],
    route:"register",
    authLevel: 'anonymous',
    handler: register
});
app.http('User-Login', {
    methods: [ 'POST'],
    route:"login",
    authLevel: 'anonymous',
    handler: loginUser
});


module.exports.register = register
module.exports.loginUser = loginUser
