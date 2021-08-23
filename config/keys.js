

if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod')
}
else{
    module.exports=require('./dev')
}



// MONGOURI : "mongodb://localhost:27017/instagram"
