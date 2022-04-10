import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import PersonTable from "./PersonTable";
import PersonAddOnlyForm from "./PersonAddOnly";
import { doc, onSnapshot } from "firebase/firestore";
import { queryObject } from "./searchFx"

function PersonList() {
    const [persons, setPersons] = useState([]);
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");
    const [searchQuery, setSearchQuery] = useState("");
    // const [newPerson, setNewPerson] = useState([]);
    // const [newPersonObj, setNewPersonObj] = useState({});
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

    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      queryObject(searchQuery, persons)
    }

    body = queryObject(searchQuery, persons);

    return (
      <Container>
        <Typography variant="h5" gutterBottom component="div">Persons</Typography>
        <PersonAddOnlyForm/><br/>
        <TextField fullWidth label="Search Persons" id="search-persons" onChange={handleSearch}/>
        <PersonTable title={["Id", "Name", "Email", "Add", "Delete"]} body={body}/>
      </Container>
    );
  }
  
  export default PersonList;
  