const express=require("express");
const app=express();
const user=require("./routes/userRoute");
const bodyParser=require("body-parser");
const cookieParser =require("cookie-parser");
const dotenv=require("dotenv");
const cors=require("cors");

dotenv.config({path:"backend/config/config.env"});



app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb',parameterLimit:100000000, extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//Route imports

app.use(express.urlencoded({ limit: '10mb', extended: true }));

 app.use("/api/v1",user);

module.exports=app;