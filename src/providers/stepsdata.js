import { useState, createContext } from "react";

const StepsData = createContext();

function StepsDataComp(children) {
  const [usersDataList, setUsersDataList] = useState("Hello, Testing New state");
  const [stepData, setStepData] = useState([
    {"being_evaluated": "", "evaluator": "", "feature": "", "score_awarded": "", "timestamp": "", "total_score": ""}, 
  ]);

  return (
    <StepsData.Provider value={usersDataList}>
        { children }
    </StepsData.Provider>
  );
}

export default StepsDataComp;
export { StepsData };
