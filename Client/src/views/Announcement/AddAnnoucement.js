import React from 'react';
import { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import {
    Card,
    Box,
    TextField,
    MenuItem,
    FormControl,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    Switch,
    FormGroup,
    Stack,
    Button,
    Checkbox
} from '@material-ui/core';
import SecondaryAction from './../../ui-component/cards/CardSecondaryAction';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UsePost from '../../Utilities/UsePost'
import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';

// style constant
const useStyles = makeStyles((theme) => ({
    frame: {
        height: 'calc(100vh - 210px)',
        border: '1px solid',
        borderColor: theme.palette.primary.light
    }
}));

// Eligible Branches

const Branches = [
    {
        value: 'CE',
        label: 'Computer Engineering'
    },
    {
        value: 'IT',
        label: 'Information Technology'
    },
    {
        value: 'EC',
        label: 'Electronics & Communication'
    }
];

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const Input = styled('input')({
    display: 'none'
});

function AddAnnoucement() {
    const [data, setData] = useState({
        Company_Name: '',
        Date_of_announcement: null,
        Date_of_Visit: null,
        Eligible_Branches: '',
        Passed_out_year: null,
        Job_Role: '',
        Salary: '',
        Job_Location: '',
        Bond_Details: '',
        Other_Details: '',
        Job_Description_File: '',
        Registration_Deadline: null,
        Eligiblity: ''
    });
    useEffect(() => { }, [data]);


    async function handleSubmit() {

        const res = await UsePost("/annoucement/addAnnoucement", data, "POST")
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }

        responsePipelineHandler(params1, 1)
        // END OF POSTING DATA EXAMPLE
    }

    // const saveData = async function() {
    //     // console.log("hello from save data");
    //     const { res, waiting } = usePost("/annoucement/addAnnoucement", data, "POST")
    //     const params1 = {
    //         data: res,
    //         HandleToast: {
    //             toast: toast,
    //             flag: false,
    //         }
    //     }
    // }

    return (
        <MainCard title="Add Annoucement" >
            <form enctype="multipart/form-data">
                <TextField
                    fullWidth
                    label="Company Name"
                    id="fullWidth"
                    helperText="Enter Comapny Name"
                    value={data['Company_Name']}
                    onChange={(e) => {
                        setData({ ...data, Company_Name: e.target.value });
                    }}
                />
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Visit"
                                value={data['Date_of_Visit']}
                                onChange={(e) => {
                                    setData({ ...data, Date_of_Visit: e });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Visit"
                                value={data['Date_of_announcement']}
                                onChange={(e) => {
                                    setData({ ...data, Date_of_announcement: e });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                label="Passed Out Year"
                                value={data['Passed_out_year']}
                                onChange={(e) => {
                                    setData({ ...data, Passed_out_year: e });
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <br />
                <br />

                <TextField
                    fullWidth
                    id="eligible-currencies"
                    select
                    label="Select Branch"
                    value={data['Eligible_Branches']}
                    onChange={(e) => {
                        setData({ ...data, Eligible_Branches: e.target.value });
                    }}
                >
                    {Branches.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <br />
                <br />
                <TextField
                    fullWidth
                    label="Job Role"
                    id="fullWidth"
                    helperText="Enter Job Role"
                    value={data['Job_Role']}
                    onChange={(e) => {
                        setData({ ...data, Job_Role: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    label="Salary"
                    id="fullWidth"
                    helperText="Enter Salary"
                    value={data['Salary']}
                    onChange={(e) => {
                        setData({ ...data, Salary: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    label="Job Location"
                    id="fullWidth"
                    helperText="Enter Job Location"
                    value={data['Job_Location']}
                    onChange={(e) => {
                        setData({ ...data, Job_Location: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    label="Bond Details"
                    id="fullWidth"
                    helperText="Enter Bond Details"
                    value={data['Bond_Details']}
                    onChange={(e) => {
                        setData({ ...data, Bond_Details: e.target.value });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    label="Other Details"
                    id="fullWidth"
                    helperText="Enter Other Details"
                    value={data['Other_Details']}
                    onChange={(e) => {
                        setData({ ...data, Other_Details: e.target.value });
                    }}
                />
                <br />
                <br />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item>
                        <label htmlFor="contained-button-file">
                            {/* <label>Job Description File</label>    */}
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="outlined" component="span">
                                Upload Job Description File
                            </Button>
                        </label>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                label="Passed Out Year"
                                value={data['Registration_Deadline']}
                                onChange={(e) => {
                                    setData({ ...data, Registration_Deadline: e });
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <br />
                <br />
                <TextField
                    fullWidth
                    label="Eligibility"
                    id="fullWidth"
                    helperText="Eligibility"
                    value={data['Eligibility']}
                    onChange={(e) => {
                        setData({ ...data, Eligibility: e.target.value });
                    }}
                />

                <br />
                <br />
                <Button onClick={handleSubmit} variant="contained" size="large" color="primary">
                    Add Annoucement
                </Button>

            </form>

        </MainCard>
    );
}

export default AddAnnoucement;
