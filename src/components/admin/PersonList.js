import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import PersonTable from "./PersonTable";
import PersonForm from "./PersonAdd";
import { doc, onSnapshot } from "firebase/firestore";
// import { queryObject } from "./Search"
import queryObject from "./Search"
import { SurveyCTx } from "../../providers/surveyctx";
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

function PersonList() {
    const [persons, setPersons] = useState([]);
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");
    const [searchQuery, setSearchQuery] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['name']
  
    var body = [];

    useEffect(() => {
      const getPersons = async () => {
        const querySnapshot = await getDocs(usersCollectionRef_persons);
        const unsubscribe = onSnapshot(usersCollectionRef_persons, (querySnapshot) => {
            setPersons(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          });
        }
      getPersons();
    }, []);

    useEffect(() => {
      const unsub = onSnapshot(doc(Db, "surveys", surveyCtx.survey[0]['id']), (doc) => {
        if (doc.exists()){
          console.log('doc exists')
          if(Object.keys(doc.data()).includes("users")){
            console.log("users field exists");
            const usersHere = doc.data().users;
            console.log(typeof(doc.data().users));
            setAddedUsers(usersHere)  
          } else {
            console.log("no key found")
            // Here
            const usersHere = ["No Existing Data, create New"];
            setAddedUsers(usersHere)
          }          
        }
    });
    }, [])

    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      queryObject(searchQuery, persons)
    }

    body = queryObject(searchQuery, persons);

    return (
      <Container>
        <Typography variant="h5" gutterBottom component="div">Persons</Typography>
        <TextField fullWidth label="Search Persons" id="search-persons" onChange={handleSearch}/><br/>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} style={{"overflow-x":"auto"}}>
            {/* <PersonTable title={["Id", "Name", "Email", "Add", "Delete"]} body={body}/> */}
            <PersonTable title={["Name", "Email", "Add/Remove", "Delete"]} body={body}/>
          </Grid>
          <Grid item xs={12} md={6}>

          <Box sx={{ bgcolor: 'background.paper' }}>
              <nav aria-label="secondary mailbox folders">
                <List>
                  {addedUsers.map((x)=>{
                  return (
                    addedUsers.length > 0? 
                    <ListItem disablePadding>
                      <ListItemButton component="a" href="#simple-list">
                        <ListItemText primary={x} />
                      </ListItemButton>
                    </ListItem>
                  :
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                      <ListItemText primary="Loading" />
                    </ListItemButton>
                  </ListItem>
                  )
                  })}
                </List>
              </nav>
            </Box>

            {/* {addedUsers.length>0 && addedUsers.map((x)=>{
              return (
                addedUsers.length > 0? 
                <li>{x}</li>:
                <li>Loading</li>
              )
            })} */}
          </Grid>
        </Grid>
        <PersonForm id="PersonAddOnlyForm" /><br/>
      </Container>
    );
  }
  
  export default PersonList;
  