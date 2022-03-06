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

const Input = styled('input')({
    display: 'none',
});



export default function UpdateStudent() {

    const [data, setData] = useState({
    });
    useEffect(() => { }, [data]);

    const changeHandler = (event) => {
        document.getElementById("fileUploadDetails").innerText = event.target.files[0].name
        // console.log(event.target.files[0])
        const file_data = event.target.files[0]
        let temp = data
        temp["Student_Details_File"] = file_data
        setData(temp)
    };

    async function handleSubmit() {

        const res = await UsePostFile("/student/updateStudent/", data, "POST")
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
        <MainCard title="Update Student Details">
            <form enctype="multipart/form-data">
                <label htmlFor="contained-button-file">
                    <Input
                        onChange={(e) => changeHandler(e)}
                        required
                        accept=".xlsx, .xls, .csv"
                        id="contained-button-file"
                        multiple type="file"
                    />
                    <Button variant="contained" component="span">
                        Upload Student Details
                    </Button> <label id="fileUploadDetails" />
                </label>
                <br />
                <br />
                <br />
                <br />
                <Button onClick={handleSubmit} variant="contained" size="large" color="primary">
                    Update Student
                </Button>
            </form>
        </MainCard>
    )
}
