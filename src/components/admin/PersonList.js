import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';

function PersonList() {
    const [persons, setPersons] = useState([]);
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");
    
    useEffect(() => {
      const getPersons = async () => {
        const data = await getDocs(usersCollectionRef_persons);
        console.log(data.docs);
        setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getPersons();
    }, []);
  
    return (
      <Container>
        <Typography variant="h5" gutterBottom component="div">
        <h1>Persons</h1>
        {persons.map((prsn) => {
          return (
            <div>
              <h5>id: {prsn.id} | Name: {prsn.Name} | Email: {prsn.Email}</h5>
            </div>
          );
        })}
        </Typography>
      </Container>
    );
  }
  
  export default PersonList;
  