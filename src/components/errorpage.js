import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Box display="flex" m="auto" sx={{ height: '95vh', width: '100%' }} bgcolor="#f5f0ec" >
      <Box m="auto">
        <Typography variant="h1">
        Error! Page not Found
        </Typography>   
        <Button onClick={navigate('/')} href="#">Go to Home Page</Button>
      </Box>
    </Box>
  );
}

export default ErrorPage;
