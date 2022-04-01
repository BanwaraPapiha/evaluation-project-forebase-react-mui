import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack } from '@mui/material';
import Only_Table from '../common/onlyTable';

function Bounty() {
    const [ac_de_data, setAc_de_data] = useState({});
    const [persons, setPersons] = useState([]);
    const [scoresum, setScoreSum] = useState([]);
    const [bountySum, setBountySum] = useState([]);
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");

    const handleDivide = () => {      
      var size = Object.keys(ac_de_data).length;
      alert(size);
      if (size>1) {
        var total = 0;
        Object.keys(ac_de_data).forEach(function (key){
          console.log(Number(ac_de_data[key]['acc_dec_score']));
          total += Number(ac_de_data[key]['acc_dec_score'])
          // console.log(typeof(Number(ac_de_data[key]['acc_dec_score'])));
      });
      }
      setScoreSum(total)
      console.log(total)

    }

    const handleBountySum = (e) => {
      let xyz = e.target.value;
      // console.log(xyz)
      setBountySum(Number(xyz))
    }

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
        <Typography variant="h5" gutterBottom component="div">
            visible to admin only for each username <br/>
            Total Points Calculated are: {persons.length > 1 ? persons.map(k => k.acc_dec_score).reduce((acc, k) => Number(k) + Number(acc)) : "Not Loaded"}
            <br />
            Total Points Score is: {scoresum}
        </Typography>

        <Paper elevation={5} >
          <Container>
            <Stack spacing={2}>
              <Typography variant="h6" gutterBottom component="div">
                  Divide Money Relatively <br/>
              </Typography>

              <TextField
                fullWidth id="outlined-number" label="Number" 
                type="number" InputLabelProps={{shrink: true,}}
                onChange={handleBountySum}
              />
              <Button fullWidth variant="contained" onClick={handleDivide}>Divide money</Button>
              <br/><br/>

            </Stack>
          </Container>
        </Paper>

      <Only_Table table_datum={persons} ac_de_data={ac_de_data} setAc_de_data={setAc_de_data} scoresum={scoresum} bountySum={bountySum}/> 
    </Stack>
    );
  }
  
  export default Bounty;
  