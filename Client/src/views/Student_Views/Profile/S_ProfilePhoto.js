import React from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Theme } from '@material-ui/core';
import { Grid } from '@mui/material';

export default function S_ProfilePhoto(props) {
    const useStyles = makeStyles({
        logo: {
            maxWidth: 160
        }
    });
    const classes = useStyles();
    return (
        // <AppBar color="inherit">
        // <Toolbar>
        <>
            <Grid container justifyContent="center">
                <Grid item>
                    <img
                        style={{ "object-fit": "cover", aspectRatio: "1/1", "max-width": '200px', "max-height": '200px', borderRadius: '50%', border: "1px solid grey" }}
                        src={'https://drive.google.com/uc?export=view&id=' + props.student_photo}
                        alt="logo"
                        className={classes.logo}
                    />
                </Grid>
            </Grid>
        </>
        // </Toolbar>
        // </AppBar>
    );
}
