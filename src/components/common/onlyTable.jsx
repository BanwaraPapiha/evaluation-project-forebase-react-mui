import { Paper, Typography, Button, TextField, Container, Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';

const SingleRow = (props) => {
  const [acc_dec_by, setAcc_dec_by] = useState(1);
  const [acc_dec_score, setAcc_dec_score] = useState(props.Total_sum_Score);
  const baseScore = props.Total_sum_Score;
  // console.log(props.ac_de_data)

  const upward = () => {
    const updating = () => {
      setAcc_dec_by(acc_dec_by+0.5)
      console.log(acc_dec_by)
    }
    updating()
    setAcc_dec_score(baseScore*(acc_dec_by))
    update_tbody()
  }

  const downward = () => {
    setAcc_dec_by(acc_dec_by-0.25)
    setAcc_dec_score(baseScore*(acc_dec_by))
    update_tbody()
  }

  const rowww = {
    Email: props.email,
    Name: props.name,
    Total_sum_Score: baseScore,
    ac_de_by: acc_dec_by,
    acc_dec_score: acc_dec_score,
  }

  const update_tbody = () => {
    console.log(rowww)
    var keyRow = props.email
    var test23 = {...props.ac_de_data}
    test23[keyRow] = rowww
    props.setAc_de_data(test23)
  }

  return(
    <TableRow key={props.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">{props.name}</TableCell>
      <TableCell align="right">{props.email}</TableCell>
      <TableCell align="right"><ArrowUpwardIcon onClick={upward}/></TableCell>
      <TableCell align="right">{acc_dec_by}</TableCell>
      <TableCell align="right"><ArrowDownwardIcon onClick={downward}/></TableCell>
      <TableCell align="right">{props.Total_sum_Score}</TableCell>
      <TableCell align="right">{acc_dec_score}</TableCell>
      <TableCell align="right"><AnalyticsOutlinedIcon onClick={()=>{alert("graphs")}}/></TableCell>
    </TableRow>
  )
}

function Only_Table(props) {
  // const [ac_de_data, setAc_de_data] = useState({});

  function createData(
      name: string,
      email: number,
      acc_dec_by: number,
      Total_sum_Score: number,
      acc_dec_score: number,
    ) {
      return { name, email, acc_dec_by, Total_sum_Score, acc_dec_score };
  }

  const newRow =[]
  {props.table_datum.map((prsn) => {
    return (
      newRow.push(createData(prsn.Name, prsn.Email, prsn.Accelrated_or_decelerated_by, prsn.Total_sum_Score, prsn.acc_dec_score))
      )})
  }
  // console.log(newRow);
  var total = 0;
  const countSum = () => {
    props.ac_de_data.forEach(item => {
      total += item.acc_dec_score;
  });
  console.log(total)
  }

  props.ac_de_data.length > 1 ?
  countSum() :
  console.log(props.ac_de_data)

  console.log(total)

  return (
    <TableContainer component={Paper}>
      Total Points Calculated are: {
      props.ac_de_data.length > 1 ? 
      props.ac_de_data.map(k => k.acc_dec_score).reduce((acc, k) => Number(k) + Number(acc)) : 
      "Not Loaded"}

      Total Points Calculated are: {props.ac_de_data.length}

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Accelerate</TableCell>
            <TableCell align="right">Accelerated/Decelerated By</TableCell>
            <TableCell align="right">Decelerate</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Accelerated/Decelerated Score</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {newRow.map((row) => (
            <SingleRow 
            name={row.name} email={row.email} Total_sum_Score={row.Total_sum_Score}
            ac_de_data={props.ac_de_data} setAc_de_data={props.setAc_de_data}
            />
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default Only_Table;