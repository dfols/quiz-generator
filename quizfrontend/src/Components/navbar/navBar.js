import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import UserProfile from '../userSession/UserProfile';
import { styled } from '@mui/material/styles';

import "./navbar.css";


const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const [open, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
  }));

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleDrawer(true)} size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <p className="logo-text">Quiz Genie</p>
        </Typography>

        <Div style={{ fontSize: '12px' }}>{UserProfile.getFirstName() + " " + UserProfile.getLastName()}</Div>

        <Button sx={{ ml: 2  }} style={{ fontSize: '12px' }} color="inherit" href="/login">Sign out</Button>
      </Toolbar>
    </AppBar>

    <Drawer anchor="left" variant="temporary" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} PaperProps={{sx: { width: "12%" }}}>
      <List>
      <ListItemButton component="a" href="/dashboard" >
          <ListItemText primaryTypographyProps={{fontSize: '18px' , fontWeight: 'bold'}} primary="Home" />
      </ListItemButton>

      <ListItemButton component="a" href="/createsubject">
          <ListItemText primaryTypographyProps={{fontSize: '14px'}} primary="Add Subject" />
      </ListItemButton>

      <ListItemButton component="a" href="/createquestion">
          <ListItemText primaryTypographyProps={{fontSize: '14px'}} primary="Add Question" />
      </ListItemButton>

      <ListItemButton component="a" href="/chapterManagement">
          <ListItemText primaryTypographyProps={{fontSize: '14px'}} primary="View Subjects" />
      </ListItemButton>

      <ListItemButton component="a" href="/questionManagement">
          <ListItemText primaryTypographyProps={{fontSize: '14px'}} primary="View Questions" />
      </ListItemButton>

      <ListItemButton component="a" href="/createQuiz">
        <ListItemText primaryTypographyProps={{fontSize: '14px'}} primary="Generate Quiz" />
      </ListItemButton>
  </List>
</Drawer>
</>
  );     
};

export default Navbar;