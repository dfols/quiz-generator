import React, { useState } from 'react';
import axios from 'axios';

import Navbar from '../Components/navbar/navBarToDash';
import { useNavigate } from "react-router-dom";
//https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
function SubjectPage() {

// place holders.
let subject = "History"; 
let chapters = ["Chapter1", "Chapter2", "Chapter3"];


let navigate = useNavigate(); 
const routeChange = () =>{ 
let path = "/questioncreation"; 
navigate(path);
}
    
return (  
  <>
       
       <Navbar/>
  <form id="Chapters" className="formComponent">
    <h3>{subject}</h3>
    <h2>
    <a href="/chapterPage">{chapters.map(chapter => <li key={chapter}>{chapter}</li>)}</a>
    </h2>
    <div className='creation-button-container'>
      <button onClick={routeChange}>Add Question</button>
      <button>Generate Quiz</button>
    </div>
  </form>
  </>  

)
};  
  export default SubjectPage;
  