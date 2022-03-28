import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack } from '@mui/material';
import Only_Table from '../common/onlyTable';

function Bounty() {
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
      <Stack spacing={4}>
        <br />
        {/* <Typography variant="h5" gutterBottom component="div">
            Bounty <br/>
            visible to admin only for each username <br/>
            divide money relatively <br/>
            Total Points Calculated are: {persons.length > 1 ? persons.map(k => k.acc_dec_score).reduce((acc, k) => Number(k) + Number(acc)) : "Not Loaded"}
        </Typography> */}

        <Paper elevation={5} >
          <Container>
            <Stack spacing={2}>
              <Typography variant="h6" gutterBottom component="div">
                  Divide Money Relatively <br/>
              </Typography>

              <TextField
              fullWidth
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button fullWidth variant="contained">Divide money</Button>
              <br/><br/>

            </Stack>
          </Container>
        </Paper>

      <Only_Table table_datum={persons}/> 
    </Stack>
    );
  }
  
  export default Bounty;
  