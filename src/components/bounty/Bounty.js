import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import { SurveyCTx } from "../../providers/surveyctx";
import BountyTable from "./BountyTable";
import { UserContext } from "../../providers/userCtx";

function Bounty() {
    const [ac_de_Sum, setAc_de_Sum] = useState(0);
    const [scoreData, setScoreData] = useState([]);
    const [bountySum, setBountySum] = useState({});
    const [totalBounty, setTotalBounty] = useState(0);
    const [pointsSum, setPointsSum] = useState(0);
    const [acObj, setAcObj] = useState({});
    const [idSumArr, setIdSumArr] = useState([]);
    const Calc_Scor = {};
    const surveyCtx = useContext(SurveyCTx)
    const survey = surveyCtx.survey[0]['id']
    const usersCollectionRef_survey = collection(Db, survey);
    const obj = {};
    const handleBountyValue = (e) => {
      setTotalBounty(Number(e.target.value))
    }
    useEffect(()=>{
      console.log("Listening Change")
      let fm = 0;
      console.log(acObj)
      for (const key in acObj) {
        fm += acObj[key];
      }
      setAc_de_Sum(fm)
    }, [acObj])

    useEffect(() => {
      const getData = async () => {
        const data = await getDocs(usersCollectionRef_survey);
        console.log(survey)
        console.log(data.docs);
        setScoreData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getData();
    }, []);

    useEffect(()=>{
      console.log("Strted\n")
      scoreData.map((x)=>{
        for (const [key, value] of Object.entries(x)) {
          if (key!=='id') {
            console.log("This is for ", key, " given by ", x['id'])
            for (const [key2, value2] of Object.entries(value)) {
              // console.log(key2, value2) //this is unit data
              if (Calc_Scor.hasOwnProperty(key2)) {
                Calc_Scor[key2] += Number(value2)
                console.log(Calc_Scor)
              }
              else if (!Calc_Scor.hasOwnProperty(key2)) {
                Calc_Scor[key2] = Number(value2)
                console.log(Calc_Scor)
              }
            }
          }
        } 
      })
      setIdSumArr(Object.entries(Calc_Scor))
      console.log(idSumArr)
      // DivideRelatively()
      let num = 0;
      idSumArr.map((x)=>num += Number(x[1]))
      setPointsSum(num)
      console.log(pointsSum)

    }, [scoreData])

    return (
      <Container>
      <Stack spacing={4}>
        <br />
        <Typography variant="h5" gutterBottom component="div">
            Total Changed Points Score = {ac_de_Sum} |
            Total Points Score = {pointsSum}
        </Typography>

        <Paper elevation={5} >
          <Container>
            <Stack spacing={2}>
              <Typography variant="h6" gutterBottom component="div">
                  Divide Money Relatively <br/>
              </Typography>
              <TextField onChange={handleBountyValue}
                fullWidth id="outlined-number" label="Number" 
                type="number" InputLabelProps={{shrink: true,}}
              />
              <Button fullWidth variant="contained">Add to Records</Button>
              <br/>
            </Stack>
          </Container>
        </Paper> 

      <div>
        <BountyTable title={["Name", "Total Points", "Acc/Dec Value", "Actions", "New Score", "Bounty"]} 
        idSum={idSumArr} totalBounty={totalBounty} bountySum={bountySum} setBountySum={setBountySum} setAcObj={setAcObj} acObj={acObj} ac_de_Sum={ac_de_Sum}
        obj={obj} />
      </div>
    </Stack>
    </Container>
    );
  }
  
  export default Bounty;
  