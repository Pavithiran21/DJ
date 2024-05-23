const { app } = require('@azure/functions');
const { connectDB } = require('./Database/Db');


let CreateSchool = async(request,context)=>{
    try{
        let {email,SchoolName,SchoolMedium,Location} = await request.json();
        let connect = await connectDB();
        let existingSchool = await connect.db("Azure").collection('school').findOne({email});
        console.log(existingSchool);
        if(existingSchool){
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status:400,
                    message: "School Details are already Exists"
                })
            }
            return message

        }
        else{
            let newSchool = {
                email,
                SchoolName,
                SchoolMedium,
                Location
            }
            console.log(newSchool);
            await connect.db("Azure").collection('school').insertOne(newSchool);
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status:200,
                    message: "School Details are Registered Successfully",
                    data:newSchool
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

let ListSchool = async(request,context) =>{
    try{
        let connect = await connectDB();
        let schoollist = await connect.db("Azure").collection('school').find().toArray();
        console.log(schoollist);
        if(schoollist){
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status:200,
                    message: "School list has shown Successfully",
                    data:schoollist
                })
            }
            return message
        }
        else{
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status:400,
                    message: "School lists cannot be shown. please fix it"
                })
            }
            return message
        }

    }
    catch(err){
        let message = {
            statusCode: 200,
            body: JSON.stringify({
                status:500,
                message: "Internal Server Error"
            })
        }
        return message
    }
}



let aggergateSchool = async(request,context) =>{
    try{
        let connect = await connectDB();
        let email = request.query.get("email");

        let pipeline = [
            {
                $match: { email: email } // Match based on the email field
            },
            {
                $lookup: {
                   from:"students",// another database
                   localField: "SchoolName",//current dtabase
                    foreignField: "SchoolName",// current database 
                    as: "studentslist",
                }
            }
        ];
        let schools  =  await connect.db("Azure").collection('school').aggregate(pipeline).toArray();
        console.log(schools);
        if(schools){
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status:200,
                    message: "School Aggergation has shown Successfully",
                    data:schools
                })
            }
            return message

        }
        else{
            let message = {
                statusCode: 200,
                body: JSON.stringify({
                    status:400,
                    message: "School Aggergation cannot be down. Please fix it"
                })
            }
            return message
        }
       

    }
    catch(err){
        let message = {
            statusCode: 200,
            body: JSON.stringify({
                status:500,
                message: "Internal Server Error"
            })
        }
        return message

    }
}

module.exports.CreateSchool = CreateSchool;
module.exports.ListSchool = ListSchool;
module.exports.aggergateSchool = aggergateSchool;



app.http('Create-School', {
    methods: [ 'POST'],
    route:"create-school",
    authLevel: 'anonymous',
    handler: CreateSchool
});
app.http('All-Schools', {
    methods: [ 'GET'],
    route:"all-schools",
    authLevel: 'anonymous',
    handler: ListSchool
});

app.http('Aggergate-School', {
    methods: [ 'GET'],
    route:"aggergate-school",
    authLevel: 'anonymous',
    handler: aggergateSchool
});