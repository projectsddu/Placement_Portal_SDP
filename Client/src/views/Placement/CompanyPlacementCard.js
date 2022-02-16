import { Typography, MenuItem, Button, Checkbox } from '@material-ui/core';
import React from 'react';
import SubCard from '../../ui-component/cards/SubCard';
import { TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const Input = styled('input')({
    display: 'none'
});

function CompanyPlacementCard({ companies }) {
    return (
        <>
            <SubCard>
                <TextField
                    fullWidth
                    id="companies"
                    select
                    // required
                    label="Select Company"
                >
                    {companies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <br />
                <br />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item>
                        <label htmlFor="contained-button-file">
                            {/* <label>Job Description File</label>    */}
                            <Input
                                // onChange={changeHandler}
                                // required
                                // accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <Button variant="outlined" component="span">
                                Upload Job File
                            </Button>
                            <label id="fileUploadName"> </label>
                        </label>
                    </Grid>

                    <Grid item>
                        <Checkbox/> <label>Final</label>
                    </Grid>
                </Grid>
            </SubCard>
            <br />
        </>
    );
}

export default CompanyPlacementCard;
