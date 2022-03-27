import React, { useState, useEffect } from 'react';
import SubCard from '../../../ui-component/cards/SubCard';
import { TextField, Typography, MenuItem, Button, Checkbox } from '@material-ui/core';
import Grid from '@mui/material/Grid';


function S_PlacementCard(props) {
    let [studentPlacementStateDetails, setstudentPlacementStateDetails] = useState(props.details);

    useEffect(() => {
        // console.log(props)
        setstudentPlacementStateDetails(props.details);
    }, []);

    return (
        <>
            <SubCard>
                <TextField value={studentPlacementStateDetails.Company_details.Company_name} disabled fullWidth></TextField>
                <br />
                <br />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            value={studentPlacementStateDetails.Designation}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Designation: e.target.value });
                            }}
                            fullWidth
                            label="Designation"
                        ></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            // onChange={(e) => handleKeyChange(e, "Salary")}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Salary: e.target.value });
                            }}
                            value={studentPlacementStateDetails.Salary}
                            fullWidth
                            label="Salary"
                        ></TextField>
                    </Grid>
                </Grid>
                <br />
                <Grid style={{ 'padding-top': '1%' }} container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={2} xs={6} style={{ 'padding-top': '1%' }}>
                        <a
                            target="_blank"
                            href={
                                process.env.NODE_ENV == 'production'
                                    ? 'http://csiddu.tech' + studentPlacementStateDetails.Offer_Letter
                                    : 'http://localhost:8000' + studentPlacementStateDetails.Offer_Letter
                            }
                            style={{ 'text-decoration': 'none' }}
                        >
                            <Button variant="contained">View File</Button>
                        </a>
                    </Grid>
                    
                    <Grid item md={2} xs={6}>
                        <Checkbox
                            checked={studentPlacementStateDetails.IsFinal == 1 ? true : false}
                            value={studentPlacementStateDetails.IsFinal}
                            // onChange={(e) => handleCheckBox(e)}
                        />{' '}
                        <label>Final</label>
                    </Grid>
                </Grid>
            </SubCard>
            <br />
        </>
    );
}

export default S_PlacementCard;
