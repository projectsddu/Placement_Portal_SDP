import React, { useState } from 'react';
import { Paper, Typography, Box, Grid, Button, ListItem, List } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import MainCard from './../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';
import { color } from '@material-ui/system';
import { ClassNames } from '@emotion/react';
import { TextField } from '@material-ui/core';
import $, { param } from 'jquery';
import usePost from '../../Utilities/UsePost';
import ParseDate from '../../Utilities/ParseDate';
import HandleToast from '../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import useFetch from '../../Utilities/useFetch';
import { useHistory } from 'react-router-dom';
import SearchSection from '../../layout/MainLayout/Header/SearchSection';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import {IconEye} from '@tabler/icons';

const useStyles = makeStyles((theme) => ({
    applyBtn: {
        background: theme.palette.success.light,
        color: theme.palette.success.dark,
        '&:hover': {
            background: theme.palette.success.main,
            color: theme.palette.background.paper
        }
    },
    crd: {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    },
    description: {
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    },
    lightBlue: {
        marginTop: 12,
        background: theme.palette.primary.light,
        color: theme.palette.grey[700]
    }
}));

const WhiteTextTypography = withStyles({
    root: {
        color: '#FFFFFF'
    }
})(Typography);
const LightBlueTextTypography = withStyles({
    root: {
        color: '##e3f2fd'
    }
});

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function ViewAnnoucements() {
    const classes = useStyles();

    const [search, setSearch] = useState('');
    const { required_data, loading } = useFetch('/annoucement/getAllAnnoucements/', 'GET');

    var annoucements = [];
    if (!loading) {
        // console.log(required_data);
        if (required_data['data'] != 'No Announcement data!') {
            for (let i = 0; i < required_data['data'].length; i++) {
                var obj = {};
                obj = required_data['data'][i];
                obj["id"] = i;
                // console.log(required_data['data'][i])
                let title=
                    required_data['data'][i]["Company_details"]['Company_name'] +
                    '-' +
                    required_data['data'][i]["Job_Role"] +
                    ' for ' +
                    ParseDate.getYear(required_data['data'][i]["Passed_out_year"]) +
                    ' Batch'
                obj["title"] = title
                console.log(title)
                annoucements.push(obj);
            }
            console.log(annoucements);
        }
    }
    // if (!loading) {
    //     // console.log(required_data["data"])
    //     if(required_data["data"] != "No Announcement data!")
    //     {
    //         annoucements = required_data['data'];
    //     }
    //     console.log(annoucements);
    // }

    let history = useHistory();

    function handleRedirect(id) {
        history.push('/announcement/view_annoucement/' + id);
    }

    function handleSearch(e) {
        console.log(e.target.value);
        setSearch(e.target.value);
        let searchText = e.target.value == '' ? ' ' : e.ta1qrget.value;
        var root = document.getElementsByClassName('MuiGrid-root MuiGrid-container')[0].children;
        console.log(root);
        for (let i = 0; i < root.length; i++) {
            var elem = document.getElementById(root[i].id);
            var elemText = elem.innerText.toLowerCase();
            if (!elemText.includes(searchText.toLowerCase())) {
                $(elem).hide();
            } else {
                $(elem).show();
            }
        }
    }

    
    let Announcement_ID = "";
    const rows = [];
    const [columns, setcolumns] = useState([
        {
            field: 'view',
            headerName: 'View Full Announcement',
            sortable: false,
            width: 250,
            disableClickEventBubbling: true,
            valueGetter: (params) => {
                Announcement_ID = params.row.Announcement_ID
            },
            renderCell: (id) => {
                return (
                    <Button 
                        variant="contained" 
                        onClick={() => handleRedirect(Announcement_ID)} color="primary" 
                        startIcon={<IconEye />}
                    >
                    View Full Announcement
                    </Button>
                );
            }
        },
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'title', headerName: 'Title', width: 300, editable: false },
        { field: 'Date_of_Visit', headerName: 'Date of Visit', width: 250, editable: false },
        { field: 'Registration_Deadline', headerName: 'Registration Deadline', width: 250, editable: false },
        { field: 'Salary', headerName: 'Salary', width: 200, editable: false, hide: false },
        { field: 'Announcement_ID', headerName: 'Announcement ID', width: 200, editable: false, hide: true },
        { field: 'Company_ID', headerName: 'Company ID', width: 200, editable: false, hide: true },
        { field: 'Date_of_announcement', headerName: 'Date of announcement', width: 200, editable: false, hide: true },
        { field: 'Eligible_Branches', headerName: 'Eligible Branches', width: 200, editable: false, hide: true },
        { field: 'Passed_out_year', headerName: 'Passed out year', width: 200, editable: false, hide: true },
        { field: 'Job_Role', headerName: 'Job Role', width: 200, editable: false, hide: true },
        { field: 'Job_Location', headerName: 'Job Location', width: 200, editable: false, hide: true },
        { field: 'Bond_Details', headerName: 'Bond Details', width: 200, editable: false, hide: true },
        { field: 'Other_Details', headerName: 'Other Details', width: 200, editable: false, hide: true },
        { field: 'Eligibility', headerName: 'Eligibility', width: 200, editable: false, hide: true },
        { field: 'IsOpen', headerName: 'IsOpen', width: 200, editable: false, hide: true }
    ]);

    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowsModelChange = React.useCallback((model) => {
        console.log(model);
        setEditRowsModel(model);
    }, []);

    function handleCellClick(params) {
        console.log(params);
    }

    return (
        <>
            <MainCard title="View Announcements">
                <TextField label="Search" value={search} onChange={(e) => handleSearch(e)} fullWidth></TextField>
                <br />
                <br />
                <br />
                <div style={{ height: 400, width: '100%' }}>
                    { loading ? "" : annoucements.length == 0 ? <h1>No Announcements Data</h1> : 
                    (
                        <DataGrid
                            editMode="row"
                            onEditCellChange={handleEditRowsModelChange}
                            onCellClick={handleCellClick}
                            checkboxSelection
                            rows={annoucements}
                            columns={columns}
                            components={{
                                Toolbar: CustomToolbar
                            }}
                            editRowsModel={editRowsModel}
                            onEditRowsModelChange={handleEditRowsModelChange}
                        />
                    )}
                </div>
            </MainCard>
        </>
    );
}

export default ViewAnnoucements;
