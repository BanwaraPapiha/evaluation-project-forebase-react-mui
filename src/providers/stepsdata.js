import { useState, createContext } from "react";

const StepsData = createContext();

function StepsDataComp(props) {
  const [usersDataList, setUsersDataList] = useState("Hello, Testing New state");
  const user= "Undefined";
  return (
    <StepsData.Provider value={user}>
        { props.children }
    </StepsData.Provider>
  );
}

export default StepsDataComp;
export { StepsData };