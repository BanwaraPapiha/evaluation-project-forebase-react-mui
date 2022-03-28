import React from 'react';
import { useForm } from 'react-hook-form';
import { Db } from "../../firebase-config/db";
import {
  collection,
  // getDocs,
  addDoc,
  // updateDoc,
  // deleteDoc,
  // doc,
} from "firebase/firestore";

import { TextField, Container, Button, Grid, Stack, Paper } from '@mui/material';


export default function PersonForm() {
  const usersCollectionRef = collection(Db, "persons to be evaluated");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    const createPerson = async () => {
      await addDoc(usersCollectionRef, { Name: data.Name, Email: data.Email, accelerated: data.Accelerated,
        decelerated: data.Decelerated, ac_de_by: data.Accelrated_or_decelerated_by, 
        Total_sum_Score: data.Total_sum_Score, acc_dec_score: data.acc_dec_score });
    };
    createPerson();
    alert("The name is: " + data.Name + "and the email is: " + data.Email );
    console.log(data);
  }
  console.log(errors);

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3}>
        <Container maxWidth="xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField fullWidth label="Name" variant="standard" {...register("Name", {required: true, maxLength: 80})} />
              <TextField fullWidth label="Email" variant="standard" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
              
              <Container>
              <label>Accelerated</label>
              <input type="checkbox" placeholder="Accelerated" {...register("Accelerated", {required: false})} />          
              <label>Decelerated</label>
              <input type="checkbox" placeholder="Decelerated" {...register("Decelerated", {})} />

              </Container>

              <TextField fullWidth label="Accelrated or decelerated by" variant="standard" {...register("Accelrated_or_decelerated_by", {})} />
              <TextField fullWidth label="Total Sum of Score" variant="standard" {...register("Total_sum_Score", {})} />       
              <TextField fullWidth label="Ac/de-celerated Score" variant="standard" {...register("acc_dec_score", {})} />
              <Button fullWidth
                onClick={handleSubmit(onSubmit)} 
                type="submit" variant="contained" component="span">
              Submit
              </Button>
              <br />
            </Stack>
          </form>

        </Container>
      </Paper>
    </Grid>

  );
}
