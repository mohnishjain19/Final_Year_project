import React from 'react'

import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";


const Footer = () => {
  return (
    <footer id="footer">
    <div className="leftFooter">
      <h4>DOWNLOAD OUR APP</h4>
      <p>Download App for Android and IOS mobile phone</p>
      <img src={playStore} alt="playstore" />
      <img src={appStore} alt="Appstore" />
    </div>

    <div className="midFooter">
      <h1>COGNITIVE HEALTH ANALYSIS</h1>
      <p>High Quality is our first priority</p>

      <p>Copyrights 2023 &copy; MohnishJain</p>
    </div>

    <div className="rightFooter">
      <h4>Follow Us</h4>
      <a href="http://instagram.com/">Instagram</a>
      <a href="http://twitter.com/">Twitter</a>
      <a href="http://instagram.com/h">Facebook</a>
    </div>
  </footer>
  ) 
}

export default Footer