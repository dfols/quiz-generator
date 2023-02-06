import React, { useState } from 'react';
import axios from 'axios';

import UserProfile from '../Components/userSession/UserProfile';
import Navbar from '../Components/navbar/navBar';
import { useNavigate } from "react-router-dom";


//https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
function SubjectCreation() {
    const [state, setState] = useState({
        name: "",
        numberOfChapters: "",
      });

      let navigate = useNavigate(); 
        const routeChange = () =>{ 
        let path = "/dashboard"; 
        navigate(path);
        }
      function handleChange(evt) {
        
        const value = evt.target.value;
        
        setState({
          ...state,
          [evt.target.name]: value
        });
      } 
      function handleSubmit(evt){

        
        evt.preventDefault();
      
        
        

        const subject = {
          subjectName: state.name,
          user: {
            id: UserProfile.getUserId()
          }
        };

        

        axios.post('http://localhost:8080/v1/subject/' + state.numberOfChapters, subject)
        .then((response) => {
          console.log(response);
          window.location.replace("/success");
        })
        .catch(err => {
          if (err.response) {
            alert("error: 'Error when creating user: could not execute statem…ntViolationException: could not execute statement', status: 'BAD_REQUEST'")
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            alert("Either no response was recieved, or a request was never sent.");
            console.log(err.request);
          } else {
            alert("Something went wrong.")
          }
        });
        
     
      }
    return (
     <div>
        
        <Navbar/>
      
      <form style={{borderColor: "white", borderWidth: 3,}} id="login-form" onSubmit={handleSubmit} className="formComponent">
              <h3>Create subject</h3>
                    <label>
                        <h3>Subject Name:</h3>
                        <input type="text" name="name" placeholder="Enter Subject name here" onChange={handleChange} required/>
                     </label>
                
                    <label>
                        <h3>Number of chapters:</h3> 
                        <input type="number" name="numberOfChapters" placeholder="Enter number of chapters" onChange={handleChange} required/>
                    </label>
                
                   
                <div className="creation-button-container">

                  <button onClick={routeChange}>Cancel</button>

                    <input type="submit" id="button"/>
                </div>
            </form>
        </div>
      
    );
  }
  
  export default SubjectCreation;
  