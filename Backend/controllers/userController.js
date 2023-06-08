const User=require("../models/userModel");
const crypto =require("crypto");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
const axios = require('axios');



async function sendmessage(user)
{
    try{
            const message=`Dear ${user.name},

            We are delighted to welcome you to Cognitivbe Health Analysis! We have received your registration request and are pleased to inform you that your account has been successfully created.As a registered user, you will have access to exclusive content, be able to track your activity on the site, and receive updates on new features and promotions. We hope that you find our website to be a valuable resource for your needs.If you have any questions or concerns, please do not hesitate to contact us. We are here to help and support you in any way we can.Thank you for choosing to be a part of our community.
            
            Best regards,
            Cognitive Health Analysis`;

            await sendEmail({
                email:user.email,
                subject:`Welcome to The Team`,
                message
            });
            return({
                success:true,
                message:`Email send to ${user.email} successfully`,
            })
    }
    catch(error)
    {
        console.log("Error: "+error);

    }
}




async function sendmessage1(user,report)
{
    try{

        const t=report.split(" ");
        let testtype=t[t.length-1];
        let accuracy=t[t.length-2]*100;
        let algorithm=t[t.length-5]+t[t.length-4]+t[t.length-3];
        let result="";
        for(let x=0;x<t.length-5;x++)
        {
            result+=t[x]+" ";
        }

            const message=`Dear ${user.name},

            Here is your report:
            TestType - ${testtype},
            Algorithm - ${algorithm},
            Result - ${result},
            Accuracy - ${accuracy},
            
            Best regards,
            Cognitive Health Analysis`;

            

            await sendEmail({
                email:user.email,
                subject:`Report Results`,
                message
            });
            return({
                success:true,
                message:`Email send to ${user.email} successfully`,
            })
    }
    catch(error)
    {
        console.log("Error: "+error);

    }
}

//Register User
exports.registerUser=async(req,res,next)=>{
   
    try{
        const {email,name,password}=req.body;
       
        const user=await User.findOne({email});
        if(!user)
        {
            const user1=await User.create({
                name,email,password
            });
            
            sendToken(user1,201,res);
            const t=sendmessage(user1);
            // if(t)
            // res.status(200).json({
            //     success:true,
            //     message:`Email send to ${user1.email} successfully`,
            // })
            

        }
        else{   
            res.status(400).json({
                message:"User alreasy Exist",
            })
        }
    }
    catch(error)
    {
        console.log("Error: "+error);

    }
}


// Login User
exports.loginUser =async(req,res,next)=>
{
    try{
        const {email,password} =req.body;

        //checking if email and password is given both
        if(!email || !password)
        {
            res.status(400).json({
                message:"Please Enter Email & password",
            })
            // return next(new ErrorHandler("Please Enter Email & password",400));
        }
        else
        {
            const user=await User.findOne({email}).select("+password");
            if(!user)
            {
                res.status(401).json({
                    message:"Invalid Email or Password",
                })
                // return next(new ErrorHandler("Invalid Email or Password",401));
            }
            else
            {
                const isPasswordMatched=await user.comparePassword(password);

                if(!isPasswordMatched)
                {
                    res.status(401).json({
                        message:"Invalid Email or Password",
                    })
                    // return next(new ErrorHandler("Invalid Email or Password",401));
                }
                
                // res.status(200).json({
                //     sucess:true,
                //     user
                // });
                else{
                sendToken(user,200,res);
                }
            }
        }

       

            
    }
    catch(error)
    {
        console.log("Error: "+error);

    }
};

//logout a user
exports.logout =async(req,res,next)=>
{
        res.cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly:true,
        });
        res.status(200).json({
            success:true,   
            message:"Logged Out",
        });
   
};


//Get user Details
exports.getUserDetails=async(req,res,next)=>
{
    const user =await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    });

};


//Forgot Password
exports.forgotPassword =async(req,res,next)=>{

    const user=await User.findOne({email:req.body.email});

    if(!user)
    {
        res.status(404).json({
            message:"User not found",
        })
        // return next(new ErrorHandler("User not found",404));   
    }
    else
    {

    
    //Get resetPassword token
    const resetToken    = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    // const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    // const resetPasswordUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message=`Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf ypu have not requested this email then ,please ignore it`
    try
    {
            await sendEmail({
                email:user.email,
                subject:`Ecommerce Password Recovery`,
                message
            });
            res.status(200).json({
                success:true,
                message:`Email send to ${user.email} successfully`,
            })
    }

    catch(err)
    {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        res.status(500).json({
            message:err.message,
        })
        // return next(new ErrorHandler(err.message,500));
    }   
}
};



//RESET PASSWORD
exports.resetPassword=async (req,res,next)=>{

    //Creating token hash
    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });

    if(!user)
    {
        res.status(404).json({
            message:"Reset Password token is invalid or has been expired",
        })
        // return next(new ErrorHandler("Reset Password token is invalid or has been expired",404));   
    }
    else
    {

        if(req.body.password!=req.body.confirmPassword)
        {
            res.status(400).json({
                message:"Password not match",
            })
            // return next(new ErrorHandler("Password not match",400));
        }
        else
        {
            user.password=req.body.password;
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;

            await user.save();
            sendToken(user,200,res);
        }
}

};



//Update User Password
exports.updatePassword=async(req,res,next)=>
{
    try
    {
        const user =await User.findById(req.user.id).select("+password");

        const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
        if(!isPasswordMatched)
        {
            res.status(400).json({
                message:"Old password is incorrect",
            })
        }
        if(req.body.newPassword !=req.body.confirmPassword)
        {
            res.status(404).json({
                message:"Password does not match",
            })
        }
        
        user.password=req.body.newPassword;
        await user.save();
        sendToken(user,200,res);
    }
    catch(error)
    {
        console.log("Error: "+error);

    }
};

//Update User Details
exports.updateProfile=async(req,res,next)=>
{
    try
    {
        const newUserData ={
            name:req.body.name,
            email:req.body.email,
        } 

    // //Wee will add cloudinary later
    // if (req.body.avatar !== "") {
    //     const user = await User.findById(req.user.id);
    
    //     const imageId = user.avatar.public_id;
    
    //     await cloudinary.v2.uploader.destroy(imageId);
    //     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //         folder: "avatars",
    //         width: 150,
    //         crop: "scale",
    //       });
      
    //       newUserData.avatar = {
    //         public_id: myCloud.public_id,
    //         url: myCloud.secure_url,    
    //       };
    //     }

        const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });   
        res.status(200).json({
            success:true,
        })
    }
    catch(error)
    {
        console.log("Error: "+error);

    }

};


exports.reportAdd =async(req,res,next)=>{

    try{
        const {report}=req.body;
        const user =await User.findById(req.user.id);
        if(!user)
        {
            res.status(404).json({
                message:"User not found",
            })
            // return next(new ErrorHandler("User not found",404));   
        }
        else
        {
            user.reports.push(report);
            // Save the updated user document
            user.save();
            sendToken(user,200,res);
            sendmessage1(user,report);
        }


    }
    catch(err)
    {
        console.log("Error: "+error);
    }

}


exports.chatinterface = async (req, res, next) => {
    const { message } = req.body;
    const messages = [
      { role: 'system', content: 'You are a psychiatrist' },
      { role: 'user', content: message },
    ];
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages,
          model: 'gpt-3.5-turbo',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.API_KEY_CHAT_GPT}`,
          },
        }
      );
  
      if (response && response.data && response.data.choices && response.data.choices.length > 0) {
        const assistantMessage = response.data.choices[0].message.content;
        res.json(assistantMessage);
      } else {
        throw new Error('Invalid response from OpenAI API');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(500).json('An error occurred');
    }
  };
  