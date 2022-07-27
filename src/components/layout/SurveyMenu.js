import * as React from 'react';
import { MenuItem, Button, Avatar, Container, Menu, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import { useState, useEffect, useContext } from "react";
import { collection, query, where, doc, onSnapshot, getDocs } from "firebase/firestore";
import { Db } from "../../firebase-config/db";
import { SurveyCTx } from "../../providers/surveyctx";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default function BasicMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [actSurve, setActSurve] = useState([]);
    const open = Boolean(anchorEl);
    const user = auth.currentUser;
    const surveyCtx = useContext(SurveyCTx);
    const navigate = useNavigate();

    const handleClick = (e) => {
      if (user) {
        setAnchorEl(e.currentTarget);
      }
    };

    const handleClose = (dval) => {
      setAnchorEl(null); 
    };

    const handleOnClose = (y) => {
      surveyCtx.setSurvey([y])
      if (props.user_scope!=="admin") {
        allowd(y.users);
      }
      navigate("/survey")
      
    }

    const allowd = (arr) => {
      if (arr.includes()) {
        console.log(arr)
        console.log("Found and Allowed")
        navigate('/survey')
      }
      else {
        console.log(arr)
        navigate('/')
        // alert("You are not in this survey")
      }
    }

    useEffect(()=>{
      const fetchSurve = async () => {
        console.log("Changed")
        var q = query(collection(Db, "surveys"), where("active", "==", true));
        if (props.user_scope==="admin") {
          q = query(collection(Db, "surveys"));
        }
        // const q = query(collection(Db, "surveys"), where("active", "==", true));
        const querySnapshot = await getDocs(q);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          setActSurve(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          });
        }
        fetchSurve();
    }, [open])

    return (
      <div>
        <Button
          aria-controls={open ? 'basic-menu' : undefined} id="basic-button" color='secondary' variant="contained"
          aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleClick}
        >
          {surveyCtx.survey[0]['name']}
        </Button>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {actSurve.map((x)=>{
            return (
              <MenuItem key={x.name} onClick={()=>{handleClose(x);handleOnClose(x)}}>{x.name}</MenuItem>
            )
          })}
        </Menu>
      </div>
    );
  }
