import { Container, Grid } from '@mui/material';
import MakeAdminForm from "./makeAdmin";
import AdminTable from "./AdminTable";

const Actions = () => {
    return (
        <Container>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <MakeAdminForm/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AdminTable/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Actions;