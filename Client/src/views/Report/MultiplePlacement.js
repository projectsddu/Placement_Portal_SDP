import React, { useState, useEffect } from 'react'

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

import { Button } from '@material-ui/core'

import { styled } from '@mui/material/styles';

import UsePostFile from '../../Utilities/UsePostFile'
import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import UseFetch from '../../Utilities/UseFetch';
import { TextField } from '@material-ui/core';
import Grid from '@mui/material/Grid';

export default function MultiplePlacement() {

    // const [data, setData] = useState({
    // });
    // useEffect(() => { }, [data]);


    async function handleSubmit() {

        // const res = await UsePostFile("/student/addStudent", data, "POST")
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        // console.log(res);
        responsePipelineHandler(params1, 1)
        // END OF POSTING DATA EXAMPLE
    }

    return (
        <MainCard title="Download Multiple Student Placement Report">
                <TextField
                    fullWidth
                    // required
                    label="Enter Batch Year"
                    // onInput={(e) => {
                    //     handleChange(e)
                    // }}
                    id="fullWidth"
                    // helperText="Enter Batch Year"
                />
                <br />
                <br />
                {/* <Grid item md={6} xs={12}>
                    <TextField
                        // value={studentPlacementStateDetails.Designation}
                        // onChange={(e) => {
                        //     setstudentPlacementStateDetails({ ...studentPlacementStateDetails, Designation: e.target.value });
                        // }}
                        fullWidth 
                        label="Designation"
                        />
                </Grid> */}
        </MainCard>
    )
}
