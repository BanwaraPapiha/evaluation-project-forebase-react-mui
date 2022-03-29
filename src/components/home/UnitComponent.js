import { useState } from "react";
import { Slider, Grid, Paper, Typography, Container, Chip, Card, CardActions, CardContent } from '@mui/material';
import { Db } from "../../firebase-config/db";
import {
  collection, addDoc,
  // getDocs, updateDoc, deleteDoc, doc,
} from "firebase/firestore";

function UnitComponent(props) {
  const usersCollectionRef_eval_data = collection(Db, "evaluation data");
  const handleSubmit = (event, data) => {
    event.preventDefault();
    const createEvalData = async () => {
      await addDoc(usersCollectionRef_eval_data, { 
        feature: props.feature, total_score: 100, 
        being_evaluated: "person.id111", evaluator: 'data.evaluator', 
        score_awarded: 90, 
      });
    };
    createEvalData();
    console.log(data);
  }

  const [slide_score, setSlide_score] = useState(0);
  
  const HandleChange = (e) => {
    let slide_score = e.target.value; 
    setSlide_score(e.target.value)
    props.availableScoreList[props.person.Email] = slide_score;
    console.log(props.availableScoreList)
  }

  return (
        <Grid item sm={12} md={6}>
          <Card elevation={10}>

          <CardContent>
            <Paper elevation={6} style={{padding: "10px"}}>
              Score Awarded: <Chip variant="outlined" label={slide_score} color="info" />
            </Paper>

            <Typography gutterBottom variant="h5" component="div">
            Name: { props.person.Name } <br />
            Email: { props.person.Email } <br />
            </Typography>

            <Typography variant="body2" color="text.secondary">
            You can give a total scores of: {props.feature_score} <br />
            Points left for scoring: {(props.feature_score)-(slide_score)} <br />
            Stats =&gt; Given: {props.feature_score} <br />

            </Typography>
          </CardContent>

          <CardActions>
            <Container>
              <Slider defaultValue={0}  max={props.scores} step={0.5} 
                aria-label="Default" valueLabelDisplay="auto" 
                onChange={HandleChange}
              />
            </Container>
          </CardActions>

          <Typography variant="caption" display="block" gutterBottom>
            id: { props.person.id }
          </Typography>
          </Card>

        </Grid>
);
}

export default UnitComponent;
