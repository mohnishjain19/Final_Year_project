const mongoose=require('mongoose');

// rQ9kp2SunxN1dSjS


// qa8sgrvCTHaYciWW


const connectDatabase =() =>{
    
mongoose.connect("mongodb+srv://admin:rQ9kp2SunxN1dSjS@cluster0.byb4qdc.mongodb.net/test",{useNewUrlParser: true}).then((data)=>{

    console.log(`MongoDb connected with server : ${data.connection.host}`);
}).catch((err)=>{
    console.log(err);
})
};
module.exports=connectDatabase;
