import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import UnitStepForm from "./UnitStepForm";
import { Typography, MobileStepper, Container, Box, Card, CardContent, CardActions, Alert } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";
import { PointsCtxProvider } from "../../providers/pointsProvider";
import { SurveyCTx } from "../../providers/surveyctx";
import { UserContext } from "../../providers/userCtx";
import { useNavigate } from 'react-router-dom';
import { PinDropSharp } from "@material-ui/icons";
import TopUi from "../common/errSurv";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

function MultiStep() {
  const [survUser, setSurvUser] = useState([]);
  const [survFeature, setSurvFeature] = useState([]);
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
  const handleToggle = () => {setOpen(!open)};
  // // SnackBar Error
  // const [err, setErr] = useState(false);
  // const handleErrClick = () => {setErr(true)};
  // const handleErrClose = () => {setErr(false)};
  // // SnackBar Success
  // const [sx, setSx] = useState(false);
  // const handleSxClick = () => {setSx(true)};
  // const handleSxClose = () => {setSx(false)};
  const [addSx, setAddSx] = useState(false)
  const [addEr, setAddEr] = useState(false)
  const handleCloseSx = () => setAddSx(false)
  const handleCloseEr = () => setAddEr(false)


  const Submit = async () => {
    handleOpen()
    console.log(points.pointsdata)
    try {
      await setDoc(doc(Db, current_survey, current_user), points.pointsdata);
      await setDoc(doc(Db, "track_persons", current_survey), 
      {[current_user]: true}, { merge: true }
      );
      setAddSx(true)
      navigate('/', { replace: true });
    } catch (e) {
      console.error(e);
      handleClose()
      setAddEr(true)
    } 
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
            survFeature.length>0 
            ?
            survFeature.map((x, index) => {
              return (
                <UnitStepForm className="UnitSteps" personsList={ survUser } featureName={x} scores={2000} />
              )
            })
            :
            'Loading...'
          }
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 10}}>
          {
            current_survey!=="Not Selected" && current_user 
            ? 
            <Button sx={{width: '45vw'}} variant="contained" color="secondary" onClick={Submit}>Submit</Button>
            : 
            <Button sx={{width: '45vw'}} disabled>Submit</Button>
          }
          </Box>
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
            {/* , {String(props.guide)} */}
          </Typography>
          <ul>
            <li>This system is for evaluating the performance of the employees of your company.</li>
            <li>The system is based on your feedback for each of the other employee in specific features.</li>
          </ul>
        </CardContent>
        <CardActions>
          <Button align='center' onClick={()=>{props.setGuide(false);}} size="small">Start</Button>
        </CardActions>
      </Card>
    </Box>

  )
}
