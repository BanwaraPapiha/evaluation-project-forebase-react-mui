import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import PersonTable from "./PersonTable";
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
            const personss = [];
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              personss.push(doc.data().Name);
              console.log(doc.id, " => ", doc.data().Name);
            });
            console.log("Current personss length: ", typeof(personss));
    
            for (const property in personss) {
              console.log(`${property}: ${personss[property]}`);
            }
            setPersons(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          });
        }
      getPersons();
    }, []);

    //for object
    function queryObject(q, data){
      if (!q) {
        return data;
      } else {
        // return data.filter((d) => String(d).toLowerCase().includes(query));
      var results = [];
      console.log(q)
      for (const [key, value] of Object.entries(persons)) {
        for (const xyz of Object.entries(persons[key])) {
          let found = JSON.stringify(persons[key]).toLowerCase().includes(String(q).toLowerCase())
          if (found) {
            const index = results.findIndex(object => object.id === persons[key].id);
            if (index === -1) { results.push(persons[key]) }
          }
          console.log("Found ", results.length>0?results.length:0, " Results")
          // console.log(results)
        }
      }
      if (results.length>=1) {
        return results
      }
      else {
        return [{Name: "No Matches"}];
      }
    }}

    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      queryObject(searchQuery, persons)
    }

    body = queryObject(searchQuery, persons);

    return (
      <Container>
        <Typography variant="h5" gutterBottom component="div">
        <h1>Persons</h1>
        <TextField fullWidth label="Search Persons" id="search-persons" onChange={handleSearch}/>

        </Typography>
        <PersonTable title={["Id", "Name", "Email", "Add", "Delete"]} body={body}/>

      </Container>
    );
  }
  
  export default PersonList;
  