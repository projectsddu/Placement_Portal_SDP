import { TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from '../../ui-component/cards/SubCard';
import UsePost from '../../Utilities/UsePost';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import HandleToast from '../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';

function GetPlacementReport() {
    const [placementDetails, setPlacementDetails] = useState(undefined);

    const [batchYear, setBatchYear] = useState({
        Passed_out_year: ""
    });

    // useEffect(async () => {
    //     let response = undefined;
    //     response = await fetch('/reports/getPlacementReportByBatchYear/');

    //     if (response != undefined) {
    //         let placementsData = undefined;
    //         placementsData = await response.json();
    //         if (placementsData != undefined) {
    //             let data = placementsData['data'];
    //             console.log(data);
    //         }
    //     }
    // }, []);

    async function handleChange(e)
    {
        setBatchYear({ ...batchYear, Passed_out_year: e.target.value })

        if(e.target.value.length == 4)
        {
            // let updated_details = studentPlacementStateDetails;
            let res = undefined
            res = await UsePost('/reports/getPlacementReportByBatchYear', {Passed_out_year: e.target.value}, 'POST');

            if(res != undefined)
            {
                // console.log(res["data"][1])
                setPlacementDetails(res["data"][1])
            }
            // const params1 = {
            //     data: res,
            //     HandleToast: {
            //         toast: toast,
            //         flag: false
            //     }
            // };
            // console.log(res);
            // responsePipelineHandler(params1, 1);
        }
    }

    return (
        <MainCard title="Placement Report">
            <TextField
                fullWidth
                // required
                label="Batch Year"
                id="fullWidth"
                helperText="Enter Batch year"
                onInput={(e) => {
                    handleChange(e)
                }}
                // value={batchYear['Passed_out_year']}
                // onChange={(e) => {
                //     setBatchYear({ ...batchYear, Passed_out_year: e.target.value });
                // }}
            />
            <br/>
            <br/>
            <SubCard>
                <Typography variant="h4">Total Placed Students: {placementDetails == undefined ? "": placementDetails["Total_Placed"]}</Typography>
                <br />
                <Typography variant="h4">Male: {placementDetails == undefined ? "": placementDetails["Male"]}</Typography>
                <br />
                <Typography variant="h4">Female: {placementDetails == undefined ? "": placementDetails["Female"]}</Typography>
                <br />
                <Typography variant="h4">Average Salary: {placementDetails == undefined ? "": placementDetails["Average_Salary"]}</Typography>
                <br />
                <Typography variant="h4">Median Salary: {placementDetails == undefined ? "": placementDetails["Median_Salary"]}</Typography>
                <br />
                <Typography variant="h4">Maximum Salary: {placementDetails == undefined ? "": placementDetails["Max_Salary"]}</Typography>
                <br />
                <Typography variant="h4">Minimum Salary: {placementDetails == undefined ? "": placementDetails["Min_Salary"] == 100000000 ? "0"  : placementDetails["Min_Salary"]} </Typography>
                <br />
            </SubCard>
        </MainCard>
    );
}

export default GetPlacementReport;
