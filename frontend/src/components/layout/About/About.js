import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useEffect } from "react";
const About = () => {

  useEffect(()=>{
    if(performance.navigation.type == 2){
      window.location.reload();
   }
  
    },[]);
  


  const visitInstagram = () => {
    window.location = "https://instagram.com/jmohnish";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/duklqn3c5/image/upload/v1682427986/ProfilePhoto/Photo_1_-1_kxcvpg.png"
              alt="Founder"
            />
            <Typography>Mohnish Jain</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            This is a website that is made in order to test whether a person is going through any kind of depression ,anxiety.
            </span>
          </div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/duklqn3c5/image/upload/v1686115816/ProfilePhoto/WhatsApp_Image_2023-06-07_at_10.55.26_AM_ve8xxb.jpg"
              alt="Founder"
            />
            <Typography>Mahi Agrawal</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            This is a website that is made in order to test whether a person is going through any kind of depression ,anxiety.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
           

            <a href="https://instagram.com/jmohnish" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;