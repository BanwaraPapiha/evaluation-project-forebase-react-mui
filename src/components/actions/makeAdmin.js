import React from 'react';
import { useForm } from 'react-hook-form';
import { Db } from "../../firebase-config/db";
import {arrayUnion, arrayRemove, updateDoc, doc, setDoc} from "firebase/firestore";
import { TextField, Container, Button, Grid, Stack, Paper } from '@mui/material';

export default function MakeAdminForm() {  
  const { register, handleSubmit, formState: { errors } } = useForm();  
  const onSubmit = data => {
    const createAdmin = async () => {
      const ref = doc(Db, "Admins", "admins_list");
      await updateDoc(ref, {
        admins_list: arrayUnion(data.Admin)
      });    
    };
    createAdmin();
    console.log(data);
  }
  console.log(errors);

  return (
    <Grid item xs={12} md={12}>
    <Paper elevation={3}>
    <Container maxWidth="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
            <br/>
            <TextField fullWidth label="Add to Admins" variant="standard" {...register("Admin", {required: true, maxLength: 80})}/>
            <Button fullWidth onClick={handleSubmit(onSubmit)} type="submit" variant="contained" component="span">Add</Button>
            <br />
        </Stack>
        </form>
    </Container>
    </Paper>
    </Grid>
);
}
