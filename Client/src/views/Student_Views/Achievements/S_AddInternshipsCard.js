import { TextField, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import SubCard from '../../../ui-component/cards/SubCard';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ToastContainer, toast } from 'react-toastify';

function S_AddInternshipsCard(props) {
    let [studentInternshipStateDetails, setStudentInternshipStateDetails] = useState(props.details);

    // console.log(props.details);

    function onAddInternship() {
      console.log("hello from the add internship")
    }

    function onUpdateInternship() {}

    function onDeleteInternship() {}

    function onButtonClick(event) {
        // required fields validations
        const keys = Object.keys(studentInternshipStateDetails);
        // console.log(keys)
        let count = 0;
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            console.log(studentInternshipStateDetails[key]);
            if (studentInternshipStateDetails[key] == '' || studentInternshipStateDetails[key] == null) {
                // alert("Please fill all fields.")
                count++;
            }
        }
        // console.log("Count: ", count)
        if (count != 0) {
            toast.error("All fields are required in internships!")
        } 
        else {
            if (event == 'add') {
                onAddInternship();
            } else if (event == 'update') {
                onUpdateInternship();
            } else if (event == 'delete') {
                onDeleteInternship();
            }
        }
    }

    return (
        <>
            <SubCard>
                <TextField
                    fullWidth
                    // required
                    label="Company Name"
                    id="company_name"
                    helperText="Enter the company name"
                    value={studentInternshipStateDetails.Company_Name}
                    onChange={(e) => {
                        setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Company_Name: e.target.value });
                    }}
                />
                <br />
                <br />

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                // required
                                value={studentInternshipStateDetails.Start_Date}
                                onChange={(e) => {
                                    setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Start_Date: e });
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                // required
                                value={studentInternshipStateDetails.End_Date}
                                onChange={(e) => {
                                    setStudentInternshipStateDetails({ ...studentInternshipStateDetails, End_Date: e });
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Description"
                    id="Description"
                    helperText="Enter the brief decription of internship"
                    multiline
                    rows={5}
                    maxRows={3}
                    value={studentInternshipStateDetails.Description}
                    onChange={(e) => {
                        setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Description: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Company Address"
                    id="company_address"
                    helperText="Enter the company address"
                    multiline
                    rows={5}
                    maxRows={3}
                    value={studentInternshipStateDetails.Company_Address}
                    onChange={(e) => {
                        setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Company_Address: e.target.value });
                    }}
                />
                <br />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button
                            onClick={() => onButtonClick('add')}
                            variant="contained"
                            style={{ 'margin-top': '15%' }}
                            size="medium"
                            component="span"
                        >
                            Add Internship
                        </Button>
                    </Grid>
                </Grid>
            </SubCard>
            <br />
            <ToastContainer/>
        </>
    );
}

export default S_AddInternshipsCard;
