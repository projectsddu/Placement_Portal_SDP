import React, { useState } from 'react';
import {
    useGridApiRef,
    DataGridPro,
    // GridToolbarContainer,
    GridActionsCellItem
} from '@mui/x-data-grid-pro';
import MainCard from '../../ui-component/cards/MainCard';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import { Paper, Typography, Box, Grid, Button, ListItem, List } from '@material-ui/core';
import { IconDashboard, IconCirclePlus, IconDeviceAnalytics, IconSpeakerphone } from '@tabler/icons';
import useFetch from '../../Utilities/useFetch';
import SubCard from './../../ui-component/cards/SubCard';
import { useHistory } from 'react-router-dom';
import ChipCard from '../../ui-component/cards/GenericCards/ChipCard';
import EmptyStudent from './JSX/EmptyStudent';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
export default function ViewStudent() {
    const icons = {
        IconDashboard: IconDashboard,
        IconDeviceAnalytics,
        IconSpeakerphone
    };

    const history = useHistory();

    const { required_data, loading } = useFetch('/student/getAllStudents', 'GET');

    let students_list = [];
    function handleClick(idx) {
        console.log(idx);
    }
    if (!loading) {
        // console.log(required_data);
        if (required_data['data'] != 'No Student data!') {
            for (let i = 0; i < required_data['data'].length; i++) {
                var obj = {};
                obj = required_data['data'][i];
                // console.log(obj)
                students_list.push(obj);
            }
            console.log(students_list);
        }
    }

    const rows = [];
    const [columns, setcolumns] = useState([
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            width: 130,
            disableClickEventBubbling: true,
            renderCell: (id) => {
                return (
                    <Button variant="contained" onClick={() => handleClick(id.id)} color="primary" startIcon={<EditIcon />}>
                        Edit
                    </Button>
                );
            }
        },

        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Student_ID', headerName: 'Student_ID', width: 200, editable: true },
        { field: 'FirstName', headerName: 'First Name', width: 200, editable: false },
        { field: 'MiddleName', headerName: 'Middle Name', width: 200, editable: false },
        { field: 'LastName', headerName: 'Last Name', width: 200, editable: false },
        { field: 'SSC_Percentage', headerName: 'SSC Percentage', width: 200, editable: false },
        { field: 'HSC_Percentage', headerName: 'HSC Percentage', width: 200, editable: false },
        { field: 'Current_CPI', headerName: 'Current CPI', width: 200, editable: false },
        { field: 'Email_ID', headerName: 'Email ID', width: 200, editable: false },
        { field: 'Contact_No_1', headerName: 'Contact No 1', width: 200, editable: false },
        { field: 'Contact_No_2', headerName: 'Contact No 2', width: 200, editable: false }

        // { field: 'Sem_5_SPI', headerName: 'Sem 5 SPI', type: 'number', width: 200, editable: false },
        // { field: 'Sem_6_SPI', headerName: 'Sem 6 SPI', type: 'number', width: 200, editable: false },
        // { field: 'Sem_7_SPI', headerName: 'Sem 7 SPI', type: 'number', width: 200, editable: false }
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
        <MainCard title="View Student">
            {/* <code>Editing: {JSON.stringify(editRowsModel)}</code> */}
            <div style={{ height: 400, width: '100%' }}>
                {students_list.length == 0 ? (
                    <>
                        <ChipCard loading={loading} data={<EmptyStudent />} />
                    </>
                ) : (
                    // <SubCard>
                    //     <Grid container spacing={2}>
                    //         <Grid item xs={12} md={10}>
                    //             <Typography variant="h1">No Stduent is added yet!!!</Typography>
                    //         </Grid>
                    //         <Grid item xs={12} md={2}>
                    //             <Button
                    //                 variant="contained"
                    //                 size="large"
                    //                 startIcon={<IconCirclePlus />}
                    //                 color="primary"
                    //                 onClick={() => {
                    //                     history.push('/student/add_student');
                    //                 }}
                    //             >
                    //                 {' '}
                    //                 Add{' '}
                    //             </Button>
                    //         </Grid>
                    //     </Grid>
                    // </SubCard>
                    <DataGrid
                        editMode="row"
                        onEditCellChange={handleEditRowsModelChange}
                        onCellClick={handleCellClick}
                        checkboxSelection
                        rows={students_list}
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
    );
}
