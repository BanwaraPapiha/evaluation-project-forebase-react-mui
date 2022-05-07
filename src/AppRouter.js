import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./components/GoogleAuth/LoginPage";
import Charts from "./components/charts/Charts";
import Bounty from "./components/bounty/Bounty";
import Admin from "./components/admin/Admin";
import ErrorPAge from "./components/errorpage"
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MultiStepFormCtx from "./components/home/MultiStepForm";
import { UserContext } from "./providers/userCtx";
import { useEffect, useState, useContext } from "react";
import { getAuth } from "firebase/auth";
import { Db } from "./firebase-config/db";
import { getDoc, doc } from "firebase/firestore";
import { SurveyCTx } from "./providers/surveyctx";
import Actions from "./components/actions/Actions";

const auth = getAuth();

const ProtectedRoute = ({isAllowed, redirectPath = '/', children}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

const AppRouter = () => {
    const [admins, setAdmins] = useState([])

    useEffect(()=>{
      const fetchAdmins = async () => {
        const docSnap = await getDoc(doc(Db, "Admins", "admins_list"));
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setAdmins([docSnap.data()])
        } else {
          console.log("No such document!");
        }
      }
      fetchAdmins()
      // console.log(admins)
      if (auth.currentUser) {
        console.log(admins.includes(auth.currentUser.email))
      }
    }, [auth.currentUser])
    const UserCtx = useContext(UserContext)

    return (
        <BrowserRouter>
          <Header/>
            <Routes>
              {/* changed here  */}
              <Route element={<ProtectedRoute isAllowed={UserCtx.admin} />}>
                <Route path="admin" element={<Admin />} />
                <Route path="actions" element={<Actions />} />
                <Route path="bounty" element={<Bounty />} />
                <Route path="charts" element={<Charts />} />
              </Route>

              <Route element={<ProtectedRoute isAllowed={Boolean(auth.currentUser==="baanwarapapiha@gmail.com")} />}>
                <Route path="actions" element={<Actions />} />
              </Route>

              {/* changed here */}
              <Route element={<ProtectedRoute isAllowed={Boolean(auth.currentUser)} />}>
              <Route path="survey" element={<MultiStepFormCtx />} />
              </Route>

              <Route index element={<LoginPage />} />
              <Route path="*" element={<ErrorPAge />} />
            </Routes>

          <Footer/>
        </BrowserRouter>
    );
}

export default AppRouter;
