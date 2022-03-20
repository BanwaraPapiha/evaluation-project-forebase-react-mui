import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
// import DataGridProDemo from '../common/table';
import BountyMini from '../common/table';
import {
  collection,
  getDocs,
  // addDoc,
  // updateDoc,
  // deleteDoc,
  // doc,
} from "firebase/firestore";

function Bounty() {
    const [persons, setPersons] = useState([]);
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");

    useEffect(() => {
        const getPersons = async () => {
          const data = await getDocs(usersCollectionRef_persons);
          console.log(data.docs);
          setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPersons();
      }, []);
    //   var res = persons.map(bill => bill.acc_dec_score).reduce((acc, bill) => bill + acc);
    //   console.log(res)
  
    return (
        <>
        <BountyMini/>
            <div>
                Bounty <br/>
                visible to admin only for each username <br/>
                divide money relatively <br/>
                <h2>Total Points Calculated are: {persons.length > 1 ? persons.map(k => k.acc_dec_score).reduce((acc, k) => Number(k) + Number(acc)) : "Not Loaded"}</h2>
            </div>
            <div>
                <h1>Persons</h1>
                {persons.map((prsn) => {
                return (
                    <div style={{border: "2px dotted red", color: "blue"}}>
                        <h5>Name: {prsn.Name} | Email: {prsn.Email}</h5>
                        <h5>accelerated: {prsn.Accelerated} | decelerated: {prsn.Decelerated} |
                         ac_de_by: {prsn.Accelrated_or_decelerated_by} | Total_sum_Score: {prsn.Total_sum_Score} |
                          acc_dec_score: {prsn.acc_dec_score} | 
                          <button>Accelerate</button> |
                          <button>Decelerate</button> |
                          <label htmlFor="customChange">Custom Increase or Decrease: </label>
                          <input type="text" value="1" />
                          <button type="submit">Change</button> |
                          <button>View Graphical Form</button>
                        </h5>
                    </div>
                );
                })}
            </div>

            <div>
              <LineChart width={600} height={300} data={persons} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="acc_dec_score" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="Name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>
        </>
    );
  }
  
  export default Bounty;
  