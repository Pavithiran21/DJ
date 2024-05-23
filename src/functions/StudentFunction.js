const { app } = require('@azure/functions');
const { connectDB } = require('./Database/Db');
const { ObjectId } = require('mongodb');

let CreateStudent = async (request, context) => {

    try {

        let { studentname, email, dob, SchoolName, Standard } = await request.json();

        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
    
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        let connect = await connectDB();
        let existingStudent = await connect.db("Azure").collection('students').findOne({ email });
        console.log(existingStudent);

        if (existingStudent) {
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status: 400,
                    message: "Student Details already exist.",
                })
            };
            return message;
        } else {
            let newStudent = {
                studentname,
                email,
                dob,
                age,
                SchoolName,
                Standard
            };

            await connect.db("Azure").collection('students').insertOne(newStudent);
            console.log(newStudent);
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status: 200,
                    message: "Student Details Created Successfully",
                    data: newStudent
                })
            };
            return message;
        }

    } catch (err) {
        console.log(err);
        let message = {
            statusCode: 200,
            body: JSON.stringify({
                status: 500,
                message: "Internal Server Error",
            })
        };
        return message;
    }
}




let UpdateStudent = async (request, context) => {
    try {
        let { studentID } = request.query; // Extract studentID from query parameters
        let { studentname, email, dob, SchoolName, Standard } = await request.json(); // Extract updated details from the request body

        

        let connect = await connectDB();
        let existingStudent = await connect.db("Azure").collection('students').findOne({ _id:new ObjectId(studentID)});

        if (existingStudent) {
            let updatedStudent = {
                studentname,
                email,
                dob,
                SchoolName,
                Standard
            };

            await connect.db("Azure").collection('students').updateOne(
                { _id:new ObjectId(studentID)},
                { $set: updatedStudent }
            );
            console.log(updatedStudent);
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status: 200,
                    message: "Student Details Updated Successfully",
                    data:updatedStudent
                })
            };
            return message;
        } else {
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status: 404,
                    message: "Student Not Found",
                })
            };
            return message;
        }
    } catch (err) {
        console.log(err);
        let message = {
            statusCode: 200,
            body: JSON.stringify({
                status: 500,
                message: "Internal Server Error",
            })
        };
        return message;
    }
};

let ViewStudent = async (request, context) => {
    try {
        let studentID  = request.query.get('studentID');
        console.log(studentID)

        let connect = await connectDB();
        let existingStudent = await connect.db("Azure").collection('students').findOne({_id:new ObjectId(studentID) });

        if (existingStudent) {
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status: 200,
                    message: "Student Details Retrieved Successfully",
                    data: existingStudent
                })
            };
            return message;
        } else {
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status: 404,
                    message: "Student Not Found",
                })
            };
            return message;
        }
    } catch (err) {
        console.log(err);
        let message = {
            statusCode: 500,
            body: JSON.stringify({
                status: 500,
                message: "Internal Server Error",
            })
        };
        return message;
    }
};


let DeleteStudent = async (request, context) => {
    try {
        let email = request.query.get("email");

        let connect = await connectDB();
        let existingStudent = await connect.db("Azure").collection('students').deleteOne({ email});

        if (existingStudent) {
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status: 200,
                    message: "Student Details Deleted Successfully",
                    data: existingStudent
                })
            };
            return message;
        } else {
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status: 404,
                    message: "Student Not Found",
                })
            };
            return message;
        }
    } catch (err) {
        console.log(err);
        let message = {
            statusCode: 200,
            body: JSON.stringify({
                status: 500,
                message: "Internal Server Error",
            })
        };
        return message;
    }
};
 
let ListStudent = async(request,context) =>{
    try{
        let connect = await connectDB();
        let Students = await connect.db("Azure").collection('students').find({}).toArray();
        console.log(Students);
        if(Students){
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status:200,
                    message: "Student List Shown Successfully",
                    data:Students
                })
            }
            return message
        }
        else{
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status:400,
                    message: "Student List cannot be shown. Please try again.....",
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



let StudentAggregate = async (request, context) => {
    try {
        let {StudentId, phoneNumber, gender } = await request.json(); // Assuming you're using Express.js
        let connect = await connectDB();
        let student = await connect.db("Azure").collection('students').aggregate([
            {
                $match: { _id:new ObjectId(StudentId) } // Match based on the email field
            },
            {
                $addFields: {
                    phoneNumber: phoneNumber,
                    gender: gender
                }
            }
        ]).toArray();

        console.log(student);
        if (student) {
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status: 200,
                    message: "Student Aggregation done Successfully",
                    data: student
                })
            }
            return message;
        } else {
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status: 400,
                    message: "Student Aggregation cannot be done. Please try again.....",
                })
            }
            return message;
        }
    } catch (err) {
        console.log(err);
        let message = {
            statusCode: 500,
            body: JSON.stringify({
                status: 500,
                message: "Internal Server Error",
            })
        }
        return message;
    }
}



app.http('Student-Registration', {
    methods: [ 'POST'],
    route:"create-student",
    authLevel: 'anonymous',
    handler: CreateStudent
});

app.http('Edit-Students', {
    methods: [ 'PUT'],
    route:"edit-student",
    authLevel: 'anonymous',
    handler: UpdateStudent
});

app.http('View-Students', {
    methods: [ 'GET'],
    route:"view-student",
    authLevel: 'anonymous',
    handler: ViewStudent
});

app.http('Delete-Students', {
    methods: [ 'DELETE'],
    route:"delete-student",
    authLevel: 'anonymous',
    handler: DeleteStudent
});


app.http('All-Students', {
    methods: [ 'GET'],
    route:"all-students-list",
    authLevel: 'anonymous',
    handler: ListStudent
});


app.http('Aggergate-Students', {
    methods: [ 'POST'],
    route:"aggergate-student",
    authLevel: 'anonymous',
    handler: StudentAggregate
});


module.exports.CreateStudent =  CreateStudent;
module.exports.ListStudent = ListStudent;
module.exports.StudentAggeregate = StudentAggregate;
module.exports.UpdateStudent = UpdateStudent; 
module.exports.ViewStudent = ViewStudent;
module.exports.DeleteStudent = DeleteStudent;