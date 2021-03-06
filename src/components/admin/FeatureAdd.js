import React from 'react';
import { useForm } from 'react-hook-form';
import { Db } from "../../firebase-config/db";
import {collection, addDoc, doc, setDoc} from "firebase/firestore";
import { TextField, Container, Button, Grid, Stack, Paper } from '@mui/material';

export default function FeatureForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
    const featureInput = React.useRef(null);  
    const onSubmit = data => {
      const createFeature = async () => {
        await setDoc(doc(Db, "all_features", data.Feature), {feature: data.Feature});
      };
      createFeature();
      featureInput.current.value = "";
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
            <TextField fullWidth inputRef={featureInput} label="Add new feature" variant="standard" {...register("Feature", {required: true, maxLength: 80})}/>
            <Button fullWidth onClick={handleSubmit(onSubmit)} type="submit" variant="contained" component="span">Submit</Button>
            <br />
        </Stack>
        </form>
    </Container>
    </Paper>
    </Grid>
);
}
