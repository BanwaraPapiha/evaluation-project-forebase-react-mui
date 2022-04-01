import { useState, useContext } from "react";
import MaterialTable from "material-table";
  
const Rich_Table = () => {
    const data = [
        { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
        { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
      ];
      
    const columns = [
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname" },
        { title: "Birth Year", field: "birthYear", type: "numeric" },
      ];
    return (
        <>
            <MaterialTable title="Basic Table" columns={columns} data={data} /> 
        </>
    )
};

export default Rich_Table;