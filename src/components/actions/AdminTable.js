import { useEffect, useState } from "react";
import { Db } from "../../firebase-config/db";
import {arrayUnion, arrayRemove, updateDoc, doc, getDoc, setDoc, onSnapshot} from "firebase/firestore";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const AdminTable = () => {
    const [admins_li, setAdmins_li] = useState([]);

    const handleRemove = async (val) => {
        const ref = doc(Db, "Admins", "admins_list");
        await updateDoc(ref, {
          admins_list: arrayRemove(val)
        });    
    };

    useEffect(()=>{
        const fetch_admin_li = async () => {
            const unsub = onSnapshot(doc(Db, "Admins", "admins_list"), (doc) => {
                console.log("Current data: ", doc.data());
                setAdmins_li(doc.data().admins_list)
            });
        }
        fetch_admin_li()
    }, [])
    
    return (
        <div style={{"overflow-x": "auto"}}>
            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {admins_li.map((trow)=> {
                        return (
                            <tr>
                                <td>{String(trow)}</td>
                                <td><PersonRemoveIcon onClick={()=>{handleRemove(trow)}}/></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default AdminTable;
