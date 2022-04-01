import { Paper, Typography, Button, TextField, Container, Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';

const SingleRow = (props) => {
  const [acc_dec_by, setAcc_dec_by] = useState(1);
  const upward = () => {
    // alert(props.name)
    setAcc_dec_by(acc_dec_by+0.5)
  }
  const downward = () => {
    // alert(props.name)
    setAcc_dec_by(acc_dec_by-0.25)
  }
  return(
    <TableRow key={props.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">{props.name}</TableCell>
      <TableCell align="right">{props.email}</TableCell>
      <TableCell align="right"><ArrowUpwardIcon onClick={upward}/></TableCell>
      <TableCell align="right">{acc_dec_by}</TableCell>
      <TableCell align="right"><ArrowDownwardIcon onClick={downward}/></TableCell>
      <TableCell align="right">{props.Total_sum_Score}</TableCell>
      <TableCell align="right">{props.Total_sum_Score*acc_dec_by}</TableCell>
      <TableCell align="right"><AnalyticsOutlinedIcon onClick={()=>{alert("graphs")}}/></TableCell>
    </TableRow>
  )
}

function Only_Table(props) {
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
  {props.table_datum.map((prsn) => {
    return (
      newRow.push(createData(prsn.Name, prsn.Email, prsn.Accelerated, prsn.Decelerated, prsn.Accelrated_or_decelerated_by, prsn.Total_sum_Score, prsn.acc_dec_score))
      )})
  }
  console.log(newRow);

  return (
    <TableContainer component={Paper}>
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
            <SingleRow name={row.name} email={row.email} Total_sum_Score={row.Total_sum_Score}/>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default Only_Table;