import React, { Component, useState } from 'react';

import Table from '../Components/table';
import Navbar from '../Components/navbar/navBar'
import axios from 'axios';
import UserProfile from '../Components/userSession/UserProfile';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';


    const colNames = ["My Subjects"]
    /** 
    function test(evt){
        const testList =[
            {subject: "C"}
        
        ];
        return list;
    };
    **/
    class Dashboard extends Component {
        constructor(props) {
            super(props);
            this.state = {
              list: [],
            };
          }
          componentDidMount(){
            var user = UserProfile.getUsername(); 
            if (typeof user === undefined ){
                console.log("react session not active or username undefined")
            } 
            else {
            console.log(typeof UserProfile.getUsername());
            axios.get("http://localhost:8080/v1/subject/subjects/" + UserProfile.getUsername())
        .then((response) => {
            this.setState({list: response.data.map(item =>({subject: item.subjectName, subjectID: item.subjectID}))});
            //console.log(response.data);  
        })
        .catch(err => {
          if (err.response) {
            alert("error: 'Error when retrieving subjects: status: 'BAD_REQUEST'")
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            alert("Either no response was recieved, or a request was never sent.");
            console.log(err.request);
          }
        }); 
            }
          }
        render() {
            return (
            <div className="LandingPage">
                <Navbar/>
                  <Container maxWidth ="sm" sx={{p: 30}}>
                    <Paper elevation={2}>
                      <Table  list={this.state.list} colNames={colNames}/>
                    </Paper>
                  </Container>
            </div>
            )
        }
    }
    

export default Dashboard;
