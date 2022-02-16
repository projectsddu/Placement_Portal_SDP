import React from 'react'
import { makeStyles } from '@material-ui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Theme} from '@material-ui/core';

export default function S_ProfilePhoto() {
    const useStyles = makeStyles({
        logo: {
            maxWidth: 160,
        },
    });
    const classes = useStyles();
  return (
    // <AppBar color="inherit">
        // <Toolbar>
            <img src="logo.png" alt="logo" className={classes.logo} />
        // </Toolbar>
    // </AppBar>
  )
}
