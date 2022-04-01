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
  console.log('acc_dec_score')
  console.log(acc_dec_score)

  return(
    <TableRow key={props.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">{props.name}</TableCell>
      <TableCell align="right">{props.email}</TableCell>
      <TableCell align="right">{acc_dec_by}</TableCell>
      <TableCell align="right">{props.Total_sum_Score}</TableCell>
      <TableCell align="right">{acc_dec_score}</TableCell>
      <TableCell align="right"><AnalyticsOutlinedIcon onClick={()=>{alert("graphs")}}/></TableCell>
    </TableRow>
  )
}

function ChartsTable(props) {
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
  console.log(props.ac_de_data)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Accelerated/Decelerated By</TableCell>
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
            scoresum={props.scoresum} bountySum={props.bountySum}
            />
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default ChartsTable;