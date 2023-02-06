import React, { useState } from 'react';
import axios from 'axios';

import UserProfile from '../Components/userSession/UserProfile';
import Navbar from '../Components/navbar/navBar'
import { render } from 'react-dom';

function quizScore() {
  
  // placeholders
  let pointsScored = 5
  let pointsAvailable = 6
  let scorePercentage = Math.round((pointsScored/pointsAvailable) * 100)

  
  
    return (
        <div>
          <Navbar/>
          
          <form id="Score" className="formComponent">
            <h1>Quiz Score</h1>
            <h3>Points scored = {pointsScored}</h3>
            <h3>Total possible points = {pointsAvailable}</h3>
            <h3>Score = {scorePercentage}%</h3>
            </form>
        </div>
  );
}



export default quizScore;