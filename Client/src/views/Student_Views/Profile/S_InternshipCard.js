import React, { useState, useEffect } from 'react';
import SubCard from '../../../ui-component/cards/SubCard';
import { TextField } from '@material-ui/core';
import Grid from '@mui/material/Grid';

function S_InternshipCard(props) {
    let [studentInternshipStateDetails, setStudentInternshipStateDetails] = useState(props.details);

    useEffect(() => {
        // console.log(props);
        setStudentInternshipStateDetails(props.details);
    }, []);

    return (
        <>
            <SubCard>
                <TextField value={studentInternshipStateDetails.Company_details.Company_name} disabled fullWidth></TextField>
                <br />
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Project Title"
                    id="project_title"
                    helperText="Enter the project title"
                    value={studentInternshipStateDetails.Project_Title}
                    onChange={(e) => {
                        setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Project_Title: e.target.value });
                    }}
                />
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            // required
                            label="Stipend"
                            id="stipend"
                            helperText="Enter Stipend"
                            value={studentInternshipStateDetails.Stipend}
                            onChange={(e) => {
                                setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Stipend: e.target.value });
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            // required
                            label="Internal Guide Name"
                            id="internal_guide_id"
                            helperText="Enter the internal guide id"
                            value={studentInternshipStateDetails.Internal_Guide_ID}
                            onChange={(e) => {
                                setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Internal_Guide_ID: e.target.value });
                            }}
                        />
                    </Grid>
                </Grid>
                {/* <br/> */}
                <br />
                <TextField
                    fullWidth
                    // required
                    label="External Guide Name"
                    id="external_guide_name"
                    helperText="Enter the external guide name"
                    value={studentInternshipStateDetails.External_Guide_Name}
                    onChange={(e) => {
                        setStudentInternshipStateDetails({ ...studentInternshipStateDetails, External_Guide_Name: e.target.value });
                    }}
                />
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            // required
                            label="External Guide Mobile Name"
                            id="external_guide_mobile_number"
                            helperText="Enter the external guide mobile name"
                            value={studentInternshipStateDetails.External_Guide_Mobile_Number}
                            onChange={(e) => {
                                setStudentInternshipStateDetails({
                                    ...studentInternshipStateDetails,
                                    External_Guide_Mobile_Number: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            // required
                            label="External Guide Email ID"
                            id="external_guide_email_id"
                            helperText="Enter the external guide email-id"
                            value={studentInternshipStateDetails.External_Guide_Email_ID}
                            onChange={(e) => {
                                setStudentInternshipStateDetails({
                                    ...studentInternshipStateDetails,
                                    External_Guide_Email_ID: e.target.value
                                });
                            }}
                        />
                    </Grid>
                </Grid>
            </SubCard>
            <br />
        </>
    );
}

export default S_InternshipCard;
