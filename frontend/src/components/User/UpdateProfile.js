import React, { Fragment,useState,useEffect} from 'react'
import Loader from '../layout/Loader/Loader';
import {Link} from "react-router-dom"
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import "./UpdateProfile.css"
import {useSelector,useDispatch} from "react-redux";
import { clearErrors,loadUser,updateProfile} from '../../actions/Useraction';
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/Userconstants';

const UpdateProfile = () => {
    const dispatch=useDispatch();
    
    const {user}=useSelector(state=>state.user);
    const {isUpdated,loading,error}=useSelector(state=>state.profile);
    const history=useNavigate();
    const alert=useAlert();

    // const [avatar,setAvatar]=useState();
    // const [avatarPreview,setAvatarPreview]=useState("/Profile.png");
    const [name,setName]=useState();
    const [email,setEmail]=useState();

    const updateProfileSubmit =(e)=>{
        e.preventDefault();
        const myForm =new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        // myForm.set("avatar",avatar);
       dispatch(updateProfile(myForm)); 
        
    }
    // const updateProfileDataChange =(e) =>{
    //     // if(e.target.name=="avatar")
    //     // {
    //     //     const reader=new FileReader();

    //     //     reader.onload=()=>{
    //     //         if(reader.readyState===2)
    //     //         {
    //     //             setAvatarPreview(reader.result);
    //     //             setAvatar(reader.result);
    //     //         }
    //     //     }
    //     //     reader.readAsDataURL(e.target.files[0]);
    //     // }
    //     const reader = new FileReader();

    //     reader.onload = () => {
    //       if (reader.readyState === 2) {
    //         setAvatarPreview(reader.result);
    //         setAvatar(reader.result);
    //       }
    //     };
    
    //     reader.readAsDataURL(e.target.files[0]);
    // }
    useEffect (()=>{
        if(user)
        {
            setName(user.name);
            setEmail(user.email);
            // setAvatarPreview(user.avatar.url);
        }
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated)
        {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            history("/account");
            dispatch({
                type:UPDATE_PROFILE_RESET,
            })
        }
    },[dispatch,alert,error,history,user,isUpdated]);

  return (
    <Fragment>
        {loading?<Loader />:
        <Fragment>
        <div className='updateProfileContainer'>
        <div className='updateProfileBox'>
        <h2 className="updateProfileHeading">Update Profile</h2>
        <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                <div className="updateProfileName">
                <FaceIcon />
                <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className="updateProfileEmail">
                <MailOutlineIcon />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <input type="submit" value="Update" className="updateProfileBtn" />
          </form>

         </div>
        </div>
        </Fragment>
            
        }
        </Fragment>
  )
}

export default UpdateProfile