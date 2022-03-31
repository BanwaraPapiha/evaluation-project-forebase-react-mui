import { useState, useContext } from "react";
import { Slider, Grid, Paper, Typography, Container, Chip, 
  Card, CardActions, CardContent } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";

function UnitComponent(props) {
  const [slide_score, setSlide_score] = useState(0);
  const points = useContext(PointsCtx)
  let PersonEmail = props.person.Email;
  let FeatureName = props.featureId;

  const HandleChange = (e) => {
    let score_change = e.target.value;
    setSlide_score(score_change)
    let UniqId = PersonEmail.concat(FeatureName)
    console.log(UniqId);
    const newObj = {
      evaluator: PersonEmail, 
      being_eval: PersonEmail,
      feature: FeatureName,
      points: score_change,
    }

    const test = {...props.parentData};
    test[UniqId] = newObj;

    points.setPointsdata(test);
    console.log(points.pointsdata)
  }

  return (
    <Grid item sm={12} md={6}>
      <Card elevation={10}>
        <CardContent>
        <Paper elevation={6} style={{padding: "10px"}}>
        Score Awarded: <Chip variant="outlined" label={typeof(props.parentData[PersonEmail])==='undefined' ? 0 :props.parentData[PersonEmail]} color="info" />
        {/* Score Awarded: <Chip variant="outlined" label={typeof(props.parentData[keyName1]) ? props.parentData[keyName1]: 0} color="info" /> */}
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