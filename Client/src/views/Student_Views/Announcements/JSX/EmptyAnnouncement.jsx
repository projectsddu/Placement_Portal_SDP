import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { Grid, Button } from '@material-ui/core';
import { IconInfoCircle } from '@tabler/icons';
import { grey, red } from '@mui/material/colors';
import { blue, lightBlue } from '@material-ui/core/colors';

const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);

// button color
const color = blue[300]

function EmptyAnnouncement() {
    const history = useHistory();

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={10}>
                    <WhiteTextTypography variant="h2">No announcement added yet</WhiteTextTypography>
                </Grid>
            </Grid>
        </>
    );
}

export default EmptyAnnouncement;
