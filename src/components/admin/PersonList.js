import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import PersonTable from "./PersonTable";

function PersonList() {
    const [persons, setPersons] = useState([]);
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");
    const [searchQuery, setSearchQuery] = useState("");
    const [newPerson, setNewPerson] = useState([]);
    const [newPersonObj, setNewPersonObj] = useState({});

    useEffect(() => {
      const getPersons = async () => {
        const data = await getDocs(usersCollectionRef_persons);
        // console.log(data.docs);
        setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getPersons();
    }, []);

    //for array
    const filterData = (query, data) => {
      if (!query) {
        return data;
      } else {
        return data.filter((d) => String(d).toLowerCase().includes(query));
      }
    };
    //for object
    function queryObject(q, data){
      var results = [];
      console.log(q)
      for (const [key, value] of Object.entries(persons)) {
        for (const xyz of Object.entries(persons[key])) {
          // delete persons[key].id; 
          // console.log("ID is: ", persons[key].id)
          let found = JSON.stringify(persons[key]).toLowerCase().includes(String(q).toLowerCase())
          console.log("Found ", String(q).toLowerCase(), " Or Not: ", found);
          if (found) {
            // results.push(persons[key])
            const index = results.findIndex(object => object.id === persons[key].id);

            if (index === -1) {
              results.push(persons[key])
            }
          }
          console.log("Length: ", results.length)
          console.log(results)
        }

      }
    }
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      queryObject(searchQuery, persons)
    }

    // let body = filterData(searchQuery, persons);
    let body = persons;

    return (
      <Container>
        <Typography variant="h5" gutterBottom component="div">
        <h1>Persons</h1>
        <TextField fullWidth label="fullWidth" id="fullWidth" onChange={handleSearch}/>

        </Typography>
        <PersonTable title={["Id", "Name", "Email", "Add", "Delete"]} body={body}/>

      </Container>
    );
  }
  
  export default PersonList;
  