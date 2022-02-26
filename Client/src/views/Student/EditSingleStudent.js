import React from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField } from '@mui/material';
import { Grid } from '@material-ui/core';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function EditSingleStudent() {
    return (
        <>
            <MainCard title="Edit Student">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="Student ID"
                            helperText="Enter the Student ID"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="Admission Type"
                            helperText="Enter the admission type"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Birth"
                                // required
                                // value={data['Date_of_Visit']}
                                // onChange={(e) => {
                                //     setData({ ...data, Date_of_Visit: e });
                                // }}
                                renderInput={(params) => <TextField {...params} helperText={'Enter the date of birth'} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="First Name"
                            helperText="Enter the first name"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="Middle Name"
                            helperText="Enter the middle name"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="Last Name"
                            helperText="Enter the last name"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            // required
                            fullWidth
                            label="Gender"
                            helperText="Enter the gender"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            // required
                            fullWidth
                            label="Cast Category"
                            helperText="Enter the cast category"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="SSC Percentage"
                            helperText="Enter the SSC percentage"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="SSC Percentile"
                            helperText="Enter the SSC percentile"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="SSC Board"
                            helperText="Enter the SSC board"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <TextField
                    // required
                    fullWidth
                    label="SSC School"
                    helperText="Enter the SSC school"
                    // value={data['Contact_person_1_Mobile']}
                    // onChange={(e) => {
                    //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                    // }}
                />
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="HSC Percentage"
                            helperText="Enter the HSC percentage"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="HSC percentile"
                            helperText="Enter the HSC percentile"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="HSC_Board"
                            helperText="Enter the HSC board"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <TextField
                    // required
                    fullWidth
                    label="HSC School"
                    helperText="Enter the HSC school"
                    // value={data['Contact_person_1_Mobile']}
                    // onChange={(e) => {
                    //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                    // }}
                />
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item md={3} xs={6}>
                        <TextField
                            // required
                            fullWidth
                            label="Sem - 1 SPI"
                            helperText="Enter the Semester 1 SPI"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <TextField
                            // required
                            fullWidth
                            label="Sem - 2 SPI"
                            helperText="Enter the Semester 2 SPI"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <TextField
                            // required
                            fullWidth
                            label="Sem - 3 SPI"
                            helperText="Enter the Semester 3 SPI"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <TextField
                            // required
                            fullWidth
                            label="Sem - 4 SPI"
                            helperText="Enter the Semester 4 SPI"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item md={3} xs={6}>
                        <TextField
                            // required
                            fullWidth
                            label="Sem - 5 SPI"
                            helperText="Enter the Semester 5 SPI"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <TextField
                            // required
                            fullWidth
                            label="Sem - 6 SPI"
                            helperText="Enter the Semester 6 SPI"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <TextField
                            // required
                            fullWidth
                            label="Sem - 7 SPI"
                            helperText="Enter the Semester 7 SPI"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item md={3} xs={6}>
                        <TextField
                            // required
                            fullWidth
                            label="Sem - 8 SPI"
                            helperText="Enter the Semester 8 SPI"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="Current CPI"
                            helperText="Enter the current CPI"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                label="Enrollment Year"
                                // required
                                // value={data['Passed_out_year']}
                                // onChange={(e) => {
                                //     setData({ ...data, Passed_out_year: e });
                                // }}
                                renderInput={(params) => <TextField {...params} helperText={'Enter the enrollment year'} />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                label="Passed Out Year"
                                fullwidth
                                // required
                                // value={data['Passed_out_year']}
                                // onChange={(e) => {
                                //     setData({ ...data, Passed_out_year: e });
                                // }}
                                renderInput={(params) => <TextField {...params} helperText={'Enter the passed out year'} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="Email ID"
                            helperText="Enter the email-id"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="Contact Number - 1"
                            helperText="Enter the contact number - 1"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="Contact Number - 1"
                            helperText="Enter the contact number - 2"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                </Grid>
                <br />
                <br />
                <TextField
                    fullWidth
                    // required
                    label="Address"
                    id="fullWidth"
                    multiline
                    rows={5}
                    maxRows={4}
                    helperText="Enter the address"
                    // value={data['Other_Details']}
                    // onChange={(e) => {
                    //     setData({ ...data, Other_Details: e.target.value });
                    // }}
                />
                <br />
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="City"
                            helperText="Enter the city"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="Pincode"
                            helperText="Enter the pincode"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            // required
                            fullWidth
                            label="Current Semester"
                            helperText="Enter the current semester"
                            type="number"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                </Grid>
                <br/>
                <br/>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Career Preference"
                            helperText="Enter the career preference"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            // required
                            fullWidth
                            label="Branch"
                            helperText="Enter the branch"
                            // value={data['Contact_person_1_Mobile']}
                            // onChange={(e) => {
                            //     setData({ ...data, Contact_person_1_Mobile: e.target.value });
                            // }}
                        />
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
}

export default EditSingleStudent;
