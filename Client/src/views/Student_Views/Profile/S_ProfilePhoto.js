import React from 'react'
import { makeStyles } from '@material-ui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Theme } from '@material-ui/core';

export default function S_ProfilePhoto(props) {
    const useStyles = makeStyles({
        logo: {
            maxWidth: 160,
        },
    });
    const classes = useStyles();
    return (
        // <AppBar color="inherit">
        // <Toolbar>
        <>

            <img style={{ "max-width": "230px", "max-height": "230px", "borderRadius": "2%" }} src={"http://localhost:8000" + props.student_photo.split(".")[1] + "." + props.student_photo.split(".")[2]} alt="logo" className={classes.logo} />
        </>
        // </Toolbar>
        // </AppBar>
    )
}
