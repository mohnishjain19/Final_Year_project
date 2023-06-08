import { LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS, LOGOUT_FAIL,LOGOUT_SUCCESS,REGISTER_USER_FAIL,REGISTER_USER_SUCCESS,REGISTER_USER_REQUEST,
    LOAD_USER_FAIL,LOAD_USER_SUCCESS,LOAD_USER_REQUEST,

    FORGOT_PASSWORD_FAIL,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_REQUEST,
    REPORT_FAIL,REPORT_SUCCESS, REPORT_REQUEST,
    UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_RESET,UPDATE_PROFILE_FAIL,UPDATE_PROFILE_RESET,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_REQUEST


} from "../constants/Userconstants";

import axios from "axios";


//Login

export const login=(email,password)=>async(dispatch)=>{

    try
    {
        dispatch({
            type:LOGIN_REQUEST
        })

        const config ={headers:{ "Content-Type":"application/json"}};
        const {data}=await axios.post("/api/v1/login",
        {
            email,
            password
        },
        config
        );
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user,
        })

    }
    catch(error)
    {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message,
        })
    }
}

//register

export const register=(userData)=>async(dispatch)=>{
    try
    {
        dispatch({
            type:REGISTER_USER_REQUEST
        })
        const config ={headers:{ "Content-Type":"application/json"}};
        const {data}=await axios.post("/api/v1/register",userData,config);

        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.user,
        })
        
    }
    catch(error)
    {
        dispatch({
            type:REGISTER_USER_FAIL,
            payload:error.response.data.message,
        })
    }
}

//Load User

export const loadUser=()=>async(dispatch)=>{

    try
    {
        dispatch({
            type:LOAD_USER_REQUEST
        })
        
        const {data}=await axios.get("/api/v1/me");
        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user,
        })  

    }
    catch(error)
    {
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.message,
        })
    }
}



//logout user
export const logout=()=>async(dispatch)=>{
    try
    {
        await axios.get("/api/v1/logout");
        dispatch({
            type:LOGOUT_SUCCESS,
        }) 

    }
    catch(error)
    {
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message,
        })
    }
}



//FORGOT PASSWORD

export const forgotPassword=(email)=>async(dispatch)=>{

    try
    {
        dispatch({
            type:FORGOT_PASSWORD_REQUEST
        })

        const config ={headers:{ "Content-Type":"application/json"}};
        const {data}=await axios.post("/api/v1/password/forgot",
        {
            email,
        },
        config);
        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.message,
        })

    }
    catch(error)
    {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.response.data.message,
        })
    }
}

//RESET PASSWORD

export const resetPassword=(token,passwords)=>async(dispatch)=>{
    try
    {
        dispatch({
            type:RESET_PASSWORD_REQUEST,
        })
        const config = { headers: { "Content-Type": "application/json" } };
        const {data}=await axios.put(`/api/v1/password/reset/${token}`,passwords,config);

        dispatch({
            type:RESET_PASSWORD_SUCCESS,
            payload:data.success,
        })
        
    }
    catch(error)
    {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.message,
        })
    }
}
//UPDATE PROFILE
export const updateProfile=(userData)=>async(dispatch)=>{
    try
    {
        dispatch({
            type:UPDATE_PROFILE_REQUEST,
        })
        const config ={headers:{ "Content-Type":"application/json"}};
        const {data}=await axios.put("/api/v1/me/update",userData,config);

        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload:data.success,
        })
        
    }
    catch(error)
    {
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.error,
        })
    }
}

//UPDATE PASSWORD
export const updatePassword=(passwords)=>async(dispatch)=>{
    try
    {
        dispatch({
            type:UPDATE_PASSWORD_REQUEST,
        })
        const config = { headers: { "Content-Type": "application/json" } };
        const {data}=await axios.put("/api/v1/password/update",passwords,config);

        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success,
        })
        
    }
    catch(error)
    {
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error.response.data.error,
        })
    }
}


//Report Add

export const reportAdd=(report)=>async(dispatch)=>{
    try
    {
        dispatch({
            type:REPORT_REQUEST
        })
        const config ={headers:{ "Content-Type":"application/json"}};
        const {data}=await axios.post("/api/v1/report",
        {
            report,
        },
        config);

        dispatch({
            type:REPORT_SUCCESS,
            payload:data.user,
        })
        
    }
    catch(error)
    {
        dispatch({
            type:REPORT_FAIL,
            payload:error.response.data.message,
        })
    }
}




//Clearing Error
export const clearErrors =() =>async(dispatch)=>{

    dispatch({
        type:CLEAR_ERRORS

    })
}

