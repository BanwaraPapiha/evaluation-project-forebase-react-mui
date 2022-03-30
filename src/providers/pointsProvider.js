import { PointsCtx } from "./pointsctx"
import { useState } from "react";

export function PointsCtxProvider(props) {
    const [pointsdata, setPointsdata] = useState([
      {
        points: 200, 
        evaluator: "Me", 
        being_eval: "You",
        feature: "Truthfulness"
      },
    ]);

  return (
      <PointsCtx.Provider value={{pointsdata, setPointsdata}}>
        {props.children}
      </PointsCtx.Provider>
    );
  }
