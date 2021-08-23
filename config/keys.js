//    module.exports={
//     MONGOURI : "mongodb+srv://radheshyam:MhuOlJiDPPdq9v69@cluster0.dy5ge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     JWT_SECRET :"effegwegwrgrgw4"

// };

if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod')
}
else{
    module.exports=require('./dev')
}



// MONGOURI : "mongodb://localhost:27017/instagram"