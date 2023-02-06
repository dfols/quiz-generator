import React, { useState } from 'react';
import axios from 'axios'
import { Alert, Stack } from '@mui/material';
import UserProfile from '../Components/userSession/UserProfile';
import Navbar from '../Components/navbar/userCreationNav'

function LoginPage () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('');
    const [alertContent, setAlertContent] = useState('');

    function handleUsername (e) {
        setUsername({value: e.target.value})
    }
    
    function handlePassword (e) {
        setPassword({value: e.target.value})
    }

    const displaySuccessAlert = () => {
        setAlertContent("SUCCESS");
        setAlertSeverity("success");
        setAlert(true);
        setTimeout(() => {toggleAlert()}, 3000);
    }

    const displayFailAlert = (message) => {
        setAlertContent("ERROR: " + message);
        setAlertSeverity("error");
        setAlert(true);
        setTimeout(() => {toggleAlert()}, 3000);
    }

    const toggleAlert = () => {
        setAlert(false);
    }

    const encryptPassword = (pass) => {
        //this is old but idc, change it if you want to
        return btoa(pass);
    }

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        let authObject = {
            username: username.value,
            password: encryptPassword(password.value)
        }
        //hit the login controller
        axios.post("http://localhost:8080/v1/login/authenticate", authObject)
        .then(response =>{
            //set user session variables
            UserProfile.setFirstName(response.data.firstName);
            UserProfile.setLastName(response.data.lastName);
            UserProfile.setUsername(response.data.username);
            UserProfile.setUserId(response.data.id);

            displaySuccessAlert();
            window.location = "/dashboard";
        })
        .catch(e => {
            displayFailAlert("Invalid username or password");
            document.getElementById("login-form").reset();
        })
    };
    
    return (
        <>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {alert ? <Alert severity={alertSeverity} onClose={toggleAlert}>{alertContent}</Alert> : <></> }
            </Stack>
            <Navbar/>
            <div style={{paddingBottom: 8}}>
            <form style={{borderColor: "white", borderWidth: 3,}} id="login-form" onSubmit={handleSubmit} className="formComponent">
                
            <h3>Sign In</h3>
                    <label >
                        Username :
                        <div >
                        <input type="text" name="username" placeholder="Enter username here"  onChange={handleUsername} required/>
                        </div>
                    </label>
                
                    <label>
                        Password : 
                        <div>
                        <input type="password" name="password" placeholder="Enter password here"  onChange={handlePassword} required/>
                        </div>
                    </label>
                <div style={{paddingTop: 8}} className="creation-button-container">
                    <input type="submit" />
                </div>
            </form>
            </div>
            <div style={{paddingBottom: 145}}>
            </div>
        </>
    );

}
export default LoginPage;