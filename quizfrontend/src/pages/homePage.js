import React, { useState } from 'react';
import "./homePage.css";
import Navbar from "../Components/navbar/homenavBar"
import QuizGenie from "../assets/logo-modified.png";
import Features from "../Components/features";

function HomePage() {
    
    return (
        
        <div>   
            <Navbar/>       
            <section id="header">
            
      <div className="container header">
        <div className="header-left">
          <h1>
            <span>The Industrie's leading</span>
            <span>quiz creation and </span>
            <span>study system</span>
          </h1> 
          <p className="text">
            "With the help of QuizGenie this year, I was able to study efficiently
            for all my exams. I noticed immediate improvements on my grades. When
            studying for an exam, QuizGenie is a must!!" 
            -John C.
          </p>  
        </div>
        <div className="header-right">
        <img src={QuizGenie} alt="quiz" /> 
        </div>
      </div>
    </section>
    <Features/>
        </div>
    );
}


export default HomePage;

