import * as React from 'react';
import { MenuItem, Button, Avatar, Container, Menu, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import { useState, useEffect, useContext } from "react";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { Db } from "../../firebase-config/db";
import { SurveyCTx } from "../../providers/surveyctx";

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [actSurve, setActSurve] = useState([]);
    const open = Boolean(anchorEl);
    const surveyCtx = useContext(SurveyCTx);
    const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
    };

  useEffect(()=>{
      const fetchSurve = async () => {
        console.log("Changed")
        const q = query(collection(Db, "surveys"), where("active", "==", true));
        const querySnapshot = await getDocs(q);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          setActSurve(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          });
        }
        fetchSurve();
    }, [open])

    const handleClose = (surv) => {
      setAnchorEl(null);
      surveyCtx.setSurvey([surv])
      // console.log(surveyCtx.survey[0]['name'])
    };
    useEffect(()=>{
      console.log(surveyCtx.survey[0]['name'])
    }, [anchorEl])

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
          aria-controls={open ? 'basic-menu' : undefined} id="basic-button" color='secondary' variant="contained"
          aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleClick}
        >
          Dashboard
        </Button>
        {/* <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} */}
        <Menu id="basic-menu" anchorEl={anchorEl} open={open}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {actSurve.map((x)=>{
            return (
              <MenuItem onClick={()=>{handleClose(x)}}>{x.name}</MenuItem>
            )
          })}
        </Menu>
      </div>
    );
  }