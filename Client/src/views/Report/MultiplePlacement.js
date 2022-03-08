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
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import React, { useState, useEffect } from 'react';
import {
    useGridApiRef,
    DataGridPro,
    // GridToolbarContainer,
    GridActionsCellItem
} from '@mui/x-data-grid-pro';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IconDashboard, IconEye, IconCirclePlus, IconDeviceAnalytics, IconSpeakerphone } from '@tabler/icons';
import SubCard from './../../ui-component/cards/SubCard';
import { useHistory } from 'react-router-dom';
import ChipCard from '../../ui-component/cards/GenericCards/ChipCard';
// import EmptyStudent from './JSX/EmptyStudent';
import { getYear, ParseDate } from '../../Utilities/ParseDate';


export default function MultiplePlacement() {

    // const [data, setData] = useState({
    // });
    // useEffect(() => { }, [data]);


    async function handleSubmit() {

        // const res = await UsePostFile("/student/addStudent", data, "POST")
        const params1 = {
            // data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        // console.log(res);
        responsePipelineHandler(params1, 1)
        // END OF POSTING DATA EXAMPLE
    }

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }
    const icons = {
        IconDashboard: IconDashboard,
        IconDeviceAnalytics,
        IconSpeakerphone
    };

    const history = useHistory();
    const [search, setSearch] = useState('');
    const [student_list_original, setStudent_list_original] = useState([]);
    const [student_list_copy, setStudent_list_copy] = useState([]);

    // useEffect(async () => {
    //     let response = undefined;
    //     response = await fetch("/student/getAllStudents", { method: "GET" })

    //     if (response != undefined) {
    //         let jsonData = undefined
    //         jsonData = await response.json()
    //         if (jsonData != undefined) {
    //             console.log(jsonData);

    //             for (let i = 0; i < jsonData["data"].length; i++) {
    //                 jsonData["data"][i]["id"] = i;
    //                 jsonData["data"][i]["DOB"] = ParseDate(jsonData["data"][i]["DOB"]);
    //                 jsonData["data"][i]["Enrollment_year"] = getYear(jsonData["data"][i]["Enrollment_year"]);
    //                 jsonData["data"][i]["Passed_out_year"] = getYear(jsonData["data"][i]["Passed_out_year"]);
    //             }

    //             setStudent_list_original([].concat(jsonData["data"]))
    //             setStudent_list_copy([].concat(jsonData["data"]))
    //             // console.log(company_list_original)
    //         }
    //     }

    // }, []);

    // function handleSearch(e) {
    //     console.log(e.target.value)
    //     setSearch(e.target.value);

    //     let temp = [];
    //     for (let i = 0; i < student_list_original.length; i++) {
    //         let keys = Object.keys(student_list_original[i])
    //         // console.log(keys)
    //         for (let j = 0; j < keys.length; j++) {
    //             let key = keys[j];
    //             // console.log(company_list_original[i])
    //             // console.log(key)
    //             let value = student_list_original[i][key].toString().toLowerCase();
    //             if (value.includes(e.target.value.toString().toLowerCase())) {
    //                 temp.push(student_list_original[i])
    //                 break;
    //             }
    //         }

    //     }

    //     setStudent_list_copy(temp);

    // }

    // const { required_data, loading } = UseFetch('/student/getAllStudents', 'GET');

    // let students_list = [];

    function handleClick(idx) {
        console.log(idx);
    }

    // if (!loading) {
    //     // console.log(required_data);
    //     if (required_data['data'] != 'No Student data!') {
    //         for (let i = 0; i < required_data['data'].length; i++) {
    //             var obj = {};
    //             obj = required_data['data'][i];
    //             // console.log(obj)
    //             students_list.push(obj);
    //         }
    //         console.log(students_list);
    //     }
    // }

    let temp_id = "";

    const rows = [];
    const [columns, setcolumns] = useState([
        // {
        //     field: 'edit',
        //     headerName: 'Edit',
        //     sortable: false,
        //     width: 130,
        //     disableClickEventBubbling: true,
        //     renderCell: (id) => {
        //         return (
        //             <Button variant="contained" 
        //             // onClick={() => handleClick(id.id)} 
        //             onClick={() => {
        //                 history.push('/student/edit_student/' + id.Student_ID);
        //             }}
        //             color="primary" 
        //             startIcon={<EditIcon />}>
        //                 Edit
        //             </Button>
        //         );
        //     }
        // },
        // {
        //     field: 'edit',
        //     headerName: 'Edit & View',
        //     sortable: false,
        //     width: 130,
        //     disableClickEventBubbling: true,
        //     valueGetter: (params) => {
        //         temp_id = params.row.Student_ID;
        //     },
        //     renderCell: (id) => {
        //         return (
        //             <>
        //             {/* <Button
        //                 variant="contained"
        //                 // style={{'padding' : "0px", "width" : "50%"}}
        //                 onClick={() => {
        //                     history.push('/student/edit_student/' + temp_id);
        //                 }}
        //                 color="primary"
        //                 startIcon={<EditIcon />}
        //             >
        //             </Button> */}
        //                 <IconButton color="primary" 
        //                 onClick={() => {
        //                     history.push('/student/edit_student/' + temp_id);
        //                 }}
        //                 aria-label="upload picture" component="span">
        //                     <EditIcon />
        //                 </IconButton>
        //                 <IconButton color="primary"
        //                 onClick={() => {
        //                     history.push('/student/view_student_profile/' + temp_id);
        //                 }}
        //                 aria-label="upload picture" component="span">
        //                     <VisibilityIcon />
        //                 </IconButton>
        //             </>
        //         );
        //     }
        // },

        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Student_ID', headerName: 'Student ID', width: 150, editable: true },
        { field: 'Name', headerName: 'Name', width: 155, editable: false },
        { field: 'Companies', headerName: 'Companies', width: 168, editable: false },



    ]);

    // const [editRowsModel, setEditRowsModel] = React.useState({});

    // const handleEditRowsModelChange = React.useCallback((model) => {
    //     console.log(model);
    //     setEditRowsModel(model);
    // }, []);

    // function handleCellClick(params) {
    //     console.log(params);
    // }

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
            <Typography
                variant="h1"
                color="primary"
            >
                Total students who got multiple placements: 100
            </Typography>
            <br />
            <br />
            <TextField
                label="Search"
                value={search}
                // onInput={(e) => handleSearch(e)}
                fullWidth
            >
            </TextField>
            <br />
            <br />
            <br />
            {/* <code>Editing: {JSON.stringify(editRowsModel)}</code> */}
            <div style={{ height: 400, width: '100%' }}>
                {/* {student_list_original.length == 0 ? (
                    <>
                        <ChipCard loading={false} data={<EmptyStudent />} />
                    </>
                ) : ( */}
                    <DataGrid
                        editMode="row"
                        // onEditCellChange={handleEditRowsModelChange}
                        // onCellClick={handleCellClick}
                        checkboxSelection
                        rows={student_list_copy}
                        columns={columns}
                        components={{
                            Toolbar: CustomToolbar
                        }}
                    // editRowsModel={editRowsModel}
                    // onEditRowsModelChange={handleEditRowsModelChange}
                    />
                )
                {/* } */}
            </div>

        </MainCard>
    )
}
