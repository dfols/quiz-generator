import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UserProfile from '../userSession/UserProfile';
import { styled } from '@mui/material/styles';
import "./navbar.css";

const NavBarToDash = () => { 


  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
  }));

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <p className="logo-text">Quiz Genie</p>
        </Typography>
        <Div style={{ fontSize: '12px' }}>{UserProfile.getFirstName() + " " + UserProfile.getLastName()}</Div>
        <Button color="inherit" style={{ fontSize: '12px' }} href="/dashboard">Dashboard</Button>
      </Toolbar>
    </AppBar>
  </>
  );
};

export default NavBarToDash;