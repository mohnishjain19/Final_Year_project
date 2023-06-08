import React, { Fragment, useEffect, useState } from 'react'
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/Useraction';
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { TbReportSearch  } from "react-icons/tb";
import ChatIcon from '@mui/icons-material/Chat';


const UserOptions = ({user}) => {

    const [open,setOpen]=useState(false);
    const history=useNavigate();  
    const dispatch=useDispatch();
    const alert=useAlert();
    const options = [
        { icon: <ListAltIcon />, name: "Home", func: home },
        { icon: <TbReportSearch />, name: "Reports", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ChatIcon />, name: "Chat", func: chat },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
     
    ];

  
     
      function orders()
      {
        history("/reports"); 
      }
      function home()
      {
        history("/home"); 
      }
      function account()
      {
        history("/account"); 
      }
      function logoutUser()
      {
            history("/login");
            dispatch(logout());
            alert.success("Logout Successfully");
      }
      function chat()
      {
        window.location.href = 'http://localhost:3001';
      }
      useEffect(()=>{
        if(!user)
        {
          history("/login")
        }
      },[user,history]);

  return (
        <Fragment>
            <Backdrop open={open} style={{zIndex:"10"}} />
                <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                className='speedDial'
                onClose={()=>setOpen(false)}
                onOpen  ={()=>setOpen(true)}
                style={{zIndex:"11"}}
                open={open}
                direction="down"
                icon={<img
                className='speedDialIcon'
                src={"https://res.cloudinary.com/duklqn3c5/image/upload/v1682628860/ProfilePhoto/Profile_rvvp7n.png"}
                alt="Profile"
                />}
                >

                {options.map(item=>( 
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=600?true:false}/>
                ))} 
                </SpeedDial>

               

        </Fragment>
  )
}

export default UserOptions