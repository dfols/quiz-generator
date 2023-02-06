import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UserProfile from '../userSession/UserProfile';
import { styled } from '@mui/material/styles';

import "./navbar.css";

const HomeNavbar = () => {
  
  return (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <p className="logo-text">Quiz Genie</p>
        </Typography>
        <Button style={{ fontSize: '12px' }} color="inherit" href="/createuser">Sign up</Button>
        <Button style={{ fontSize: '12px' }} color="inherit" href="/login">Log in</Button>
      </Toolbar>
    </AppBar>
  </>
  );     
};

export default HomeNavbar;