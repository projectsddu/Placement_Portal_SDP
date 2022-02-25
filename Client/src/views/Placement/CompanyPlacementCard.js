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
        // Designation: props.details.Designation,
        // Salary: props.details.Salary,
        // Offer_Letter: props.details.Offer_Letter,
        // Passed_out_year: props.details.Passed_out_year,
        // IsFinal: props.details.IsFinal,
        // Company_Name: props.details.Company_name,
        // Company_ID: 1,
        Designation: "",
        Salary: "",
        Offer_Letter: "",
        Passed_out_year: "",
        IsFinal: "",
        Company_Name: "",
        Company_ID: 1,
    });

    let [studentPlacementStateDetails, setstudentPlacementStateDetails] = useState(
        props.details
    );



    function onAddPlacement() {
        console.log(studentPlacementDetails)
    }

    function onUpdatePlacement() {

        console.log(studentPlacementDetails)
    }

    function onDeletePlacement() {

    }

    function onButtonClick(event) {

        // Updations Here

        if (event == "add") {
            onAddPlacement()
        }
        else if (event == "update") {
            onUpdatePlacement()
        }
        else if (event == "delete") {
            onDeletePlacement()
        }
    }


    function UpdateStudentState(property, value) {
        let studentPlacementCopy = studentPlacementDetails
        studentPlacementCopy[property] = value
        setstudentPlacementDetails(studentPlacementCopy)
        console.log(studentPlacementCopy)
    }


    function handleKeyChange(e, property) {
        UpdateStudentState(property, e.target.value)
    }







    let companies = [];
    for (let i = 0; i < props.allCompanies.length; i++) {
        var obj = {};
        obj['value'] = props.allCompanies[i]['Company_ID'];
        obj['label'] = props.allCompanies[i]['Company_name'];
        companies.push(obj);
    }

    useEffect(() => {

        console.log(props)
        setstudentPlacementStateDetails(props.details)
    }, [])


    return (
        <>

            <SubCard>
                <Button onClick={() => {
                    console.log(studentPlacementStateDetails)
                }} >View State</Button>

                {studentPlacementStateDetails.Company_details === undefined ? <TextField
                    fullWidth
                    id="companies"
                    value={studentPlacementStateDetails.Company_details === undefined ? '' : studentPlacementStateDetails.Company_details.Company_name}
                    select
                    label="Select Company"
                >
                    {companies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField> :
                    <>
                        <TextField value={studentPlacementStateDetails.Company_details.Company_name} disabled fullWidth></TextField>


                    </>
                }


                <br />

                <br />

                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            value={studentPlacementStateDetails.Designation}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Designation: e.target.value });
                            }}
                            fullWidth label="Designation"></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            // onChange={(e) => handleKeyChange(e, "Salary")}
                            onChange={(e) => {
                                setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Salary: e.target.value });
                            }}
                            value={studentPlacementStateDetails.Salary}
                            fullWidth label="Salary"></TextField>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={2} xs={12}>
                        <label htmlFor="contained-button-file">
                            <Input

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
                        {studentPlacementStateDetails.Company_details === undefined ? (
                            <Grid item>
                                <Button
                                    onClick={() => onButtonClick("add")}
                                    variant="contained" style={{ 'margin-top': '15%' }} size="medium" component="span">
                                    Add Placement
                                </Button>
                            </Grid>
                        ) : (
                            <Grid container justifyContent="flex-end" spacing={2}>

                                <Grid item>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        style={{ 'margin-top': '15%' }}
                                        size="medium"
                                        component="span"
                                        onClick={() => onButtonClick("delete")}
                                    >
                                        Delele Placement
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="warning"
                                        variant="contained"
                                        style={{ 'margin-top': '15%', "color": "white", "background": "#FFC107" }}
                                        size="medium"
                                        component="span"
                                        onClick={() => onButtonClick("update")}
                                    >
                                        Update Placement
                                    </Button>
                                </Grid>
                            </Grid>
                        )}

                    </Grid>
                </Grid>
            </SubCard>
            <br />
        </>
    );
}

export default CompanyPlacementCard;
