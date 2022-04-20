import { useState } from "react";
import { PointsCtx } from "./pointsctx"

export function PointsCtxProvider(props) {
  const [pointsdata, setPointsdata] = useState({});

  return (
      <PointsCtx.Provider value={{pointsdata, setPointsdata}}>
        {props.children}
      </PointsCtx.Provider>
    );
  }
