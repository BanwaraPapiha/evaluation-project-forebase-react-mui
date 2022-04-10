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
    var results = new Array();
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
      for( let i=0;i<data.length;i++){
          for(let Key in data[i]){
              if(String(data[i][Key]).indexOf(q) > -1){
                results.push(data[i]);
              }
          }
      }

      if(results.length){
          return JSON.stringify(results);
          console.log(results);
      }else{
          return "No match!";
      }
  }
  
    useEffect(() => {
      const getPersons = async () => {
        const data = await getDocs(usersCollectionRef_persons);
        // console.log(data.docs);
        setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getPersons();
    }, []);

    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      queryObject(searchQuery, persons)
    }
    let body = filterData(searchQuery, persons);

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
  