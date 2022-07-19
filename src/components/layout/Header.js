import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { MenuItem, Tooltip, Button, Avatar, Container, Menu, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import { Typography, MenuList, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { SurveyCTx } from '../../providers/surveyctx'
import { UserContext } from "../../providers/userCtx";
import { getAuth } from "firebase/auth";
import { Db } from "../../firebase-config/db";
import { getDoc, doc } from "firebase/firestore";
import BasicMenu from "./SurveyMenu";

const auth = getAuth();

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const UserCtx = useContext(UserContext)
  const SurveyData = useContext(SurveyCTx);
  const currentSurvey = SurveyData.survey[0]['name']
  // const [admins, setAdmins] = useState([])
  const user = auth.currentUser;
  const navigate = useNavigate();

  var linked_pages = []
  if (UserCtx.admin) {
    linked_pages = [
      { "page": "Actions", "route": "/actions"}, 
      { "page": "Data Units", "route": "/charts"}, 
      { "page": "Bounty", "route": "/bounty"}, 
      { "page": "Manage Surveys", "route": "/admin"},
      { "page": <BasicMenu user_scope="admin"/>,},
    ];
  } 
  else if (UserCtx.Loguser!==null) {
    linked_pages = [
      { "page": <BasicMenu user_scope="client_user"/>,},
    ];
  } 
  else {
    linked_pages = [
      { "page": null,},
    ];
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            {/* Logo of large screens */}
          <Typography variant="h5" noWrap component="div" fontFamily={'Abril Fatface'}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Performance Management System
          </Typography>

          {/* Menu/Nav for small screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
            aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar" keepMounted open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
            anchorEl={anchorElNav}
            anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}
            transformOrigin={{vertical: 'top',horizontal: 'left',}}
            sx={{display: { xs: 'block', md: 'none' },}}
          >
            {
              UserCtx.Loguser!==null
              ?
              linked_pages.map((page) => (
                <MenuItem key={page} onClick={()=>{handleCloseNavMenu();navigate(page.route)}}>
                <Typography textAlign="center">{page.page}</Typography>
                </MenuItem>
              ))
              : null
            }
          </Menu>
          </Box>

            {/* Logo for small screens */}
          <Typography variant="h6" component="p" align='center' fontFamily={'Abril Fatface'} sx={{ lineHeight: '1.4', flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            Performance Management System
          </Typography>
          
            {/* Menu / Nav for large screens */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {
                UserCtx.Loguser!==null
                ?
                linked_pages.map((page) => (
                  <Button key={page} onClick={() => {navigate(page.route)}}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.page}
                  </Button>
                ))
                : null
              }
            </Box>  
          
          {/* This is for Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {auth.currentUser
                ?
                <Avatar alt={UserCtx.Loguser.displayName} src={UserCtx.Loguser.photoURL} />
                :
                <Avatar alt="Login"><PersonIcon/></Avatar>}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {auth.currentUser?
              <MenuList>
                <MenuItem onClick={()=>{handleCloseUserMenu();navigate('/survey')}}>
                  <ListItemText>Survey</ListItemText>
                </MenuItem>
                <MenuItem onClick={()=>{handleCloseUserMenu();navigate('/')}}>
                  <ListItemText>Account</ListItemText>
                </MenuItem>
              </MenuList>
                :
              <MenuList>
                <MenuItem onClick={()=>{handleCloseUserMenu();navigate('/')}}>
                  <ListItemText>Account</ListItemText>
                </MenuItem>

              </MenuList>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
