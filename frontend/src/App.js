import {BrowserRouter as Router,Routes,Route,Switch, useNavigate} from "react-router-dom"
import Home from "./components/Home/Home"
import LoginSignUp from "./components/User/LoginSignUp.js"
import Header from "./components/layout/Header/Header.js"
import Footer from './components/layout/Footer/Footer.js';
import {useSelector} from "react-redux";
import {loadUser} from "./actions/Useraction";
import store from "./store";
import React, { useState } from 'react';
import Contact from "./components/layout/Contact/contact.js"
import About from "./components/layout/About/About.js"
import UserOptions from "./components/layout/Header/UserOptions";
import BookTest from "./components/BookTest/BookTest.js"
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js"
import Profile from "./components/User/Profile.js"
import LearnMore from "./components/Home/LearnMore.js";
import axios from "axios";
import { reportAdd } from "./actions/Useraction";
import Report from "./components/User/Report.js"
import UpdateProfile from "./components/User/UpdateProfile.js";
import NotFound from "./components/layout/Not Found/NotFound.js";
import UpdatePassword from "./components/User/UpdatePassword.js";


function App() {

  const {isAuthenticated,user}=useSelector(state=>state.user);
  React.useEffect(()=>{ 
    store.dispatch(loadUser());
    const cookieValue = getCookie("data");
    const cookieValue1=getCookie("dataa1");
    const cookieValue2=getCookie("dataa2");
    const cookieValue3=getCookie("dataa3");
    if(cookieValue!=null)
    {
      let s;
      if(cookieValue==="1")
      {
        s="Not at risk of Depression"
      }
      else if(cookieValue==="2")
      {
        s="At risk of Depression"
      }
      else if(cookieValue==="3")
      {
        s="Highly at risk of Depression"
      }
      let s1="Learning Vector Quantization";
      s=s+" "+s1+" "+"0.80"+" "+"2";
      store.dispatch(reportAdd(s));
      deleteCookie("data");
    }
    if(cookieValue1!=null)
    {
      let s;
      const parts = cookieValue1.split(" ");
      if(parts[0]==='Positive')
      {
        s="Not at risk of Depression"
      }
      else if(parts[0]==='Negative')
      {
        s="May be at a risk of Depression"
      }
      s=s+" "+parts[1]+" "+parts[2]+" "+parts[3]+" "+parts[4]+" "+1;
      console.log(s);
      store.dispatch(reportAdd(s));
      deleteCookie("dataa1");
    }
    if(cookieValue2!=null)
    {
      let s;
      const parts = cookieValue2.split(" ");
      if(parts[0]==='Positive')
      {
        s="Not at risk of Depression"
      }
      else if(parts[0]==='Negative')
      {
        s="May be at a risk of Depression"
      }
      s=s+" "+parts[1]+" "+parts[2]+" "+parts[3]+" "+parts[4]+" "+"1";
      console.log(s);
      store.dispatch(reportAdd(s));
      deleteCookie("dataa2");
    }
    if(cookieValue3!=null)
    {
      let s;
      const parts = cookieValue3.split(" ");
      if(parts[0]==='Positive')
      {
        s="Not at risk of Depression"
      }
      else if(parts[0]==='Negative')
      {
        s="May be at a risk of Depression"
      }
      s=s+" "+parts[1]+" "+parts[2]+" "+parts[3]+" "+parts[4]+" "+"1";
      console.log(s);
      store.dispatch(reportAdd(s));
      deleteCookie("dataa3");
    }
    },[]) ;

    const deleteCookie = (name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const getCookie = (name) => {
      const cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        const [cookieName, cookieValue] = cookies[i].split("=");
    
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
    
      return null; // Cookie not found
    };
    
   
  

  return (
      <Router>
        <Header/>
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact  path="/" element={<Home />} />
          <Route exact  path="/home" element={<Home />} />
          <Route exact  path="/learnmore" element={<LearnMore />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact  path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/bookatest" element={<BookTest />} />
          <Route exact path='/password/forgot' element={<ForgotPassword />}/>
          <Route exact path='/password/reset/:token' element={<ResetPassword />}/>

          
         {isAuthenticated?<Route exact path='/me/update' element={<UpdateProfile />}/> :
         <Route exact path='/me/update' element={<LoginSignUp />}/> }

         {isAuthenticated?<Route exact path='/password/update' element={<UpdatePassword />}/> :
         <Route exact path='/password/update' element={<LoginSignUp />}/> }

          {isAuthenticated?<Route exact path='/account' element={<Profile />}/> :
         <Route exact path='/account' element={<LoginSignUp />}/> }

         {isAuthenticated?<Route exact path='/reports' element={<Report />}/> :
         <Route exact path='/reports' element={<LoginSignUp />}/> }

         {isAuthenticated?<Route exact path='/me/update' element={<UpdateProfile/>}/> :
         <Route exact path='/me/update' element={<LoginSignUp />}/> }

         <Route  path="*" element={<NotFound/>}/> 

        </Routes>
        <Footer/>
      </Router>
  )
}

export default App;
