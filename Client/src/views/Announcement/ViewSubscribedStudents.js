import React from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { DataGrid, RowsProp, ColDef, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone } from '@tabler/icons';
import useFetch from '../../Utilities/useFetch';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function ViewSubscribedStudents() {
    const location = useLocation().pathname;
    const id = location.split('/')[3];

    const { required_data, loading } = useFetch('/subscribeannouncement/getSubscribedStudentsOfAnnouncement/' + id, 'GET');

    let students_list = [];
    if (!loading) {
        // console.log(required_data["data"]);

        for (let i = 0; i < required_data['data'].length; i++) {
            var obj = {};
            obj = required_data['data'][i];
            // console.log(obj)
            students_list.push(obj);
        }
        console.log(students_list);
    }

    const icons = {
        IconDashboard: IconDashboard,
        IconDeviceAnalytics,
        IconSpeakerphone
    };
    const rows = [];

    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Student_ID', headerName: 'Student_ID', width: 200, editable: false },
        { field: 'FirstName', headerName: 'First Name', width: 200, editable: false },
        { field: 'MiddleName', headerName: 'Middle Name', width: 200, editable: false },
        { field: 'LastName', headerName: 'Last Name', width: 200, editable: false },
        { field: 'Sem_1_SPI', headerName: 'Sem 1 SPI', type: 'number', width: 200, editable: false },
        { field: 'Sem_2_SPI', headerName: 'Sem 2 SPI', type: 'number', width: 200, editable: false },
        { field: 'Sem_3_SPI', headerName: 'Sem 3 SPI', type: 'number', width: 200, editable: false },
        { field: 'Sem_4_SPI', headerName: 'Sem 4 SPI', type: 'number', width: 200, editable: false },
        { field: 'Sem_5_SPI', headerName: 'Sem 5 SPI', type: 'number', width: 200, editable: false },
        { field: 'Sem_6_SPI', headerName: 'Sem 6 SPI', type: 'number', width: 200, editable: false },
        { field: 'Sem_7_SPI', headerName: 'Sem 7 SPI', type: 'number', width: 200, editable: false },
        { field: 'Sem_8_SPI', headerName: 'Sem 8 SPI', type: 'number', width: 200, editable: false }
    ];
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    return (
        <>
            <MainCard title="Subscribed Students">
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                >
                    Download All CVs
                </Button>
                <br/><br/>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        checkboxSelection
                        rows={students_list}
                        columns={columns}
                        components={{
                            Toolbar: CustomToolbar
                        }}
                    />
                </div>
            </MainCard>
        </>
    );
}

export default ViewSubscribedStudents;
