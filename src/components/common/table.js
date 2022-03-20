import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { Paper, Typography, Button, TextField, Container } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {
  collection,
  getDocs,
  // addDoc,
  // updateDoc,
  // deleteDoc,
  // doc,
} from "firebase/firestore";

function BountyMini() {
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

    function createData(
        name: string,
        email: number,
        acc: number,
        dec: number,
        acc_dec_by: number,
        Total_sum_Score: number,
        acc_dec_score: number,
      ) {
        return { name, email, acc, dec, acc_dec_by, Total_sum_Score, acc_dec_score };
      }
      
    const newRow =[]
    {persons.map((prsn) => {
      return (
        newRow.push(createData(prsn.Name, prsn.Email, prsn.Accelerated, prsn.Decelerated, prsn.Accelrated_or_decelerated_by, prsn.Total_sum_Score, prsn.acc_dec_score))
        )
      })}
    console.log(newRow);

    return (
      <>
        <Typography variant="h5" gutterBottom component="div">
            Bounty <br/>
            visible to admin only for each username <br/>
            divide money relatively <br/>
            Total Points Calculated are: {persons.length > 1 ? persons.map(k => k.acc_dec_score).reduce((acc, k) => Number(k) + Number(acc)) : "Not Loaded"}
        </Typography>
        <Paper elevation={5} >
            <Container>
            <Typography variant="h6" gutterBottom component="div">
                divide money relatively <br/>
            </Typography>
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained">Submit</Button>
          </Container>
        </Paper>
        
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">accelerated</TableCell>
              <TableCell align="right">accelerate</TableCell>
              <TableCell align="right">decelerated</TableCell>
              <TableCell align="right">decelerate</TableCell>
              <TableCell align="right">ac_de_by</TableCell>
              <TableCell align="right">Total_sum_Score</TableCell>
              <TableCell align="right">acc_dec_score</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRow.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.acc}</TableCell>
                <TableCell align="right"><button>Accelerate</button></TableCell>
                <TableCell align="right">{row.dec}</TableCell>
                <TableCell align="right"><button>Decelerate</button></TableCell>
                <TableCell align="right">{row.acc_dec_by}</TableCell>
                <TableCell align="right">{row.Total_sum_Score}</TableCell>
                <TableCell align="right">{row.acc_dec_score}</TableCell>
                <TableCell align="right"><button>View Graphical Form</button></TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

export default BountyMini;