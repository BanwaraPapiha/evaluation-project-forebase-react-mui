import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import UnitStepForm from "./UnitStepForm";
import { Typography, Container, Box, Card, CardContent, CardActions, Alert } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";
import { PointsCtxProvider } from "../../providers/pointsProvider";
import { SurveyCTx } from "../../providers/surveyctx";
import { UserContext } from "../../providers/userCtx";
import { useNavigate } from 'react-router-dom';
import TopUi from "../common/errSurv";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import MobileStepper from '@mui/material/MobileStepper';
// import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';

function MultiStep() {
  const [survUser, setSurvUser] = useState([]);
  const [survFeature, setSurvFeature] = useState([]);
  const [guide, setGuide] = useState(true)
  const [thanks, setThanks] = useState(false)
  const UserCtx = useContext(UserContext)
  const points = useContext(PointsCtx)
  const surveyCtx = useContext(SurveyCTx)
  const current_survey = surveyCtx.survey[0]['id']
  const current_user = UserCtx.Loguser.email;
  const navigate = useNavigate()
  // Backdrop
  const [open, setOpen] = useState(false);
  const handleClose = () => {setOpen(false)};
  const handleOpen = () => {setOpen(true)};
  const [addSx, setAddSx] = useState(false)
  const [addEr, setAddEr] = useState(false)
  const handleCloseSx = () => setAddSx(false)
  const handleCloseEr = () => setAddEr(false)
  const theme = useTheme();
  // Stepper
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    window.scrollTo('5', '10')
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo('5', '10')
    // window.scrollTo(x-coordinate, y-coordinate)
  };

  const handleBack = () => {
    window.scrollTo('5', '10')
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo('5', '10')
  };

  const Submit = async () => {
    handleOpen()
    console.log(points.pointsdata)
    try {
      await setDoc(doc(Db, current_survey, current_user), points.pointsdata);
      await setDoc(doc(Db, "track_persons", current_survey), 
      {[current_user]: true}, { merge: true }
      );
      setAddSx(true)
      // navigate('/', { replace: true });
      handleClose()
      setThanks(true)
    } catch (e) {
      console.error(e);
      handleClose()
      setAddEr(true)
    } 
  };

  useEffect(() => {
    setThanks(false)
    const getSurveyFeatures = async () => {
      const docRef = doc(Db, "surveys", current_survey);
      const docSnap = await getDoc(docRef);
      console.log(current_user)
      // Still incomplete
      points.setPointsdata({})
      console.log(points.pointsdata)  
      console.log(docSnap.data()?.users);
      console.log(docSnap.data()?.features);
      docSnap.data() && docSnap.data().users!=='undefined'?setSurvUser(docSnap.data().users):setSurvUser([])
      docSnap.data() && docSnap.data().features!=='undefined'?setSurvFeature(docSnap.data().features):setSurvFeature([])
    };
    getSurveyFeatures();
  }, [current_survey]);

  if ((survUser.includes(UserCtx.Loguser.email) || UserCtx.admin) && current_survey!=="Not Selected")
  {
    return (
      <Container>
        {
          guide===true
          ? 
          <Guides guide={guide} setGuide={setGuide}/>
          : 
          <div>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {/* success */}
            <Snackbar open={addSx} autoHideDuration={6000} onClose={(handleCloseSx)} anchorOrigin={{vertical: "top", horizontal: "center" }}>
              <Alert onClose={handleCloseSx} variant='filled' severity="success" sx={{ width: '100%' }}>
                Submitted Sucessfully!
              </Alert>
            </Snackbar>
            {/* error */}
            <Snackbar open={addEr} autoHideDuration={6000} onClose={(handleCloseEr)} anchorOrigin={{vertical: "top", horizontal: "center" }}>
              <Alert onClose={handleCloseEr} variant='filled' severity="error" sx={{ width: '100%' }}>
                An Error Occured!
              </Alert>
            </Snackbar>
            {
              thanks
              ?
              <ThankYou/>
              :
              <div>
                { 
                  survFeature.length>0 
                  ?
                  <div >                    
                    <UnitStepForm personsList={ survUser } featureName={survFeature[activeStep]} activeStep={activeStep}/>
                  </div>
                  :
                  'Loading...'
              }
                <Box sx={{margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <MobileStepper
                    variant="dots"
                    steps={survFeature.length}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: 400, flexGrow: 1 }}
                    nextButton={
                      <Button size="small" onClick={handleNext} disabled={activeStep === survFeature.length-1}>
                        Next
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </Box>
              </div>
            }
            {
              activeStep === survFeature.length-1 && !thanks
              ?
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10}}>
              {
                current_survey!=="Not Selected" && current_user 
                ? 
                <Button sx={{width: '45vw'}} variant="contained" color="secondary" onClick={Submit} disabled={activeStep !== survFeature.length-1}>Submit</Button>
                : 
                <Button sx={{width: '45vw'}} disabled>Submit</Button>
              }
              </Box>
              :
              null
            }
          </div>
        }
      </Container>
    );  
  
  }

  if (!survUser.includes(UserCtx.Loguser.email)) {
    return (
      <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Typography style={{padding: 10, margin: 10}} variant="h4" gutterBottom component="div">
          You are not found in the current survey
          <br></br>
          Survey Name: {current_survey}
        </Typography>
      </Container> 
    )
  }

  if (current_survey==="Not Selected") {
    return (
      <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Typography style={{padding: 10, margin: 10}} variant="h4" gutterBottom component="div">
          Survey {current_survey}<br/>
          <br></br>
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
          backgroundImage: 'linear-gradient(to right, rgba(0,255,0,.5), rgba(255,0,0,.5))',
          width: { xs: '80vw', sm: '80vw', md: '400px', lg: '400px', xl: '400px' },
          display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }}
      >
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Guides
          </Typography>
          <ul>
            <li>You are shown some features in the next section.</li>
            <li>Under each feature your colleagues are listed, you have to give some scores to your colleagues for that specific feature</li>
            <li>Total possible scores for each feature is already provided. You can not give more points than the allowed points</li>
            <li>Keep in mind, you only have to distribute the total possible scores among your colleagues.</li>
            <li>You can also leave it blank if you dont want to give score for a particular feature.</li>
            <li>Your colleagues will be evaluated on the basis of points they get from all of their coworkers</li>
          </ul>
        </CardContent>
        <CardActions>
          <Button variant="contained" align='center' onClick={()=>{props.setGuide(false);}} size="small">Start</Button>
        </CardActions>
      </Card>
    </Box>

  )
}

const ThankYou = (props) => {
  const navigate = useNavigate()
  return (
    <Box sx={{height: '60vh'}}>
      <Card
        sx={{
          padding: '10px', margin: '30px auto auto auto', 
          backgroundImage: 'linear-gradient(to right, rgba(255,0,0,.5), rgba(0,255,0,.5))',
          width: { xs: '80vw', sm: '80vw', md: '400px', lg: '400px', xl: '400px' }, 
          display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }}
      >
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="white">
            Thank You For Filling The Survey
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant='contained' sx={{color: 'white',}} align='center' onClick={()=>{navigate('/', { replace: true })}} size="small">Go to Home Page</Button>
        </CardActions>
      </Card>
    </Box>

  )
}
