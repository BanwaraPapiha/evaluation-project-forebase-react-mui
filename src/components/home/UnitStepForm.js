import { Grid, Typography, Divider, Snackbar, Alert, Slide } from '@mui/material';
import UnitComponent from "./UnitComponent";
import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { SurveyCTx } from "../../providers/surveyctx";

function Transitiondown(props) {
  return <Slide {...props} direction="down" />;
}

function UnitStepForm(props) {
  const [listData, setListData] = useState({});
  const [score_done, setScore_done] = useState(0);
  const [open, setOpen] = useState(false);
  const [fet_scor, setFet_scor] = useState(0)
  const surveyCtx = useContext(SurveyCTx)
  const Curr_survey = surveyCtx.survey[0]['id']
  // console.log(props.featureName)

  const handleClose = ()=> {
    setOpen(false)
  }
  
  useEffect(()=>{
    let sum = 0;
    for (const value of Object.values(listData)) {
      sum += value;
    }
    console.log(sum); 
    setScore_done(sum)
    
  }, [listData])

  useEffect(()=>{
      const getScore = async () => {
          const docSnap = await getDoc(doc(Db, "all_features", props.featureName));
          if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              console.log("Document data Curr_survey:", docSnap.data()[Curr_survey]);
              setFet_scor(Number(docSnap.data()[Curr_survey]))
          } else {
              console.log("No such document! about current survey feature value");
          }    
      }
      getScore();
  }, [])

  return (
    <>
      {open?       
      <Snackbar
        open={open} autoHideDuration={6000} TransitionComponent={Transitiondown} onClose={handleClose} message="Note archived"
        anchorOrigin={{ 
          vertical: 'bottom',
          horizontal: 'center',
         }}
      >
        <Alert variant='filled' onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          You can't give more than {fet_scor} total points for the feature {props.featureName}!
        </Alert>
      </Snackbar>: null
      }
      <Typography variant="h6" gutterBottom component="div"    
        style={{"text-align": "center", margin: 10, padding: 5, minHeight: "10vh", backgroundColor:"rgba(123, 31, 162, .8)", color: "rgb(248, 247, 249)", borderRadius: 10}}
      >
        Feature: {props.featureName}<br/>
        Total Scores Given: {score_done}<br/>
        Maximum Scores to distribute:<b>{fet_scor && fet_scor? String(fet_scor): 'Loading'}</b>
      </Typography>

      <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center'}}>
        { props.personsList.map((prsn) => {
        return (
          <UnitComponent 
            person={prsn} feature={props.featureName} score_done={score_done} 
            listData={listData} setListData={setListData} 
            fet_scor={fet_scor} setOpen={setOpen}
          />
        );
        })}
      </Grid>
    </>
  );
}

export default UnitStepForm;
