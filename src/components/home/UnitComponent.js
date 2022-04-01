import { useState, useContext } from "react";
import { Slider, Grid, Paper, Typography, Container, Chip, 
  Card, CardActions, CardContent } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";

function UnitComponent(props) {
  const [slide_score, setSlide_score] = useState(0);
  const [identifier, setIdentifier] = useState('');
  const points = useContext(PointsCtx)
  const PersonId = props.person.id;
  const FeatureName = props.featureId;
  let newObj = {
    evaluator: PersonId, 
    being_eval: PersonId,
    feature: FeatureName,
    points: 0
  }
  var feedComponent = 0;

  const HandleChange = (e) => {
    let score_change = e.target.value;
    setSlide_score(score_change)
    let UniqId = PersonId.concat(FeatureName)
    setIdentifier(String(UniqId));
    newObj = {
      evaluator: PersonId, 
      being_eval: PersonId,
      feature: FeatureName,
      points: score_change
    }
    // const newObj = [PersonId, PersonId, FeatureName, score_change]
    const test = {...points.pointsdata};
    test[UniqId] = newObj;
    // console.log(identifier)
    points.setPointsdata(test);
    console.log(points.pointsdata)
    const kis = Object.keys(points.pointsdata);
    // console.log(kis)
    if (identifier!=='' && kis.includes(identifier)){
      console.log("Hey Yaaaaaaaaaaaa")
      // feedComponent = points.pointsdata[identifier]['points'];
      feedComponent = String(points.pointsdata[identifier]['points']);
      console.log(feedComponent)
    }
  }

  // console.log(points.pointsdata[identifier]['points'])
  // console.log(points.pointsdata[identifier])
  return (
    <Grid item sm={12} md={6}>
      <Card elevation={10}>
        <CardContent>
        <Paper elevation={6} style={{padding: "10px"}}>
        {/* Score Awarded: <Chip variant="outlined" label={points.pointsdata[identifier]!=='undefined'?points.pointsdata[identifier]['points']:0} color="info" /> */}
        {/* Score Awarded: <Chip variant="outlined" label={0} color="info" /> */}
        Score Awarded: <Chip variant="outlined" label={feedComponent} color="info" />
        </Paper>

          <Typography gutterBottom variant="h5" component="div">
          Name: { props.person.Name } <br />
          Email: { props.person.Email } <br />
          </Typography>

          <Typography variant="body2" color="text.secondary">
          You can give a total scores of: {props.feature_score} <br />
          Your Unique Id is: {identifier} <br />
          {/* Points left for scoring: {(props.feature_score)-(slide_score)} <br /> */}
          {/* Points left for scoring: {props.feature_score-feedComponent} <br /> */}
          {/* Stats =&gt; Given: {points.pointsdata[identifier]['points']} <br /> */}
          Stats =&gt; Given: {feedComponent} <br />

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