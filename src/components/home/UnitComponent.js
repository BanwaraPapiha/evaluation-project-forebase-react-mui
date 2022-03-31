import { useState, useContext } from "react";
import { Slider, Grid, Paper, Typography, Container, Chip, 
  Card, CardActions, CardContent } from '@mui/material';
  import { PointsCtx } from "../../providers/pointsctx";
  
function UnitComponent(props) {
  const [slide_score, setSlide_score] = useState(0);
  // const [val, setVal] = useState({});
  const points = useContext(PointsCtx)
  let keyName1 = props.person.Email;

  const HandleChange = (e) => {
    let slide_score = e.target.value; 
    setSlide_score(e.target.value)
    // const response = {
    //   evaluator: props.person.Email, 
    //   feature: props.featureId,
    //   points: slide_score, 
    // };
    const response = {
      slide_score, 
    };
    const test = {...props.parentData};
    test[keyName1] = slide_score;
    // console.log(test);

    console.log(props.parentData)
    props.updateParent(test)
    // setVal(test)
    // console.log(val)
    console.log(props.parentData[keyName1])
  }

  return (
    <Grid item sm={12} md={6}>
      <Card elevation={10}>
        <CardContent>
        <Paper elevation={6} style={{padding: "10px"}}>
        {/* Score Awarded: <Chip variant="outlined" label={props.parentData[keyName1]} color="info" /> */}
        Score Awarded: <Chip variant="outlined" label={props.parentData[keyName1]} color="info" />
        {/* Score Awarded: <Chip variant="outlined" label={slide_score} color="info" /> */}
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