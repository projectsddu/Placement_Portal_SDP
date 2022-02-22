import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField } from '@material-ui/core';
import CompanyPlacementCard from './CompanyPlacementCard';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import useFetch from '../../Utilities/useFetch';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconCirclePlus } from '@tabler/icons';
import Grid from '@mui/material/Grid';
import SubCard from '../../ui-component/cards/SubCard';
import { Typography } from '@material-ui/core';
import { ParseDate } from '../../Utilities/ParseDate';

function AddPlacement() {

    const [studentData, setStudentData] = useState('');
    const [stduentDetails, setStduentDetails] = useState(undefined);



    async function handleChange(e) {
        setStudentData(e.target.value)

        if (e.target.value.length === 10) {
            let response = undefined
            response = await fetch("/student/getOneStudentInAdmin/" + e.target.value.toUpperCase(), { method: "GET" })

            if (response != undefined) {
                let jsonData = undefined
                jsonData = await response.json()
                if (jsonData != undefined) {
                    console.log(jsonData);
                    setStduentDetails(jsonData["data"])
                }
            }


        }

    }

    function handleClick() {
        // console.log("keval")
        let placement_card_copy = placementCard;
        placement_card_copy.push(<CompanyPlacementCard />);
        setPlacementCard([].concat(placement_card_copy));
    }

    const [first, setfirst] = useState("")
    useEffect(() => {
        console.log(first)
    }, [first])

    let oppo = 9000
    function checkMe(str1) {
        setfirst(str1 + oppo + "From GHere")
    }

    const [placementCard, setPlacementCard] = useState([<CompanyPlacementCard />]);
    return (
        <>
            <MainCard title="Add Placement">
                <TextField
                    fullWidth
                    // required
                    label="Student ID"
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    id="fullWidth"
                    helperText="Enter Student ID"
                />
                <br />
                <br />
                {stduentDetails === undefined ? "" : <SubCard>
                    <Grid container justifyContent={"flex-start"} spacing={2}>
                        <Grid item md={4} xs={12}>
                            <Typography variant="h3">

                                {stduentDetails.FirstName + " " + stduentDetails.MiddleName + " " + stduentDetails.LastName}
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Typography variant="h3">

                                {stduentDetails.Current_CPI}
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>

                        </Grid>
                    </Grid>
                </SubCard>}

                {placementCard.map((e) => {
                    return e;
                })}

                <br />
                <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                    <LoadingButton
                        color="primary"
                        onClick={handleClick}
                        loading={false}
                        loadingPosition="start"
                        startIcon={<IconCirclePlus />}
                        variant="contained"
                    >
                        Add
                    </LoadingButton>
                </Grid>
            </MainCard>
        </>
    );
}

export default AddPlacement;
