import { Typography, MenuItem, Button, Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import SubCard from '../../ui-component/cards/SubCard';
import { TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import useFetch from '../../Utilities/useFetch';
import { Select } from '@mui/material';

const Input = styled('input')({
    display: 'none'
});

function CompanyPlacementCard(props) {
    // let [studentPlacementDetails, setstudentPlacementDetails] = useState({
    //     Designation: "",
    //     Salary: "",
    //     Offer_Letter: "",
    //     Passed_out_year: "",
    //     IsFinal: false,
    //     Company_ID: "",
    // })
    let [studentPlacementDetails, setstudentPlacementDetails] = useState({
        Designation: props.details.Designation,
        Salary: props.details.Salary,
        Offer_Letter: props.details.Offer_Letter,
        Passed_out_year: props.details.Passed_out_year,
        IsFinal: props.details.IsFinal,
        Company_Name: props.details.Company_name,
        Company_ID: 1
    });
    // console.log(props.details)

    useEffect(() => {
        console.log(props.details);
    }, []);

    // useEffect(() => {
    //     console.log(props.details)
    // }, [])

    const { required_data, loading } = useFetch('/annoucement/requiredAnnoucementDetails', 'GET');

    let companies = [];
    if (!loading) {
        console.log(props);
        // console.log(props.placedCompanyLabel)
        // for (let i = 0; i < required_data['data'].length; i++) {
        for (let i = 0; i < props.allCompanies.length; i++) {
            // console.log("Company Id: ", required_data["data"][i]["Company_ID"]);
            var obj = {};
            obj['value'] = props.allCompanies[i]['Company_ID'];
            obj['label'] = props.allCompanies[i]['Company_name'];
            companies.push(obj);
        }

        // console.log(companies)
    }

    return (
        <>
            {/* {props.details.Company_details === undefined ? "keval" : "jenil"}{props.companyName} */}
            <SubCard>
                {props.details.Company_details === undefined ? (
                    <TextField
                        fullWidth
                        id="companies"
                        value={props.details.Company_details === undefined ? '' : props.details.Company_details.Company_name}
                        // value={"keval"}
                        select
                        label="Select Company"
                    >
                        {companies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                ) : (
                    <TextField value={props.details.Company_details.Company_name} disabled fullWidth></TextField>
                )}

                <br />
                <br />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField value={props.details.Designation} fullWidth label="Designation"></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField value={props.details.Salary} fullWidth label="Salary"></TextField>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={2} xs={12}>
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

                    <Grid item md={2} xs={12}>
                        <Checkbox value={props.details.IsFinal} /> <label>Final</label>
                    </Grid>
                    <Grid container md={8} xs={12} justifyContent="flex-end">
                        {props.details.Company_details === undefined ? (
                            <Grid item>
                                <Button variant="contained" style={{ 'margin-top': '15%' }} size="medium" component="span">
                                    Add Placement
                                </Button>
                            </Grid>
                        ) : (
                            <Grid container justifyContent="flex-end" spacing={2}>
                                <Grid item>
                                    <Button
                                        color="warning"
                                        variant="contained"
                                        style={{ 'margin-top': '15%' }}
                                        size="medium"
                                        component="span"
                                    >
                                        Update Placement
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        style={{ 'margin-top': '15%' }}
                                        size="medium"
                                        component="span"
                                    >
                                        Delele Placement
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                        {/* <Button variant="contained" style={{ 'margin-top': '15%' }} size="medium" component="span">
                                Add Placement
                            </Button> */}
                    </Grid>
                </Grid>
            </SubCard>
            <br />
        </>
    );
}

export default CompanyPlacementCard;
