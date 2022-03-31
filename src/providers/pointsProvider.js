import { useState } from "react";
import { PointsCtx } from "./pointsctx"

export function PointsCtxProvider(props) {
  let initial = {};
  const [pointsdata, setPointsdata] = useState(initial);

  return (
      <PointsCtx.Provider value={{pointsdata, setPointsdata}}>
        {props.children}
      </PointsCtx.Provider>
    );
  }
