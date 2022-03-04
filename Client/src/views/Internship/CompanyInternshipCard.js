import { Typography, MenuItem, Button, Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SubCard from '../../ui-component/cards/SubCard';
import { TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import UseFetch from '../../Utilities/UseFetch';
import UsePost from '../../Utilities/UsePost'
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import HandleToast from '../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
const axios = require("axios");

const Input = styled('input')({
    display: 'none'
});

function CompanyInternshipCard(props) {
    let [studentInternshipStateDetails, setStudentInternshipStateDetails] = useState(props.details);

    let companies = [];
    for (let i = 0; i < props.allCompanies.length; i++) {
        var obj = {};
        obj['value'] = props.allCompanies[i]['Company_ID'];
        obj['label'] = props.allCompanies[i]['Company_name'];
        companies.push(obj);
    }
    console.log(companies);
    useEffect(() => {
        console.log(props);
        setStudentInternshipStateDetails(props.details);
    }, []);


    async function onAddInternship() {
        let updated_details = studentInternshipStateDetails;
        const res = await UsePost('/studentinternship/addStudentInternship', updated_details, 'POST');
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false
            }
        };
        console.log(res);
        responsePipelineHandler(params1, 1);
    }

    async function onUpdateInternship() {
        let updated_details = studentInternshipStateDetails;
        // updated_details["Company_details"] = ""
        delete (updated_details.Company_details)
        console.log(updated_details)
        const res = await UsePost('/studentinternship/updateStudentInternship/' + updated_details.id, updated_details, 'POST');
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false
            }
        };
        console.log(res);
        responsePipelineHandler(params1, 1);
    }

    async function onDeleteInternship() {

        let Resp = await axios({
            method: 'post',
            url: "/studentinternship/deleteStudentInternship/" + studentInternshipStateDetails.id,
        });

        console.log(Resp)
        const params1 = {
            data: Resp.data,
            HandleToast: {
                toast: toast,
                flag: false
            }
        };
        responsePipelineHandler(params1, 1);
        handleClose()
        console.log(props)
        props.callerFunc(props.seed, "delete")

    }

    function onButtonClick(event) {

        // Updations Here

        if (event == "add") {
            onAddInternship()
        }
        else if (event == "update") {
            onUpdateInternship()
        }
        else if (event == "delete") {
            onDeleteInternship()
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <SubCard>
                {/* <TextField
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
                <br /> */}

                {studentInternshipStateDetails.Company_details === undefined ? (
                    <TextField
                        fullWidth
                        id="companies"
                        onChange={(e) => {
                            setStudentInternshipStateDetails({ ...studentInternshipStateDetails, Company_ID: e.target.value });
                        }}
                        select
                        label="Select Company"
                    >
                        {companies.map((option) => (
                            <MenuItem
                                onSelect={(e) => {
                                    console.log(e);
                                }}
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                ) : (
                    <>
                        <TextField value={studentInternshipStateDetails.Company_details.Company_name} disabled fullWidth></TextField>
                    </>
                )}
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
                                setStudentInternshipStateDetails({ ...studentInternshipStateDetails, External_Guide_Mobile_Number: e.target.value });
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
                                setStudentInternshipStateDetails({ ...studentInternshipStateDetails, External_Guide_Email_ID: e.target.value });
                            }}
                        />
                    </Grid>
                </Grid>
                <br />
                <Grid container xs={12} justifyContent="flex-end">
                    {studentInternshipStateDetails.Company_details === undefined ? (
                        <Grid item>
                            <Button
                                onClick={() => onButtonClick("add")}
                                variant="contained" style={{ 'margin-top': '15%' }} size="medium" component="span">
                                Add Internship
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
                                    onClick={handleOpen}
                                >
                                    Delele Internship
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
                                // onClick={handleOpen}
                                >
                                    Update Internship
                                </Button>

                            </Grid>
                        </Grid>
                    )}

                    {/* <Button onClick={handleOpen}>Open modal</Button> */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography style={{ "color": "#616161" }} id="modal-modal-title" variant="h3" component="h1">
                                Are, you really sure want to delete this internship?
                            </Typography><br />
                            <Grid container spacing={2} justifyContent={""}>
                                <Grid md={6} item>
                                    <Button fullWidth style={{ color: "white", backgroundColor: "#00C853" }} variant="contained"
                                        onClick={() => onButtonClick("delete")}
                                    >
                                        Confirm
                                    </Button>
                                </Grid>
                                <Grid md={6} item>
                                    <Button fullWidth color='error' variant="contained" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>

                        </Box>
                    </Modal>

                </Grid>
            </SubCard>
            <br />
        </>
    );
}

export default CompanyInternshipCard;
