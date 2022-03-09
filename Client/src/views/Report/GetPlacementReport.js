import { TextField, Typography, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from '../../ui-component/cards/SubCard';
import UsePost from '../../Utilities/UsePost';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import HandleToast from '../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';


function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function GetPlacementReport() {
    const [placementDetails, setPlacementDetails] = useState(undefined);
    const [placementTableDetails, setPlacementTableDetails] = useState([]);

    const [batchYear, setBatchYear] = useState({
        Passed_out_year: ''
    });

    const [detailsCard, setDetailsCard] = useState(false);

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

    async function handleChange(e) {
        setBatchYear({ ...batchYear, Passed_out_year: e.target.value });

        if (e.target.value.length == 4) {
            // let updated_details = studentPlacementStateDetails;
            let res = undefined;
            res = await UsePost('/reports/getPlacementReportByBatchYear', { Passed_out_year: e.target.value }, 'POST');

            if (res != undefined) {
                for (let i = 0; i < res['data'][0].length; i++) {
                    res['data'][0][i]['row_id'] = i;
                }
                console.log(res['data'][0]);
                setPlacementTableDetails(res['data'][0]);
                setPlacementDetails(res['data'][1]);
                setDetailsCard(true);
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

    const columns = [
        { field: 'row_id', headerName: 'ID', hide: true },
        { field: 'Student_ID', headerName: 'Student ID', width: 150, editable: false },
        { field: 'Company_name', headerName: 'Company Name', width: 220, editable: false },
        { field: 'Designation', headerName: 'Designation', width: 220, editable: false },
        { field: 'Salary', headerName: 'Salary', width: 180, editable: false }
    ];

    return (
        <MainCard title="Placement Report">
            <TextField
                fullWidth
                // required
                label="Batch Year"
                id="fullWidth"
                helperText="Enter Batch year"
                onInput={(e) => {
                    handleChange(e);
                }}
                // value={batchYear['Passed_out_year']}
                // onChange={(e) => {
                //     setBatchYear({ ...batchYear, Passed_out_year: e.target.value });
                // }}
            />
            <br />
            <br />
            {!detailsCard ? (
                ''
            ) : (
                <>
                    <SubCard>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={3}>
                                        <Typography variant="h4">Total Placed Students: </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={9}>
                                        <Typography variant="h5">
                                            {placementDetails == undefined ? '' : placementDetails['Total_Placed']}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={3}>
                                        <Typography variant="h4">Male: </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={9}>
                                        <Typography variant="h5">
                                            {placementDetails == undefined ? '' : placementDetails['Male']}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={3}>
                                        <Typography variant="h4">Female: </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={9}>
                                        <Typography variant="h5">
                                            {placementDetails == undefined ? '' : placementDetails['Female']}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={3}>
                                        <Typography variant="h4">Average Salary: </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={9}>
                                        <Typography variant="h5">
                                            {placementDetails == undefined ? '' : placementDetails['Average_Salary']}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={3}>
                                        <Typography variant="h4">Median Salary: </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={9}>
                                        <Typography variant="h5">
                                            {placementDetails == undefined ? '' : placementDetails['Median_Salary']}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={3}>
                                        <Typography variant="h4">Maximum Salary: </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={9}>
                                        <Typography variant="h5">
                                            {placementDetails == undefined ? '' : placementDetails['Max_Salary']}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} md={3}>
                                        <Typography variant="h4">Minimum Salary: </Typography>
                                    </Grid>
                                    <Grid item xs={6} md={9}>
                                        <Typography variant="h5">
                                            {placementDetails == undefined
                                                ? ''
                                                : placementDetails['Min_Salary'] == 100000000
                                                ? '0'
                                                : placementDetails['Min_Salary']}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                    <br />
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            checkboxSelection
                            rows={placementTableDetails}
                            columns={columns}
                            components={{
                                Toolbar: CustomToolbar
                            }}
                        />
                    </div>
                </>
            )}
        </MainCard>
    );
}

export default GetPlacementReport;
