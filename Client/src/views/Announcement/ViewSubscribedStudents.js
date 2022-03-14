import React from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone } from '@tabler/icons';
import { useHistory } from 'react-router';
import UseFetch from '../../Utilities/UseFetch';
import { useLocation } from 'react-router-dom';
// import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@material-ui/core';
import axios from 'axios';


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

    const { required_data, loading } = UseFetch('/subscribeannouncement/getSubscribedStudentsOfAnnouncement/' + id, 'GET');

    let students_list = [];
    if (!loading) {
        // console.log(required_data["data"]);

        for (let i = 0; i < required_data['data'].length; i++) {
            var obj = {};
            obj = required_data['data'][i];
            // console.log(obj)
            students_list.push(obj);
        }









        // <a
        //     target="_blank"
        //     style={{ "text-decoration": "none" }}
        //     href={

        //         process.env.NODE_ENV == "production" ?
        //             process.env.React_App_DOMAIN + "/subscribeannouncement/downloadSubscribedStudentZip/" + announcement_details["Announcement_ID"] : "http://localhost:8000" + "/subscribeannouncement/downloadSubscribedStudentZip/" + announcement_details["Announcement_ID"]


        //     }>



        // sort the array based on CPI of the student
        students_list.sort(function (a, b) {
            console.log(a.Current_CPI + " " + b.Current_CPI)
            return b.Current_CPI - a.Current_CPI
        });

        // console.log(students_list);
    }

    const icons = {
        IconDashboard: IconDashboard,
        IconDeviceAnalytics,
        IconSpeakerphone
    };
    const rows = [];

    const columns = [
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
        // { field: 'id', headerName: 'ID', hide: true },
        // { field: 'Student_ID', headerName: 'Student_ID', width: 200, editable: false },
        // { field: 'FirstName', headerName: 'First Name', width: 200, editable: false },
        // { field: 'MiddleName', headerName: 'Middle Name', width: 200, editable: false },
        // { field: 'LastName', headerName: 'Last Name', width: 200, editable: false },
        // { field: 'Sem_1_SPI', headerName: 'Sem 1 SPI', type: 'number', width: 200, editable: false },
        // { field: 'Sem_2_SPI', headerName: 'Sem 2 SPI', type: 'number', width: 200, editable: false },
        // { field: 'Sem_3_SPI', headerName: 'Sem 3 SPI', type: 'number', width: 200, editable: false },
        // { field: 'Sem_4_SPI', headerName: 'Sem 4 SPI', type: 'number', width: 200, editable: false },
        // { field: 'Sem_5_SPI', headerName: 'Sem 5 SPI', type: 'number', width: 200, editable: false },
        // { field: 'Sem_6_SPI', headerName: 'Sem 6 SPI', type: 'number', width: 200, editable: false },
        // { field: 'Sem_7_SPI', headerName: 'Sem 7 SPI', type: 'number', width: 200, editable: false },
        // { field: 'Sem_8_SPI', headerName: 'Sem 8 SPI', type: 'number', width: 200, editable: false }
    ];
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);
    const [folderData, setfolderData] = React.useState(undefined)
    const [folderLink, setfolderLink] = React.useState(undefined)

    const history = useHistory();
    // const id = history.location.pathname.split("/")
    console.log(id)


    async function handleClick() {
        console.log("Here")
        const link = '/subscribeannouncement/downloadSubscribedStudentZip/' + id
        setfolderData(true)
        const resp = await axios.get(link)
        const driveLink = resp.data.data
        setfolderData(false)
        const win = window.open(driveLink, "_blank");
    }

    return (
        <>
            <MainCard title="Applied Students">

                <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                        <a
                            target="self"
                            style={{ "text-decoration": "none" }}
                            href={

                                process.env.NODE_ENV == "production" ?
                                    "http://csiddu.tech" + "/subscribeannouncement/downloadSubscribedStudentZip/" + id : "http://localhost:8000" + "/subscribeannouncement/downloadSubscribedStudentZip/" + id


                            }>
                            <Button variant="contained" onClick={() => handleClick()} size="large" color="primary">
                                See All CV's
                            </Button>
                        </a>
                    </Grid>
                    {folderData === undefined ?
                        "" :
                        folderData == true ?
                            <Grid item xs={12} md={2}>
                                <CircularProgress />
                            </Grid> : ""
                    }
                </Grid>
                {/* // </a> */}
                <br />
                <br />
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
            </MainCard >
        </>
    );
}

export default ViewSubscribedStudents;
