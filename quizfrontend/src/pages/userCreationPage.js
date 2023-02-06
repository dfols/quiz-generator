import React, { useState } from 'react';
import axios from 'axios';

import Navbar from '../Components/navbar/userCreationNav'
//https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
function UserCreationPage() {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      });
      function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      } 
      function handleSubmit(evt){
        evt.preventDefault();

        const user = {
          firstName: state.firstName,
          lastName: state.lastName,
          username: state.username,
          password: state.password
        };
        axios.post('http://localhost:8080/v1/user', user)
        .then((response) => {
          console.log(response);
          window.location.replace("/login");
        })
        .catch(err => {
          if (err.response) {
            alert("Sorry, this username is already in use.")
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
      <div>
        <Navbar/>
      <form style={{borderColor: "white", borderWidth: 3,}} id="login-form" onSubmit={handleSubmit} className="formComponent">
              <h3>Sign up</h3>
                    <label>
                        <h3>First Name :</h3>
                        <input type="text" id="firstName" name="firstName" placeholder="Enter First Name here" required onChange={handleChange} required/>
                    </label>
                
                    <label>
                        <h3>Last Name :</h3> 

                        <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name here" required onChange={handleChange} required/>

                    </label>
                
                    <label>
                        <h3>Username :</h3> 

                        <input type="text" id="username" name="username" placeholder="Enter Username here" required onChange={handleChange} required/>

                    </label>
                
                    <label>
                        <h3>Password :</h3> 

                        <input type="password" id="password" name="password" placeholder="Enter Password here" required onChange={handleChange} required/>

                    </label>
                
                <div className="creation-button-container">
                    <input type="submit" id="button"/>
                </div>
            </form>
      
      
      
      </div>
      </div>

    );
  }
  
  export default UserCreationPage;
  