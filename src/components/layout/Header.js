import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Typography, MenuList, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {SurveyCTx} from '../../providers/surveyctx'
import { UserContext } from "../../providers/userCtx";
import { getAuth, signOut } from "firebase/auth";
import PersonIcon from '@mui/icons-material/Person';
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";

const auth = getAuth();

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const UserCtx = useContext(UserContext)
  const SurveyData = useContext(SurveyCTx);
  const currentSurvey = SurveyData.survey[0]['name']
  const [admins, setAdmins] = useState([])
  const admins2 = [];
  const AdminCollectionRef = collection(Db, "Admins");
  const q = query(AdminCollectionRef, where('email', 'in', ['baanwarapapiha@gmail.com', 'baanwarapapihaJapan@gmail.com']));

  useEffect(() => {
    const getAdmins = async () => {
      const data = await getDocs(AdminCollectionRef);
      console.log(data.docs);
      setAdmins(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAdmins();
    admins.map((a)=>{console.log(a.email);admins2.push(a.email)})
    // console.log(admins.includes('baanwarapapiha@gmail.com'))
    console.log(admins2)
    console.log(admins2.includes(UserCtx.Loguser.email))
  }, []);

  function RequireAuth({ children }) {
    // const location = useLocation();
  
    return admins2.includes(UserCtx.Loguser.email) === true
      ? children
      : navigate('/');
  }

  const linked_pages = [
    { "page": "Charts", "route": "/charts"}, 
    { "page": "Bounty", "route": "/bounty"}, 
    { "page": currentSurvey, "route": "/admin"},
  ];
  const linked_settings = [
    { "page": "Home", "route": "/"}, 
    { "page": "Profile", "route": "/profile"}, 
    { "page": "Logout", "route": "/logout"}, 
  ];
  const LogoutGoogle = () => {
    signOut(auth).then(() => {
      console.log("Sign Out Successful")
      // Sign-out successful.
    }).catch((error) => {
        console.log(error)
      // An error happened.
    });
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

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            {/* Logo of large screens */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Evaluation System
          </Typography>

            {/* Menu ? NAv for small screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {linked_pages.map((page) => (
                <MenuItem key={page} onClick={() => {
                        handleCloseNavMenu();
                        navigate(page.route);}}>
                <Typography textAlign="center">{page.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

            {/* Logo for small screens */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Evaluation System Small
          </Typography>

            {/* Menu / Nav for large screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            {linked_pages.map((page) => (
              <Button key={page} onClick={() => {navigate(page.route);
                    // handleCloseNavMenu();
            }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.page}
              </Button>
            ))}
          </Box>

          {/* This is for Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {auth.currentUser?
                <Avatar alt="Profile Photo" src={UserCtx.Loguser.photoURL} />:
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
                <MenuItem onClick={()=>{handleCloseUserMenu();navigate('/account')}}>
                  <ListItemText>Account</ListItemText>
                </MenuItem>
                <MenuItem onClick={()=>{handleCloseUserMenu();navigate('/')}}>
                  <ListItemText>Survey</ListItemText>
                </MenuItem>
                <MenuItem onClick={()=>{handleCloseUserMenu();LogoutGoogle();navigate('/account');}}>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </MenuList>
                :
              <MenuList>
                <MenuItem onClick={()=>{handleCloseUserMenu();navigate('/account')}}>
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
