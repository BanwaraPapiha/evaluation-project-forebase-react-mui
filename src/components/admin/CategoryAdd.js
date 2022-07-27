import React from 'react';
import { useForm } from 'react-hook-form';
import { Db } from "../../firebase-config/db";
import { useEffect, useState, useContext } from "react";
import {collection, addDoc, doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import { TextField, Container, Button, Grid, Stack, Paper } from '@mui/material';
import { SurveyCTx } from "../../providers/surveyctx";

export default function CategoryForm() {
  const usersCollectionRef = collection(Db, "persons to be evaluated");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nameInput = React.useRef(null);
  const surveyCtx = useContext(SurveyCTx)
  const Curr_survey = surveyCtx.survey[0]['id']
  const SurveyDocRef = doc(Db, "surveys", Curr_survey)


  const onSubmit = data => {
    const createCategory = async () => {
      try{
        // const Ref = doc(Db, "surveys", SurveyDocRef);
        await updateDoc(SurveyDocRef, {
          cats: arrayUnion(data.Category)
        });   
      }
      catch(err) {
        console.log(err)
        alert('An Error Occured in creating category')
        console.err(err)
      }
    };
    createCategory();
    console.log(data);
  }
  console.log(errors);

  return (
    <Paper elevation={3} sx={{width: '100%'}}>
    <Container maxWidth="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
            <TextField fullWidth label="Category" variant="standard" {...register("Category", {required: true, maxLength: 80})} />
            <Button fullWidth onClick={handleSubmit(onSubmit)} type="submit" variant="contained" component="span">Submit</Button>
            <br />
        </Stack>
        </form>
    </Container>
    </Paper>
);
}
