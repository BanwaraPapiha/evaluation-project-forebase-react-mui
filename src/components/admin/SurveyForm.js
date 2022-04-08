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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField, Container, Button, Grid, Stack, Paper } from '@mui/material';

export default function SurveyForm() {
    const usersCollectionRef_survey = collection(Db, "surveys");
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const onSubmit = data => {
      const createSurvey = async () => {
        await addDoc(usersCollectionRef_survey, { name: data.Survey_Name, active: data.Active });
      };
      createSurvey();
      console.log(data);
    }
    console.log(errors);
      console.log(errors);

  return (
    <Grid item xs={12} md={12}>
      <Paper elevation={3}>
        <Container maxWidth="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <TextField fullWidth label="Survey Name" variant="standard" {...register("Survey_Name", {required: true, maxLength: 80})} />
                <FormLabel>Is the Survey Active</FormLabel>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" {...register("Active", { required: true })}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" {...register("Active", { required: true })}/>
                </RadioGroup>
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
