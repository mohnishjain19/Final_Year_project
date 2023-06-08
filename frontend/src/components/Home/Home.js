
import "./Home.css"
import Animations from "./Animations";
import React, { useEffect } from 'react';
import { Fragment } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const history=useNavigate();
  const slides = [
    
    { url: "https://cdn.britannica.com/99/144299-050-B23B9E10/Nurse-sphygmomanometer-patient-blood-pressure.jpg", title: "beach" },
    { url: "https://res.cloudinary.com/duklqn3c5/image/upload/v1682630895/Images_FP/Importance-of-data-analytics-in-healthcare_fizdyj.jpg", title: "boat" },
    { url: "https://m.economictimes.com/photo/88966321.cms", title: "forest" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP3E0Cq--zDUa4sM3aPbgyjUtlB9EWLHOPgQ&usqp=CAU", title: "city" },
    { url: "https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg", title: "italy" },
  ];

  // const containerStyles = {
  //   width: "100%",
  //   height: "auto",
  //   margin: "0 auto",
  // };
  const submitHandler=()=>{
    history("/learnmore");
  }
 useEffect(()=>{
  if(performance.navigation.type == 2){
    window.location.reload();
 }

  },[]);


    return (
      <Fragment>
      <div class="upper">
      <div class="styleani" style={{ position: 'relative' }}>
        <Animations slides={slides}/>
        <div class="s" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <h3 >Empowering Mental Well-being: Anonymous Therapy, Expert Insights, and Depression Screening</h3>
        <button type="button" onClick={submitHandler} class="btn btn-primary button">Learn More</button>
    </div>
    </div>
    </div> 
     

      
      </Fragment>
    )
}

export default Home;