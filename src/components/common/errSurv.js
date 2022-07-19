import { Container, Typography, Button, Box, Card, CardContent, CardActions } from '@mui/material';
import { useState } from 'react';


function TopUi() {
  const [show, setShow] = useState(true)
    return (
      <Container>
        <Box sx={{height: '100vh'}}>
          <Card
            sx={{
              padding: '10px', margin: '30px auto auto auto',
              width: { xs: '80vw', sm: '80vw', md: '400px', lg: '400px', xl: '400px' },
              display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
            }}
          >
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Guides
              </Typography>
              <ul>
                <li>vgbhskj bhjv  bjbv bhb hbv jhjvh sjs hsdhbh h f cgcg jh</li>
                <li>vgbhskj</li>
                <li>vgbhskj</li>
                <li>vgbhskj</li>
              </ul>
            </CardContent>
            <CardActions>
              <Button align='center' onClick={()=>{setShow(false);}} size="small">Start</Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    );
  }
  
  export default TopUi;
  