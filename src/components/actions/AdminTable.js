import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Db } from "../../firebase-config/db";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const AdminTable = () => {
    const [admins_li, setAdmins_li] = useState([]);

    const fetch_admin_li = async () => {
        const docSnap = await getDoc(doc(Db, "Admins", "admins_list"));
    
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setAdmins_li(docSnap.data().admins_list)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }    
    }
    fetch_admin_li()
    
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
                                <td><PersonRemoveIcon/></td>
                                
                            </tr>

                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default AdminTable;
