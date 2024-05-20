const JWT = require("jsonwebtoken");




// exports. authorizate = async(req,res,next) =>{
//     try{
//         const token = req.headers.authorization;
//         if(token){
//             JWT.verify(token,process.env.JWT_TOKEN,function(err,decode){
//                 if(err){
//                     res.status(401).json({status:false,message:"Token expired  or Invalid.."})
//                 }
//                 else{
//                     req.user = decode.indexOf;
//                     console.log(decode.id);
//                     next();
//                 }
//             })
//         }
//         else{
//             res.status(401).json({status:false,message:"No token is provided.Please try again.."})
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(404).json({status:false,message:"Internal Server Error"})
//     }
// }




// export const isAdmin = async(req,res,next)=>{
//     try{
//         const user = await User.findById(req.user);
//         if(user.isAdmin){
//             next();
//         }
//         else if(!user.isAdmin){
//             res.status(401).json({status:false,message:"User Access is denied. Please try again...."});
//         }
//         else{
//             res.status(401).json({status:false,message:"Admin can only access. Please check it"});
//         }

//     }
//     catch(err){
//         console.log(err);
//         res.status(404).json({ststus:false,message:"Internal Server Error"})
//     }
// }
