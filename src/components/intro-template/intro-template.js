import React, { useEffect } from "react";
import "./intro-template.css";

export default function IntroTemplate() {

  return (
    <div className="template-wrapper">
      <img className="logo" src={`${process.env.PUBLIC_URL}/assets/images/Logo.png`} alt="Logo" />
      <h2>Your Personal AI Interview Assistant</h2>
      <p>Experience an interview revolution our AI chatbot offers personalized guidance for success. Unlock career potential with intuitive, expert-driven innovation.</p>
      {/* <img src={`${process.env.PUBLIC_URL}/assets/images/undraw_interview_re_e5jn.svg`} alt="Example" /> */}
    </div>
  );
}
