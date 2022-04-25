import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./components/GoogleAuth/LoginPage";
import Charts from "./components/charts/Charts";
import Bounty from "./components/bounty/Bounty";
import Admin from "./components/admin/Admin";
import ErrorPAge from "./components/errorpage"
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MultiStepFormCtx from "./components/home/MultiStepForm";
import SurveyProvider from './providers/surveyProvider';
import UserProvider from './providers/UserProvider';
import { UserContext } from "./providers/userCtx";
import { useEffect, useState, useContext } from "react";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const ProtectedRoute = ({user, redirectPath = '/account', children}) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
  };

const AppRouter = () => {
  // const UserCtx = useContext(UserContext)
  const user = auth.currentUser;
    return (
      <BrowserRouter>
        <SurveyProvider>      
        <UserProvider>
          <Header/>
            <Routes>
              <Route element={<ProtectedRoute user={user} />}>
                <Route index element={<MultiStepFormCtx />} />
                <Route path="admin" element={<Admin />} />
                <Route path="bounty" element={<Bounty />} />
                <Route path="charts" element={<Charts />} />
              </Route>

              <Route path="account" element={<LoginPage />} />
              <Route path="*" element={<ErrorPAge />} />


              {/* <Route path="charts" element={<Charts />} />
              <Route path="bounty" element={<Bounty />} />
              <Route path="admin" element={<Admin />} /> */}
            </Routes>

          <Footer/>
        </UserProvider>
        </SurveyProvider>
      </BrowserRouter>
    );
}

export default AppRouter;
