import React, { useState, useEffect } from 'react'

// material-ui
import { Grid, Typography } from '@material-ui/core';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';

import { Button, Chip } from '@material-ui/core'

import { styled } from '@mui/material/styles';

import UsePostFile from '../../../Utilities/UsePostFile'
import HandleToast from '../../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import UseFetch from '../../../Utilities/UseFetch';

import { gridSpacing } from '../../../store/constant';

const Input = styled('input')({
    display: 'none',
});



export default function UploadResumeCard({ CV_Upload }) {

    const [data, setData] = useState({
    });
    useEffect(() => { }, [data]);

    const changeHandler = (event) => {
        console.log(event.target.files[0])
        const file_data = event.target.files[0]
        const file_name = event.target.files[0]["name"]
        document.getElementById("fileUploadName2").innerText = " " + file_name
        let temp = data
        temp["Student_CV_File"] = file_data
        setData(temp)
    };

    async function handleSubmit() {

        const res = await UsePostFile("/student/addCV", data, "POST")
        // console.log(res);
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
        <MainCard title="Add Student CV">
            <Grid container spacing={gridSpacing}>
                <Grid item>
                    <form enctype="multipart/form-data" id="CVForm">
                        <label htmlFor="contained-button-file">
                            <Input
                                onChange={(e) => changeHandler(e)}
                                required
                                accept=".pdf"
                                id="contained-button-file"
                                multiple type="file"
                            />
                            <Button variant="outlined" size="large" component="span">
                                Upload CV
                            </Button>
                            <b><label id="fileUploadName2"> </label></b>
                        </label>
                        <br />
                        <br />
                    </form>
                </Grid>

                <Grid item>
                    <Button onClick={handleSubmit} variant="contained" size="large" color="primary">
                        Add CV
                    </Button>
                </Grid>

                <Grid item>

                    {/* <Chip label={"View Student CV"} /> */}





                    {CV_Upload === undefined ? "Wait Loading...." : <>
                        {CV_Upload.includes("/public/student_details/CV") ?
                            <a target='blank'
                                style={{ "text-decoration": "none", "cursor": "pointer" }}
                                href={
                                    CV_Upload}
                            >
                                <Button variant="contained" size="large" color="primary">
                                    View CV
                                </Button>
                            </a> :
                            <>
                                <Chip label="No CV Uploaded!" />
                            </>
                        }

                    </>
                    }

                </Grid>


            </Grid>
        </MainCard>
    )
}