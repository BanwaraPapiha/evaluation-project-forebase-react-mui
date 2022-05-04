import { Grid, Typography, Divider, Snackbar, Alert, Slide } from '@mui/material';
import UnitComponent from "./UnitComponent";
import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { SurveyCTx } from "../../providers/surveyctx";

function TransitionLeft(props) {
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
    // alert(open)
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
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ 
          vertical: 'bottom',
          horizontal: 'center',
         }}
        TransitionComponent={TransitionLeft} 
        onClose={handleClose}
        message="Note archived"
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          You can't give more than {fet_scor} total poits for the feature {props.featureName}!
        </Alert>

      </Snackbar>: null
      }
      <Typography variant="h5" gutterBottom component="div" style={{"text-align": "center", "height": "20vh", "margin-top": "20vh"}}>
        Feature Seleted is: {props.featureName}
        <br/>
        Feature Scores Done are: {score_done}
        <br/>
        {/* You have total {props.scores} Scores to distribute <br/> */}
        You have total {fet_scor} Scores to distribute
      </Typography>
      <Divider/>
      <br/>

      <Grid container spacing={2}>
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
      <br/>
      <Divider />
    </>
  );
}

export default UnitStepForm;
