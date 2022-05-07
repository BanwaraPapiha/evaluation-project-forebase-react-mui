import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { collection, getDocs } from "firebase/firestore"; 
import { Paper, Typography, Button, TextField, Container, Stack, Grid, Divider } from '@mui/material';
import { SurveyCTx } from "../../providers/surveyctx";
import { UserContext } from "../../providers/userCtx";
import BountyTable from "./BountyTable";
import TableRow from "./BountyTable";

function Bounty() {
    const [ac_de_Sum, setAc_de_Sum] = useState(0);
    const [scoreData, setScoreData] = useState([]);
    const [bountySum, setBountySum] = useState({});
    const [totalBounty, setTotalBounty] = useState(0);
    const [pointsSum, setPointsSum] = useState(0);
    const [acObj, setAcObj] = useState({});
    const [last_b_data, setLast_b_data] = useState({});
    const [prev_bonus, setPrev_bonus] = useState(0);
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
    }, [survey]);

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
      let num = 0;
      idSumArr.map((x)=>num += Number(x[1]))
      setPointsSum(num)
      console.log(pointsSum)
    }, [scoreData, survey])

    function tableToCSV() {
      var csv_data = [];
      var rows = document.getElementsByTagName('tr');
      for (var i = 0; i < rows.length; i++) {
          var cols = rows[i].querySelectorAll('td,th');
          var csvrow = [];
          for (var j = 0; j < cols.length-1; j++) {
              csvrow.push(cols[j].innerHTML);
          }
          csv_data.push(csvrow.join(","));
      }
      csv_data = csv_data.join('\n');
      downloadCSVFile(csv_data)
    }

    function downloadCSVFile(csv_data) {
        let CSVFile = new Blob([csv_data], { type: "text/csv" });
        var temp_link = document.createElement('a');
        temp_link.download = "data.csv";
        var url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);
        temp_link.click();
        document.body.removeChild(temp_link);
    }

    async function tableToJSON() {
      var arr = [];
      // var rows = document.getElementsByTagName('tr');
      var rows = document.getElementsByClassName('arr');
      for (var i = 0; i < rows.length; i++) {
      // for (var i = 1; i < rows.length; i++) {
          var cols = rows[i].querySelectorAll('td,th');
          var csvrow = {};
          var row;
          for (var j = 0; j < cols.length; j++) {
            row = rows[i];
            csvrow["name"] = row.cells[0].textContent
            csvrow["sum_points"] = row.cells[1].textContent
            csvrow["a_d_ecelBy"] = row.cells[2].textContent
            csvrow["new_points"] = row.cells[3].textContent
            csvrow["bounty"] = row.cells[4].textContent
          }
          arr.push(csvrow)
      }
      console.log(arr)
      await setDoc(doc(Db, "Bounties", survey), {
        totalMoney: totalBounty,
        arr
      });
      // arr = []
      return JSON.stringify(obj);
    }

    useEffect(()=>{
      const handleRead = async () => {
        console.log(true)
        const docRef = doc(Db, "Bounties", survey);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // console.log("Last survey data:", docSnap.data());
          console.log("Last survey data:", docSnap.data().arr);
          setLast_b_data(docSnap.data().arr)
          setPrev_bonus(docSnap.data().totalMoney)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
      handleRead()  
    }, [survey])

    return (
      <Container>
      <Stack spacing={4}>
        <br />
        <Typography variant="h5" gutterBottom component="div" style={{"text-align": "center"}}>
            You are seeing data of: {survey} <br/>
            Total sum of points is: {ac_de_Sum} 
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
              
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                <Button onClick={tableToCSV} fullWidth variant="contained">Download</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                <Button onClick={tableToJSON} fullWidth variant="contained">Add to Records</Button>
                </Grid>
              </Grid>

              <br/>
            </Stack>
          </Container>
        </Paper> 

      <div style={{"overflow-x": "auto"}}>
        <BountyTable title={["Name", "Total Points", "Acc/Dec Value", "New Score", "Bounty (Money)", "Actions"]} 
        idSum={idSumArr} totalBounty={totalBounty} bountySum={bountySum} setBountySum={setBountySum} setAcObj={setAcObj} acObj={acObj} ac_de_Sum={ac_de_Sum} setTotalBounty={setTotalBounty}
        obj={obj} />
      </div>

      <Divider/>

      <Paper elevation={5} >
        <Container>
          <Stack spacing={2}>  
            <br/>            
            <Typography variant="button" gutterBottom component="div" style={{"text-align": "center"}}>
              Here is last saved data
            </Typography>
            <Typography variant="button" gutterBottom component="div" style={{"text-align": "center"}}>
              Total Bonus was: {prev_bonus}
            </Typography>
            <br/>
          </Stack>
        </Container>
      </Paper> 

      <div style={{"overflow-x": "auto"}}>
      <table style={{width: "100%"}}>
        <thead>
        <tr>
          <th>Name</th>
          <th>Total Points	</th>
          <th>Acc/Dec Value</th>
          <th>New Score</th>
          <th>Bounty (Money)</th>
        </tr>
        </thead>
        {last_b_data.length>0 &&
            <tbody>
            {last_b_data.map((ub)=>{
              console.log(ub)
              return (
                <tr>
                  <td>{ub.name}</td>
                  <td>{ub.sum_points}</td>
                  <td>{ub.a_d_ecelBy}</td>
                  <td>{ub.new_points}</td>
                  <td>{ub.bounty}</td>
                </tr>
              )
            })}
            </tbody>
        }
        </table>
      </div>
    </Stack>
    </Container>
    );
  }

export default Bounty;
