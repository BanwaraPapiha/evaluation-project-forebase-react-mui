import React from 'react';
import { useForm } from 'react-hook-form';
import { Db } from "../../firebase-config/db";
import {collection, addDoc} from "firebase/firestore";
import { TextField, Container, Button, Grid, Stack, Paper } from '@mui/material';

export default function PersonForm() {
  const usersCollectionRef = collection(Db, "persons to be evaluated");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nameInput = React.useRef(null);
  const emailInput = React.useRef(null);

  const onSubmit = data => {
    const createPerson = async () => {
      await addDoc(usersCollectionRef, { Name: data.Name, Email: data.Email });
    };
    createPerson();
    alert("The name is: " + data.Name + "and the email is: " + data.Email );
    nameInput.current.value = "";
    emailInput.current.value = "";
    console.log(data);
  }
  console.log(errors);

  return (
    <Grid item xs={12} md={12}>
    <Paper elevation={3}>
    <Container maxWidth="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
            <TextField fullWidth label="Name" variant="standard" inputRef={nameInput} {...register("Name", {required: true, maxLength: 80})} />
            <TextField fullWidth label="Email" variant="standard" inputRef={emailInput} {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
            <Button fullWidth onClick={handleSubmit(onSubmit)} type="submit" variant="contained" component="span">Submit</Button>
            <br />
        </Stack>
        </form>
    </Container>
    </Paper>
    </Grid>
);
}
