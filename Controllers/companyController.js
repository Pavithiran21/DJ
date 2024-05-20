const { connectDB } = require("../middleware/Database");

function isNonEmptyString(str) {
    return str !== undefined && str !== null && str.trim() !== '';
}


exports.createCompany =  async(req,res)=>{
    try{
        const {companyName,companyAddress,productCategory,companyFound} = req.body;


        // Check if username is provided and valid
        if (!companyName || !isNonEmptyString(companyName) || companyName.length < 4) {
        res.status(400).json({ status: false, message: "CompanyName is required and must be at least 4 characters or above" });
        }

        // Check if email is provided and valid
        if (!companyAddress || !isNonEmptyString(companyAddress) || companyAddress.length < 5) {
            res.status(400).json({ status: false, message: "Company Address is required and must be at least 5 characters or above" });
        }

        // Check if password is provided and valid
        if (!productCategory || !isNonEmptyString(productCategory) || productCategory.length < 5) {
            res.status(400).json({ status: false, message: "Product Category is required and must be at least 5 characters long" });
        }
        if (!companyFound || !isNonEmptyString(companyFound)) {
            return res.status(400).json({ status: false, message: "Company Found Date is required and must be a non-empty string" });
        }


        const connection = await connectDB();
        const existingCompany = await connection.db("DJ").collection('company-details').findOne({ companyName });
        console.log(existingCompany);
        if(existingCompany){
            res.status(400).json({ status: false, message: "Company and Details are  already exists" });
        }
        else{
            const newCompany = {
                companyName,
                companyAddress,
                productCategory,
                companyFound
            }
            await connection.db("DJ").collection('company-details').insertOne(newCompany);
            console.log(newCompany);
            res.status(200).json({ status: true, message: "Company Details are registered Successfully",data:newCompany });
        }


    }
    catch(err){
        console.log(err);
        res.status(500).json({status: false, message: "Internal server error" });

    }
}

exports.aggegarteCompany  = async(req,res) =>{
    try{
        
        const pipeline = [
            {
                $lookup: {
                   from:"employees",// another database
                   localField: "companyName",//current dtabase
                    foreignField: "companyName",// current database 
                    as: "employeeDetails",
                }
            }
        ];
        const connection = await connectDB();

        // Execute the aggregation query
        const result = await connection.db("DJ").collection('company-details').aggregate(pipeline).toArray();
        console.log(result);
        if(result){
            // Send the success response with aggregated data
            res.status(200).json({ status: true, message: "Aggregation successful", data: result });

        }
        else{
            res.status(400).json({ status: false, message: "Aggregation cannot be done. Please check it" });
        }

        


    }
    catch(err){
        console.log( err);
        res.status(500).json({status: false, message: "Internal server error" });
    }
}



exports.aggregateCompanyPagination = async (req, res) => {
    try {
        // Parse page and size query parameters with defaults
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 1;
        const skip = page  * size;

        console.log(`Page: ${page}, Size: ${size}, Skip: ${skip}`);

        const pipeline = [
            {
                $lookup: {
                    from: "employees",
                    localField: "companyName",
                    foreignField: "companyName",
                    as: "employeeDetails",
                }
            },
            { $skip: skip },
            { $limit: size }
        ];
;

        const connection = await connectDB();

        // Execute the aggregation query
        const result = await connection.db("DJ").collection('company-details').aggregate(pipeline).toArray();
        console.log('Result:', result);

        if (result.length > 0) {
            // Send the success response with aggregated data
            res.status(200).json({ status: true, message: "Aggregation successful", data: result });
        } else {
            res.status(404).json({ status: false, message: "No data found" });
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
}
