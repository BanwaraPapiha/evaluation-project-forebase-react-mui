import { Slider, Grid } from '@mui/material';
import { Db } from "../../firebase-config/db";
import {
  collection,
  // getDocs,
  addDoc,
  // updateDoc,
  // deleteDoc,
  // doc,
} from "firebase/firestore";
import { Typography, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function UnitComponent(props) {
  const usersCollectionRef_eval_data = collection(Db, "evaluation data");

  const handleSubmit = (event, data) => {
    event.preventDefault();
    const createEvalData = async () => {

      await addDoc(usersCollectionRef_eval_data, { feature: props.feature, total_score: 100, 
        being_evaluated: "person.id", evaluator: 'data.evaluator', 
        score_awarded: 90
      });
    };

    createEvalData();
    console.log(data);
  }

  const HandleChange = (e) => {
    let slide_score = e.target.value; 
    props.updatePage(slide_score);
  } 

  return (
        <Grid item sm={12} md={6}>
          {/* <div style={{color: "red", border: "2px solid black"}}> */}
          {/* <Container maxWidth="sm"> */}
          <Card sx={{  }}>

          <CardContent>

            <Typography gutterBottom variant="h5" component="div">
            Name: { props.person.Name } <br />
            Email: { props.person.Email } <br />
            </Typography>

            <Typography variant="body2" color="text.secondary">
            You can give a total scores of: {props.scores} <br />
            Points left for scoring: {props.newScoreRange} <br />
            Stats =&gt; Given: {props.scroreDone} <br />

            <input type="text" value={props.scroreDone} onChange={(e) => {props.updatePage(e.target.value)}}/>
            <button type="submit" onClick={handleSubmit}>Submit</button>

            </Typography>
          </CardContent>

          <CardActions>
            <Container>
              <Slider defaultValue={0}  max={props.scores} step={0.5} aria-label="Default" valueLabelDisplay="auto" onChange={HandleChange} />
            </Container>
          </CardActions>

          <Typography variant="caption" display="block" gutterBottom>
            id: { props.person.id }
          </Typography>
          </Card>

          {/* </Container> */}

        {/* </div> */}
        </Grid>
);
}

export default UnitComponent;
