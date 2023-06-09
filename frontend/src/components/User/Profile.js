import React, { Fragment,useEffect } from 'react'
import Loader from "../layout/Loader/Loader.js"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../actions/Useraction';
import "./Profile.css";

const Profile = () => {
    const history=useNavigate();
    const dispatch=useDispatch();
    const {user,loading,isAuthenticated}=useSelector(state=>state.user);
    useEffect(() => 
    {
        if(isAuthenticated===false)
        {
            history("/login");
        }
    }, [history,isAuthenticated ])


  return (
      <Fragment>
          {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          {/* <MetaData title={`${user.name}'s Profile`} /> */}
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={"https://res.cloudinary.com/duklqn3c5/image/upload/v1682628860/ProfilePhoto/Profile_rvvp7n.png"} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/reports">My Reports</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}

   </Fragment>
  )
}

export default Profile