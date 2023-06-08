import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./LearnMore.css"
import { useEffect } from 'react';

const LearnMore = () => {

  useEffect(()=>{
    if(performance.navigation.type == 2){
      window.location.reload();
   }
  
    },[]);
  

  return (
    <Fragment>
    <Container>
        <div class="tag">
        <h2>About Us</h2>
        </div>
       
      <Row>
            <Col>
            <div class="tex">
            <h6>
    <span><h4>Welcome to our website</h4>where everyone is welcome as a patient. We understand the importance of mental health and strive to provide a safe and 
    supportive environment for individuals seeking assistance. Whether you're unsure if you're experiencing symptoms of depression or anxiety or simply 
    want to gain a better understanding of your mental well-being, our website is here to help. Through our comprehensive mental health check, we offer a user-friendly 
    assessment that can provide valuable insights into your emotional state. Our professionally designed questionnaire covers various aspects of mental health, allowing 
    you to self-assess your condition. By providing accurate and honest responses, our system will analyze your answers and generate a personalized report that indicates 
    whether you might be experiencing depression, anxiety, or related concerns. This information can serve as a helpful starting point for seeking further professional 4
    assistance or engaging in self-care practices. We prioritize your privacy and ensure that all data collected during the assessment remains confidential. Sign up today 
    to become a patient and take the first step towards a healthier and happier you.</span></h6>
            </div>
        </Col>
        <Col>    
            <div class="im">
            <img src="https://www.sandiego.edu/uploads/d9e04c8fd25fc5f40f180155bca8e175.jpg"  alt="image"  width="550" height="300" /> 
           
            </div>
            </Col>
            
      </Row>
      </Container>
    </Fragment>
  )
}

export default LearnMore