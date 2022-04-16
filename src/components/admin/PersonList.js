import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import PersonTable from "./PersonTable";
import PersonAddOnlyForm from "./PersonAddOnly";
import { doc, onSnapshot } from "firebase/firestore";
import { queryObject } from "./searchFx"
import { SurveyCTx } from "../../providers/surveyctx";

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
        <TextField fullWidth label="Search Persons" id="search-persons" onChange={handleSearch}/>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <PersonTable title={["Id", "Name", "Email", "Add", "Delete"]} body={body}/>
          </Grid>
          <Grid item xs={12} md={6}>
          <div>
            {addedUsers.map((x)=>{
              return (
                <li>{x}</li>
              )
            })}
          </div>
          </Grid>
        </Grid>
        <PersonAddOnlyForm id="PersonAddOnlyForm" /><br/>
      </Container>
    );
  }
  
  export default PersonList;
  