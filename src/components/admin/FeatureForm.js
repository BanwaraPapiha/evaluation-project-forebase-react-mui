import React from 'react';
import { useForm } from 'react-hook-form';
import { Db } from "../../firebase-config/db";
import { collection, setDoc, doc, addDoc } from "firebase/firestore";
import { TextField, Container, Button, Grid, Stack, Paper } from '@mui/material';

export default function FeatureForm() {
  const usersCollectionRef = collection(Db, "features for evaluation");

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    const createFeature = async () => {
      await addDoc(usersCollectionRef, { feature: data.Feature, total_score: Number(data.Total_Scores) });
    };

    createFeature();
    console.log(data);
  }
  console.log(errors);

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3}>
        <Container maxWidth="xl">
          <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField fullWidth label="Feature to evaluate" variant="standard" {...register("Feature", {required: true, maxLength: 80})}/>
            <TextField fullWidth label="Total Possible Scores" variant="standard" {...register("Total_Scores", {required: true, maxLength: 4})}/>
            <Button fullWidth onClick={handleSubmit(onSubmit)} type="submit" variant="contained" component="span">Submit</Button>
            <br />
          </Stack>
          </form>
        </Container>
      </Paper>
    </Grid>
  );
}
