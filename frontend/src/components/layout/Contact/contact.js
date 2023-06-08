import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import { useEffect } from "react";

const contact = () => {


  useEffect(()=>{
    if(performance.navigation.type == 2){
      window.location.reload();
   }
  
    },[]);
  
    return (
        <div className="contactContainer">
          <a className="mailBtn" href="mailto:mailmj029@gmail.com">
            <Button>Contact: mailmj029@gmail.com</Button>
          </a>
        </div>
      );
}

export default contact