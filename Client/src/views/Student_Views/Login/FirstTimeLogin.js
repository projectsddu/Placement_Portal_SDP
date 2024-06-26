import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Button, TextField } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler'
import { useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from './AuthWrapper1';
// import Logo from './../../../../ui-component/Logo';
import Logo from './../../../layout/MainLayout/LogoSection/index';
import AuthCardWrapper from './AuthCardWrapper';
import RestLogin from './RestLogin';
import AuthFooter from './../../../ui-component/cards/AuthFooter';
import UsePost from "../../../Utilities/UsePost"
import { useHistory } from "react-router-dom"

// assets

//================================|| LOGIN MAIN ||================================//

const FirstTimeLogin = () => {
    const history = useHistory()
    const handleSubmit = async () => {
        console.log(password)
        const res = await UsePost("/studentLogin/changePasswordFirstTime", password, "POST")
        console.log(res)
        const data = res.data
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        responsePipelineHandler(params1, 1)
        if (data == "Password updated successfully") {
            history.push("/_student/login")
        }

    }
    const [password, setpassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [showPassword, setShow] = useState(false)
    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '95vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid style={{ marginLeft: "-8%" }} item sx={{ mb: 3 }} >
                                        <RouterLink to="#">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.grey}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Dharmsinh Desai University
                                                    </Typography>
                                                    <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : ''}>
                                                        Change your password make sure it is not same as the first time password                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>

                                        <TextField
                                            type={showPassword ? "text" : "password"}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    handleSubmit(e)
                                                }
                                            }}
                                            fullWidth
                                            value={password.oldPassword}
                                            onChange={(e) => {
                                                setpassword({ ...password, oldPassword: e.target.value });
                                            }}
                                            label="Enter First Time Password" />
                                        <br />
                                        <br />
                                        <TextField
                                            type={showPassword ? "text" : "password"}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    handleSubmit(e)
                                                }
                                            }}
                                            onChange={(e) => {
                                                setpassword({ ...password, newPassword: e.target.value });
                                            }}
                                            value={password.newPassword}
                                            fullWidth label="Enter  New Password" />
                                        <br />
                                        <br />
                                        <TextField
                                            type={showPassword ? "text" : "password"}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    handleSubmit(e)
                                                }
                                            }}
                                            onChange={(e) => {
                                                setpassword({ ...password, confirmNewPassword: e.target.value });
                                            }}
                                            value={password.confirmNewPassword}
                                            fullWidth label="Confirm New Password" /><br />
                                        <br />
                                        {/* <br /> */}
                                        <Button
                                            onClick={() => handleSubmit()}
                                            fullWidth variant="contained" size="large">Change Password</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={RouterLink}
                                                to="/register"
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                Don't have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid> */}
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid> */}
            </Grid>
        </AuthWrapper1>
    );
};

export default FirstTimeLogin;
