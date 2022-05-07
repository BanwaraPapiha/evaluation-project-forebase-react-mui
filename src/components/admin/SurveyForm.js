import React from 'react';
import { useForm } from 'react-hook-form';
import { Db } from "../../firebase-config/db";
import { collection, setDoc, addDoc, doc } from "firebase/firestore";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField, Container, Button, Grid, Stack, Paper } from '@mui/material';
import {SurveyCTx} from "../../providers/surveyctx";
import { useState, useContext, useEffect } from "react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SurveyForm() {
  const CurrentSurvey = useContext(SurveyCTx);

  const [survey_active, setSurvey_active] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSurvey_active(event.target.value);
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  
    const onSubmit = data => {
      const createSurvey = async () => {
          await setDoc(doc(Db, "surveys", data.Survey_Name), { 
          name: data.Survey_Name, 
          // active: data.Active 
          active: survey_active 
        });
      };
      createSurvey();
      console.log(data);
      CurrentSurvey.setSurvey([{ 
        name: data.Survey_Name, 
        id: data.Survey_Name,
        // active: data.Active 
        active: survey_active 
      }])
    }
    console.log(errors);

  return (
    <Grid item xs={12} md={12}>
      <Paper elevation={3}>
        <Container maxWidth="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <TextField fullWidth label="Survey Name" variant="standard" {...register("Survey_Name", {required: true, maxLength: 80})} />

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Active</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={survey_active}
                  label="Active"
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>

                {/* <FormLabel>Is the Survey Active</FormLabel>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" {...register("Active", { required: true })}/>
                    <FormControlLabel value="No" control={<Radio />} label="No" {...register("Active", { required: true })}/>
                </RadioGroup> */}
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
