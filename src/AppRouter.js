import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/GoogleAuth/LoginPage";
import Charts from "./components/charts/Charts";
import Bounty from "./components/bounty/Bounty";
import Admin from "./components/admin/Admin";
import ErrorPAge from "./components/errorpage"
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MultiStepFormCtx from "./components/home/MultiStepForm";
import Container from '@mui/material/Container';
import SurveyProvider from './providers/surveyProvider';
import UserProvider from './providers/UserProvider';

const AppRouter = () => {
    return (
      <BrowserRouter>
        <SurveyProvider>      
        <UserProvider>
          <Header/>
            <Routes>
              <Route index element={<MultiStepFormCtx />} />
              <Route path="account" element={<LoginPage />} />
              <Route path="charts" element={<Charts />} />
              <Route path="bounty" element={<Bounty />} />
              <Route path="admin" element={<Admin />} />
              <Route path="*" element={<ErrorPAge />} />
            </Routes>

          <Footer/>
        </UserProvider>
        </SurveyProvider>
      </BrowserRouter>
    );
}

export default AppRouter;
