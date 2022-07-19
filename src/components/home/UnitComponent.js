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
    return null
  }

  return (
    <Grid item sm={12} md={6}>
      <Card elevation={4} style={{minHeight: '200px', width: { md: '100%', xs: '85vw' , sm: '85vw'}}}>
        <CardContent>
          <div style={{padding: "10px", display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography>Score Awarded</Typography>
            <Chip variant="contained" label={(typeof(slide_score) === 'undefined') ? 0 : slide_score} color="info" />
          </div>
          <Typography gutterBottom variant="h6" component="div">
          Name: { props.person } <br />
          Email: { props.person } <br />
          </Typography>

          <Typography variant="body2" color="text.secondary">
          </Typography>
        </CardContent>

        <CardActions>
          <Container>
            <Slider defaultValue={0}  max={props.fet_scor} step={0.5} 
              aria-label="Default" valueLabelDisplay="auto" 
              onChange={HandleChange} color="secondary"
              value={slide_score}
            />
          </Container>
        </CardActions>
      </Card>
    </Grid>
);
}

export default UnitComponent;