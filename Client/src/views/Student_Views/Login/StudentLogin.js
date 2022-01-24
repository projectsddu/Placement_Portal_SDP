// import React from 'react';

// export default function StudentLogin() {
//     return <div></div>;
// }
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import HandleToast from '../../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import UsePost from '../../../Utilities/UsePost';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©'}
            <Link color="inherit" href="http://localhost:3000/_student/login">
                Dharmsinh Desai University
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function StudentLogin() {
    
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    
    const history = useHistory()

    async function handleSubmit (event) {

        event.preventDefault();
        console.log(data);
        const res = await UsePost("/studentLogin/login/", data, "POST")
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        if(res)
        {
            if(res.status)
            {
                history.push("/_student/Dashboard")
            }
            console.log(res);
            responsePipelineHandler(params1, 1)
        }


      };
        return (
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            marginTop='3%'
            // style={{ minHeight: '100vh' }}
        >
                <Box
                    sx={{
                        width: '50%',
                        p: 1,
                        my: 1,
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                        color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                        border: '1px solid',
                        borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        boxShadow: 3,
                        minWidth: 300,
                    }}
                >
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Student ID"
                                        name="username"
                                        autoComplete="username"
                                        value={data['username']}
                                        onChange={(e) => {
                                            setData({ ...data, username: e.target.value });
                                        }}
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={data['password']}
                                        onChange={(e) => {
                                            setData({ ...data, password: e.target.value });
                                        }}
                                        // autoComplete="current-password"
                                    />
                                    {/* <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    /> */}
                                    <Button
                                        onClick={handleSubmit}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                    {/* <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid> */}
                                </Box>
                            </Box>
                            <Copyright sx={{ mt: 8, mb: 4 }} />
                        </Container>
                    </ThemeProvider>
                </Box>

        </Grid>


    );
}