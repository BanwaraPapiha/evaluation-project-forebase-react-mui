import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import PersonTable from "./PersonTable";
import PersonForm from "./PersonAdd";
// import { queryObject } from "./Search"
import queryObject from "./Search"
import { SurveyCTx } from "../../providers/surveyctx";
import { Box, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import PendingIcon from '@mui/icons-material/Pending';

function PersonList() {
    const [persons, setPersons] = useState([]);
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");
    const [searchQuery, setSearchQuery] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);
    const [tracked_data, setTracked_data] = useState([]);
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
    }, [surveyCtx.survey[0]['id']])

    useEffect(()=>{
      const fetchTrack = async () => {
        const unsub = onSnapshot(doc(Db, "track_persons", Curr_survey), (doc) => {
          console.log("Tracked data: ", doc.data());
          setTracked_data(doc.data())
        });

        unsub();
      }
      fetchTrack()
    })
    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      queryObject(searchQuery, persons)
    }

    body = queryObject(searchQuery, persons);

    return (
      <Container>
        <br/><br/>
        <Typography variant="h4" gutterBottom component="div">Manage Persons</Typography>
        <TextField fullWidth label="Search Persons" id="search-persons" onChange={handleSearch}/><br/><br/>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} style={{"overflow-x":"auto"}}>
          <Typography variant="h6" gutterBottom component="div">All Persons</Typography>
            <PersonTable title={["Name", "Email", "Add/Remove", "Delete"]} body={body}/>
          </Grid>
          <Grid item xs={12} md={6}>

          <Typography variant="h6" gutterBottom component="div">Persons in this survey</Typography>
          <Box sx={{ bgcolor: 'background.paper' }}>
              <nav aria-label="secondary mailbox folders">
                <List>
                  {addedUsers.map((x)=>{
                  return (
                    addedUsers.length > 0? 
                    <ListItem disablePadding 
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        {tracked_data[[x]]?
                        <div>
                          <Typography variant="caption" component="p">Filled the Survey</Typography><DoneOutlineIcon style={{color:"green"}}/>
                        </div>
                        :
                        <div>
                          <Typography variant="caption" component="p">Pending</Typography>
                          <PendingIcon style={{color:"blue"}}/>
                        </div>}
                        
                      </IconButton>
                    }
                    >
                      <ListItemButton component="div">
                        <ListItemText primary={x} />
                      </ListItemButton>
                    </ListItem>
                  :
                  <ListItem disablePadding>
                    <ListItemButton component="div">
                      <ListItemText primary="Loading" />
                    </ListItemButton>
                  </ListItem>
                  )
                  })}
                </List>
              </nav>
            </Box>
          </Grid>
        </Grid>
        <br/><br/>
        <PersonForm id="PersonAddOnlyForm" /><br/>
      </Container>
    );
  }
  
  export default PersonList;
  