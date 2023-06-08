import React from 'react'
import { useEffect } from 'react';
import "./BookTest.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';





const BookTest = () => {




  useEffect(()=>{
    if(performance.navigation.type == 2){
      window.location.reload();
   }
    },[]);

    const history=useNavigate();


    const handlePrediction = () => {
      window.location.href = 'http://localhost:7000/depression1';
    };

    const handlePrediction1 = () => {
      window.location.href = 'http://localhost:8000/depression';
    };


  return (

    <div class="container-fluid bg-dark text-dark p-5">
    <div class="container bg-light p-5">
      <h1 class="display-4 fw-bold">Welcome to Test Dashboard</h1>
      {/* <hr> */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <button class="btn btn-success btn-lg hh" onClick={handlePrediction1}>Depression Test 1</button>
        <button class="btn btn-success btn-lg hh"  onClick={handlePrediction}>Depression Test 2</button>
        </div>
        
    </div>
  </div>
       
   
  )
}

export default BookTest