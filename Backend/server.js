const app=require("./app");
const dotenv=require("dotenv");
const connectDatabase=require("./config/database");

dotenv.config({path:"backend/config/config.env"});

//Unhandling Uncaught Exception
process.on("uncaught Exception",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    process.exit(1);
});




connectDatabase();


const server= app.listen(process.env.PORT,()=>{

    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})



//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    // console.log('Error: ${err.message}`);
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    });
});
