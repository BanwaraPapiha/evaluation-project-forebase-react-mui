import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import UnitStepForm from "./UnitStepForm";
import { Typography, MobileStepper, Container, Button, Box, Card, CardContent, CardActions } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";
import { PointsCtxProvider } from "../../providers/pointsProvider";
import { SurveyCTx } from "../../providers/surveyctx";
import { UserContext } from "../../providers/userCtx";
import { useNavigate } from 'react-router-dom';
import { PinDropSharp } from "@material-ui/icons";
import TopUi from "../common/errSurv";

function MultiStep() {
  const [survUser, setSurvUser] = useState([]);
  const [survFeature, setSurvFeature] = useState([]);
  const UserCtx = useContext(UserContext)
  const points = useContext(PointsCtx)
  const surveyCtx = useContext(SurveyCTx)
  const current_survey = surveyCtx.survey[0]['id']
  const current_user = UserCtx.Loguser.email;
  const navigate = useNavigate()

  const Submit = async () => {
    // alert("Submit!");
    // console.log(current_user)
    console.log(points.pointsdata)
    try {
      await setDoc(doc(Db, current_survey, current_user), points.pointsdata);
    } catch (e) {
      console.error(e);
    } 
    try {
      await setDoc(doc(Db, "track_persons", current_survey), 
      {[current_user]: true}, { merge: true }
      );      
    } catch (e) {
      console.error(e)
    }
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const getSurveyFeatures = async () => {
      // const docRef = doc(Db, "surveys", "Work Survey April 2022");
      const docRef = doc(Db, "surveys", current_survey);
      const docSnap = await getDoc(docRef);
      console.log(current_user)
      // Still incomplete
      points.setPointsdata({})
      console.log(points.pointsdata)  
      console.log(docSnap.data().users);
      console.log(docSnap.data().features);
      setSurvUser(docSnap.data().users);
      setSurvFeature(docSnap.data().features)
    };
    getSurveyFeatures();
  }, [current_survey]);

  const [guide, setGuide] = useState(true)

  if (UserCtx.admin) {
    return (
      <Container>
        <Box sx={{height: '400px', color: 'red'}}>
          <Typography variant="h3" gutterBottom component="div" style={{"text-align": "center"}}>
            Survey {current_survey}<br/>
            Evaluate All the given ''''''users'''''' in the following Features Step By Step
          </Typography>
        </Box>

        {survFeature.length > 0 ?
         survFeature.map((x, index) => {
          return (
            <UnitStepForm className="UnitSteps" personsList={ survUser } featureName={x} scores={2000} />
            )
         }) : 'Loading'}
        <br/>
    
        {
          current_survey!=="Not Selected" && current_user ? <Button variant="contained" color="secondary" onClick={Submit}>Submit</Button>
          : <Button disabled>Submit</Button>
        }
      </Container>
    );  
  }

  if (survUser.includes(UserCtx.Loguser.email) && current_survey!=="Not Selected")
  {
    return (
      <Container>
        {
          guide===true
          ? 
          <Guides guide={guide} setGuide={setGuide}/>
          : 
          <div>
          { 
            survFeature.length>0 
            ?
            survFeature.map((x, index) => {
              return (
                <UnitStepForm className="UnitSteps" personsList={ survUser } featureName={x} scores={2000} />
              )
            })
            :
            'Loading'
          }
          {
            current_survey!=="Not Selected" && current_user ? <Button variant="contained" color="secondary" onClick={Submit}>Submit</Button>
            : <Button disabled>Submit</Button>
          }

          </div>
        }
      </Container>
    );  
  
  }

  if (!survUser.includes(UserCtx.Loguser.email)) {
    return (
      <Container>
        <Typography variant="button" gutterBottom component="div">
          Survey {current_survey}<br/>
          You are not found in the current survey
        </Typography>
      </Container> 
    )
  }
  if (current_survey==="Not Selected") {
    return (
      <Container>
        <Typography variant="button" gutterBottom component="div">
          Survey {current_survey}<br/>
          Please Select a Survey
        </Typography>
      </Container> 
    )
  }
  else{
    return (
      <Container>
        <Typography variant="button" gutterBottom component="div">
        Survey {current_survey}<br/>
        Some Error Occurred, please ensure that you are alowed to submit a survey and you are choosing the right one
      </Typography>

      </Container> 
    )
  }
}

function MultiStepFormCtx() {
  return (
    <PointsCtxProvider>
      <MultiStep/>
    </PointsCtxProvider>   
  );
}

export default MultiStepFormCtx;

const Guides = (props) => {
  return (
    <Box sx={{height: '60vh'}}>
      <Card
        sx={{
          padding: '10px', margin: '30px auto auto auto',
          width: { xs: '80vw', sm: '80vw', md: '400px', lg: '400px', xl: '400px' },
          display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }}
      >
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Guides
            , {String(props.guide)}
          </Typography>
          <ul>
            <li>vgbhskj bhjv  bjbv bhb hbv jhjvh sjs hsdhbh h f cgcg jh</li>
            <li>vgbhskj</li>
            <li>vgbhskj</li>
            <li>vgbhskj</li>
          </ul>
        </CardContent>
        <CardActions>
          <Button align='center' onClick={()=>{props.setGuide(false);}} size="small">Start</Button>
        </CardActions>
      </Card>
    </Box>

  )
}
