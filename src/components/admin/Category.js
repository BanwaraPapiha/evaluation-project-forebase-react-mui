import { Db } from "../../firebase-config/db";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { SurveyCTx } from "../../providers/surveyctx";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CategoryForm from './CategoryAdd';
import React from 'react';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateDoc, arrayRemove } from "firebase/firestore";

function TableRow(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [sum, setSum] = useState(1)
  const [fdata, setFdata] = useState({})
  const email = props.email
  var obj = props.adminScore

  useEffect(()=>{
    // var summed = 0;
    var summed = 1;
    for (var key in fdata) {
            // summed += Number(fdata[key]);
            summed = summed * (Number(fdata[key])/100).toFixed(2);
        };
        summed<=0?setSum(1):setSum(summed)
        // setSum(summed)
        obj[email] = sum
        props.setAdminScore(obj)
        console.log(obj)
    }, [sum, fdata])

  const onSubmit = data => {
    console.log(data);
    setFdata(data)
  };
  console.log(errors);
  const cats = props.cats
  
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                cats && cats.length>0
                ?
                cats.map((cat)=>{
                    return (
                        <td style={{minWidth: "120px", overflowX:"auto"}}>
                            <TextField type={'number'} id="cat" step={0.1}
                            label={cat} variant="standard" color="secondary" 
                            {...register(cat, {required: true, maxLength: 80})} />
                        </td>
                    )
                })
                :
                'Not Loaded'
            }

            <td>
                <input type="submit" />
                <div>
                    {Number(sum).toFixed(2)}
                </div>

            </td>
        </form>
    </div>
  );
}

const PersonCategory = (props) => {
    const [persons, setPersons] = useState([]);
    const [cats, setCats] = useState([]);
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['id']
    const SurveyDocRef = doc(Db, "surveys", Curr_survey)
    const [adminScore, setAdminScore] = useState({})

    useEffect(()=>{
        const unsub = onSnapshot(SurveyDocRef, (doc) => {
            console.log("Current data: ", doc.data());
            doc.data() && doc.data().users!=='undefined'?setPersons(doc.data().users):setPersons([])
            doc.data() && doc.data().cats!=='undefined'?setCats(doc.data().cats):setCats([])
        });
    }, [])

    const submit = () => {
        try{
            console.log(adminScore)
            const cityRef = doc(Db, 'surveys', Curr_survey);
            setDoc(cityRef, { usersdata: adminScore }, { merge: true });
            console.log('done')
        }
        catch(err) {
            alert(err)
            console.log('err')
        }
    }

    const deleteCat = async (x) => {
        try{
          await updateDoc(SurveyDocRef, {
            cats: arrayRemove(x)
          });   
        }
        catch(err) {
          console.log(err)
          alert('An Error Occured in deleting category')
          console.err(err)
        }
      };
  

    return (
        <Stack spacing={4} sx={{width: "100%", overflowX:"auto", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Paper style={{width: "100%", overflowX:"auto"}}>
                <h1><u>Guide About Managing Categories</u></h1>
                <div style={{textAlign: 'left'}}>
                    <ul>
                        <li>You have to write, the percent value in each cell below, for example, write simply 60 if you mean 60%</li>
                        <li>Then you must fill all the fields in a row, if you dont want to change a specific cell, just write placeholder 100 in that cell and click on submit button at the end of row.</li>
                        <li>Letting any cell empty in a row will not make the system work, you must write all cells in a row, no no cell in a row.</li>
                        <li>If you dont want to accelerate or decelerate an user, you can leave its fields empty.</li>
                        <li>After you have accelerated and decelerated all users, click on <b>Add All To Records</b>  button.</li>
                        <li>Remember, if you dont use submit button in each row, the data will not be properly saved even on clicking <b>Add All To Records</b> button.</li>
                        <li>Similarly, if you forget to click the <b>Add All To Records</b> button, the data will not be saved.</li>
                        <li>If any point is going to be equal or below zero, then the point will be automatically reset to 1 and not zero or below zero.</li>
                        <li>If you want to give no money to any user, use the post survey, bounty page</li>
                    </ul>
                </div>
            </Paper>
            <table style={{width: "100%", overflowX:"auto"}}>
                <thead>
                    <tr>
                        <th>Users</th>
                        <th>Categories</th>
                    </tr>
                </thead>
                <tbody>
                {
                persons && persons.length>0
                ?
                <>
                {
                    persons.map((p)=>{
                        return (
                            <tr key={p}>
                                <td>{p}</td>
                                <TableRow email={p} cats={cats} adminScore={adminScore} setAdminScore={setAdminScore} />
                            </tr>
                        )
                    })
                }
                </>
                :
                'Not Loaded'
            }

                </tbody>
            </table>
            <Button fullwidth variant="contained" sx={{ margin: 3, width: '100%'}} onClick={()=>submit()}>Add all to records</Button>
            <h1><u>Delete Categories</u></h1>
            <table style={{width: "100%", overflowX:"auto"}}>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cats && cats.map((cat)=>{
                            return (
                                <tr key={cat}>
                                    <td>{cat}</td>
                                    <td>
                                        <IconButton aria-label="delete" onClick={()=>deleteCat(cat)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <h1><u>Create Categories</u></h1>
            <CategoryForm/>
        </Stack>
    )
}

export default PersonCategory;

