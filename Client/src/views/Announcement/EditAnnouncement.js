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
import UsePostFile from '../../Utilities/UsePostFile'
import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import useFetch from '../../Utilities/useFetch';
import { useLocation } from "react-router-dom";

// style constant
const useStyles = makeStyles((theme) => ({
    frame: {
        height: 'calc(100vh - 210px)',
        border: '1px solid',
        borderColor: theme.palette.primary.light
    }
}));


// getting required data




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

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const [data, setData] = useState({
        Company_ID: '',
        Date_of_announcement: null,
        Date_of_Visit: null,
        Eligible_Branches: '',
        Passed_out_year: null,
        Job_Role: '',
        Salary: '',
        Job_Location: '',
        Bond_Details: '',
        Other_Details: '',
        Registration_Deadline: null,
        Eligibility: ''
    });

    const location = useLocation().pathname;
    const id = location.split("/")[3]

    const { required_data, loading } = useFetch("/annoucement/getAnnoucement/" + id, "GET")

    let announcement_details;
    let count = 0;
    
    if (!loading) {
        announcement_details = required_data["data"][0];
        console.log("here: ",announcement_details);
        
        // if(count === 0) {
        //     setData(setting_data);
        //     count++;
        // }
    }
    // function setSettingData(announcement_details)
    // {
    //     var setting_data;
    //     setting_data= {
    //             Company_ID: announcement_details["Company_ID"],
    //             Date_of_announcement: announcement_details["Date_of_announcement"],
    //             Date_of_Visit: announcement_details["Date_of_Visit"],
    //             Eligible_Branches: announcement_details["Eligible_Branches"],
    //             Passed_out_year: announcement_details["Passed_out_year"],
    //             Job_Role: announcement_details["Job_Role"],
    //             Salary: announcement_details["Salary"],
    //             Job_Location: announcement_details["Job_Location"],
    //             Bond_Details: announcement_details["Bond_Details"],
    //             Other_Details: announcement_details["Other_Details"],
    //             Registration_Deadline: announcement_details["Registration_Deadline"],
    //             Eligibility: announcement_details["Eligibility"]
    //         }
    //         setData(setting_data);
    // }

    // if(!loading && count==0)
    // { 
    //     setSettingData(announcement_details);
    //     count=1
    // }
    // useEffect(async function() {
    //     if (!loading) {
            
    //     }
    // }, []);



    const changeHandler = (event) => {
        console.log(event.target.files[0])
        const file_data = event.target.files[0]
        let temp = data
        temp["Job_Description_File"] = file_data
        setData(temp)
    };

    async function handleSubmit() {

        const res = await UsePostFile("/annoucement/addAnnoucement", data, "POST")
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        console.log(res);
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
        <MainCard title="Edit Annoucement" >
            <form enctype="multipart/form-data">
                {/* <TextField
                    fullWidth
                    label="Company Name"
                    id="fullWidth"
                    helperText="Enter Comapny Name"
                    value={data['Company_Name']}
                    onChange={(e) => {
                        setData({ ...data, Company_Name: e.target.value });
                    }}
                /> */}
                {loading?console.log("Hereing"):()=>{

                    setData({
                        Company_ID: announcement_details["Company_ID"],
                        Date_of_announcement: announcement_details["Date_of_announcement"],
                        Date_of_Visit: announcement_details["Date_of_Visit"],
                        Eligible_Branches: announcement_details["Eligible_Branches"],
                        Passed_out_year: announcement_details["Passed_out_year"],
                        Job_Role: announcement_details["Job_Role"],
                        Salary: announcement_details["Salary"],
                        Job_Location: announcement_details["Job_Location"],
                        Bond_Details: announcement_details["Bond_Details"],
                        Other_Details: announcement_details["Other_Details"],
                        Registration_Deadline: announcement_details["Registration_Deadline"],
                        Eligibility: announcement_details["Eligibility"]
                    })
                    console.log(data)
                }
                }
                <TextField
                    fullWidth
                    required
                    label="Job Role"
                    id="companies"
                    helperText="Enter Job Role"
                    value={loading ? "" : announcement_details["Company_Details"]['Company_name']}
                    onChange={(e) => {
                        setData({ ...data, Job_Role: e.target.value });
                    }}
                />
                {/* <TextField
                    fullWidth
                    id="companies"
                    select
                    required
                    label="Select Company"
                    value={loading ? "" : announcement_details["Company_Details"]['Company_name']}
                    onChange={(e) => {
                        setData({ ...data, Company_ID: e.target.value });
                    }}
                > */}
                    {/* {companies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))} */}
                {/* </TextField> */}
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Visit"
                                required
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
                                label="Date of Annoucement"
                                required
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
                                required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                            <Input onChange={changeHandler}
                                required
                                // accept="image/*"
                                id="contained-button-file" multiple type="file" />
                            <Button variant="outlined" component="span">
                                Upload Job Description File
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Registration Deadline"
                                required
                                value={data['Registration_Deadline']}
                                onChange={(e) => {
                                    setData({ ...data, Registration_Deadline: e });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    {/* <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                required
                                label="Passed Out Year"
                                value={data['Registration_Deadline']}
                                onChange={(e) => {
                                    setData({ ...data, Registration_Deadline: e });
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </LocalizationProvider>
                    </Grid> */}
                </Grid>
                <br />
                <br />
                <TextField
                    fullWidth
                    required
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
                    Edit Annoucement
                </Button>

            </form>

        </MainCard>
    );
}

export default AddAnnoucement;
