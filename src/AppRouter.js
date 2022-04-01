import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import LoginPage from "./components/GoogleAuth/LoginPage";
import Charts from "./components/charts/Charts";
import Bounty from "./components/bounty/Bounty";
import Admin from "./components/admin/Admin";
import ErrorPAge from "./components/errorpage"
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MultiStepFormCtx from "./components/home/MultiStepForm";
import Container from '@mui/material/Container';
// import {BasicTable} from './components/common/anotherTable';

const AppRouter = () => {
    return (
      <>
        <BrowserRouter>
          <Header/>
          <Container>
            <Routes>
              <Route index element={<MultiStepFormCtx />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="charts" element={<Charts />} />
              {/* <Route path="chart2" element={<BasicTable />} /> */}
              <Route path="bounty" element={<Bounty />} />
              <Route path="admin" element={<Admin />} />
              <Route path="*" element={<ErrorPAge />} />
            </Routes>
          </Container>
          <Footer/>
        </BrowserRouter>
      </>
    );
}

export default AppRouter;
