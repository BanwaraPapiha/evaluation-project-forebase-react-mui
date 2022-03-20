import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import LoginPage from "./components/GoogleAuth/LoginPage";
import Charts from "./components/charts/Charts";
import Bounty from "./components/bounty/Bounty";
import BountyMini from "./components/common/table";
import Admin from "./components/admin/Admin";
import ErrorPAge from "./components/errorpage"
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MultiStepForm from "./components/home/MultiStepForm";
import Container from '@mui/material/Container';

import UserProvider from "./providers/UserProvider";

const AppRouter = () => {
    return (
      <>
        <BrowserRouter>

        <Header/>
        <Container>
          <Routes>
            <Route index element={<MultiStepForm />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="charts" element={<Charts />} />
            {/* <Route path="bounty" element={<Bounty />} /> */}
            <Route path="bounty" element={<BountyMini />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<ErrorPAge />} />
          </Routes>
          </Container>

        </BrowserRouter>

        <Footer/>
      </>
    );
}

export default AppRouter;
