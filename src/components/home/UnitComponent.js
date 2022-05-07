import { useState, useContext, useEffect } from "react";
import { Slider, Grid, Paper, Typography, Container, Chip, 
  Card, CardActions, CardContent } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";
import { SurveyCTx } from "../../providers/surveyctx";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "../../providers/userCtx";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function UnitComponent(props) {
  const [slide_score, setSlide_score] = useState(0);
  const points = useContext(PointsCtx)
  const surveyCtx = useContext(SurveyCTx)
  const PersonName = props.person;
  const FeatureName = props.feature;

  const curr_user = auth.currentUser.email;
  
  const HandleChange = (e) => {
    let score_change = e.target.value;
    console.log(score_change-slide_score)
    
    if ((score_change-slide_score)>0 && (Number(Math.abs(score_change-slide_score))+Number(props.score_done))>Number(props.fet_scor)) {
      console.log("Exceeding")
      props.setOpen(true)
    }

    if ((score_change-slide_score)>0 && (Number(Math.abs(score_change-slide_score))+Number(props.score_done))<=Number(props.fet_scor)) {
      console.log("Increasing")
      props.setOpen(false)
      setSlide_score(score_change)
      props.setListData({...props.listData, [PersonName]:score_change})  
    }

    if ((score_change-slide_score)<0) {
      console.log("Decreasing")
      props.setOpen(false)
      setSlide_score(score_change)
      props.setListData({...props.listData, [PersonName]:score_change})  
    }
  }

  useEffect(() => {
    points.setPointsdata({...points.pointsdata, [props.feature]: props.listData})
    console.log(points.pointsdata)
  }, [props.listData]);

  if (props.person===curr_user) {
    return (
      <Grid item sm={12} md={6}>
      <Card elevation={4}>
        <CardContent>
        <Paper elevation={1} style={{padding: "10px"}}>
        Score Awarded: <Chip variant="outlined" label={(typeof(slide_score) === 'undefined') ? 0 : slide_score} color="info" />
        </Paper>
          <Typography gutterBottom variant="h5" component="div">
          {/* Email: { JSON.parse(props.person).Email } <br /> */}
          Name: { props.person } <br />
          </Typography>
        </CardContent>

        <CardActions>
          <Container>
            <Typography variant="caption" display="block" gutterBottom>
              &nbsp;&nbsp;&nbsp; You can't evluate yourself
            </Typography>
          </Container>
        </CardActions>

        <Typography variant="caption" display="block" gutterBottom>
          &nbsp;&nbsp;&nbsp;Id: { props.person }
        </Typography>
      </Card>
    </Grid>
   
    )
  }

  return (
    <Grid item sm={12} md={6}>
      <Card elevation={4}>
        <CardContent>
        <Paper elevation={1} style={{padding: "10px"}}>
          Score Awarded: <Chip variant="outlined" label={(typeof(slide_score) === 'undefined') ? 0 : slide_score} color="info" />
        </Paper>
          <Typography gutterBottom variant="h6" component="div">
          {/* Email: { JSON.parse(props.person).Email } <br /> */}
          {/* Name: { props.person } <br /> */}
          Email: { props.person } <br />
          </Typography>

          <Typography variant="body2" color="text.secondary">
            You can give a total scores of: {props.fet_scor} <br />
            You already have given {props.score_done} of total scores <br />
            Remaining: {props.fet_scor-props.score_done} <br />
            {/* Stats =&gt; Given: {slide_score} <br /> */}
          </Typography>
        </CardContent>

        <CardActions>
          <Container>
            <Slider defaultValue={0}  max={props.fet_scor} step={0.5} 
              aria-label="Default" valueLabelDisplay="auto" 
              onChange={HandleChange}
              value={slide_score}
            />
          </Container>
        </CardActions>

        {/* <Typography variant="caption" display="block" gutterBottom>
          &nbsp;&nbsp;&nbsp;Id: { props.person }
        </Typography> */}
      </Card>
    </Grid>
);
}

export default UnitComponent;