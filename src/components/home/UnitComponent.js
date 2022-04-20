import { useState, useContext, useEffect } from "react";
import { Slider, Grid, Paper, Typography, Container, Chip, 
  Card, CardActions, CardContent } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";
import { SurveyCTx } from "../../providers/surveyctx";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "../../providers/userCtx";

function UnitComponent(props) {
  const [slide_score, setSlide_score] = useState(0);
  const points = useContext(PointsCtx)
  const surveyCtx = useContext(SurveyCTx)
  const survey = surveyCtx.survey[0]['name']
  const UserCtx = useContext(UserContext)
  const PersonName = JSON.parse(props.person).Name;
  const FeatureName = props.feature;
  const newObj = {
    survey: survey,
    evaluator: UserCtx.Loguser.email, 
    feature: props.feature,
    timestamp: serverTimestamp(),
  }

  const HandleChange = (e) => {
      let score_change = e.target.value;
      setSlide_score(score_change)
      props.setListData({...props.listData, [PersonName]:score_change})
      console.log(props.listData)
  }
  useEffect(() => {
    newObj.actualData = props.listData
    points.setPointsdata({...points.pointsdata, [props.feature]: newObj})
    console.log(points.pointsdata)
}, [props.listData]);

  return (
    <Grid item sm={12} md={6}>
      <Card elevation={10}>
        <CardContent>
        <Paper elevation={6} style={{padding: "10px"}}>
        Score Awarded: <Chip variant="outlined" label={(typeof(slide_score) === 'undefined') ? 0 : slide_score} color="info" />
        </Paper>
          <Typography gutterBottom variant="h5" component="div">
          Name: { JSON.parse(props.person).Name } <br />
          Email: { JSON.parse(props.person).Email } <br />
          Score: { JSON.parse(props.t_scores)} <br/>
          </Typography>

          <Typography variant="body2" color="text.secondary">
          You can give a total scores of: {props.t_scores} <br />
          Stats =&gt; Given: {slide_score} <br />
          </Typography>
        </CardContent>

        <CardActions>
          <Container>
            <Slider defaultValue={0}  max={props.t_scores} step={0.5} 
              aria-label="Default" valueLabelDisplay="auto" 
              onChange={HandleChange}
            />
          </Container>
        </CardActions>

        <Typography variant="caption" display="block" gutterBottom>
          &nbsp;&nbsp;&nbsp;Id: { JSON.parse(props.person).id }
        </Typography>
      </Card>
    </Grid>
);
}

export default UnitComponent;