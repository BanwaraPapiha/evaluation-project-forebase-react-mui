import * as React from 'react';
import { MenuItem, Button, Avatar, Container, Menu, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import { useState, useEffect, useContext } from "react";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { Db } from "../../firebase-config/db";

export default function BasicMenu() {
    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=>{
        const activeSurveys = async () => {
            const querySnapshot = await getDocs(query(collection(Db, "surveys"), where("active", "==", "true")));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });    
        }
        activeSurveys();
    })

    return (
      <div>
        <Button
          id="basic-button" color='secondary' variant="contained"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
  