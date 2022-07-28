import { useState, useContext, useEffect } from "react";
import { Slider, Grid, Paper, Typography, Container, Chip, 
  Card, CardActions, CardContent } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";
import { SurveyCTx } from "../../providers/surveyctx";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "../../providers/userCtx";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Db } from "../../firebase-config/db";

const auth = getAuth();

function UnitComponent(props) {
  const [slide_score, setSlide_score] = useState(0)
  const [name, setName] = useState(0)
  const points = useContext(PointsCtx)
  const surveyCtx = useContext(SurveyCTx)
  const PersonName = props.person;
  const FeatureName = props.feature;
  const curr_user = auth.currentUser.email;
  const [score_change, setscore_change] = useState(0)
  
  const HandleChange = (e) => {
    let score_change2 = e.target.value;
    setscore_change(score_change2)
    console.log(score_change2-slide_score)
    console.log('props.listData')
    console.log(props.listData)
    
    // if ((score_change-slide_score)>0 && (Number(Math.abs(score_change-slide_score))+Number(props.score_done))>Number(props.fet_scor)) {
    //   console.log("Exceeding")
    //   props.setOpen(true)
    // }

    // if ((score_change-slide_score)>0 && (Number(Math.abs(score_change-slide_score))+Number(props.score_done))<=Number(props.fet_scor)) {
    //   console.log("Increasing")
    //   props.setOpen(false)
    //   setSlide_score(score_change)
    //   props.setListData({...props.listData, [PersonName]:score_change})  
    // }

    // if ((score_change-slide_score)<0) {
    //   console.log("Decreasing")
    //   props.setOpen(false)
    //   setSlide_score(score_change)
    //   props.setListData({...props.listData, [PersonName]:score_change})  
    // }
  }

  useEffect(()=>{
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

  }, [score_change])

  useEffect(()=>{
    const fetchName = async () => {
      const q = query(collection(Db, "persons to be evaluated"), where("Email", "==", props.person));

      const querySnapshot = await getDocs(q);
      var tmpName = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        tmpName.push({id: doc.id, ...doc.data()})
      });
      setName(tmpName)
    }
    fetchName()
    setSlide_score(0)
  }, [props.fet_scor])

  useEffect(() => {
    points.setPointsdata({...points.pointsdata, [props.feature]: props.listData})
    console.log(points.pointsdata)
  }, [props.listData, props.fet_scor]);

  if (props.person===curr_user) {
    return null
  }

  return (
    <Grid item sm={12} md={6}>
      <Card elevation={6} style={{ borderRadius: 20, minHeight: '200px', width: { md: '100%', xs: '95vw' , sm: '95vw'}}}>
        <CardContent>
          <div style={{padding: "10px", display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography>Score Awarded</Typography>
            <Chip variant="contained" label={(typeof(slide_score) === 'undefined') ? 0 : slide_score} color="info" />
          </div>
          {/* Medium Screen */}
          <Typography gutterBottom variant="body1" sx={{ display: {xs: 'none', sm: 'none', md: 'block'}, overflow: 'auto', whiteSpace: 'nowrap'}}>
          Name: {name && name.length>0 && name[0].Name!=='undefined'?String(name[0].Name):'Loading'} <br />
          Email: { props.person } <br />
          </Typography>
          {/* Small Screen */}
          <Typography gutterBottom variant="body1" sx={{ display: {xs: 'block', sm: 'block', md: 'none'}, width: 300, overflow: 'auto', whiteSpace: 'nowrap'}}>
          Name: {name && name.length>0 && name[0].Name!=='undefined'?String(name[0].Name):'Loading'} <br />
          Email: { props.person } <br />
          </Typography>

          <Typography variant="body2" color="text.secondary">
          </Typography>
        </CardContent>

        <CardActions>
          <Container>
            <Slider 
            defaultValue={0}  
            max={props.fet_scor} step={0.5} 
              // aria-label="Default" valueLabelDisplay="auto" 
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