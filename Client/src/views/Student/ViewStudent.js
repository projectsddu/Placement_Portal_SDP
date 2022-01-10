import React, { useState } from 'react'
import MainCard from '../../ui-component/cards/MainCard'
import {
    DataGrid, RowsProp, ColDef, GridToolbarContainer,
    GridToolbarExport
} from "@material-ui/data-grid";
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone } from '@tabler/icons';
import useFetch from '../../Utilities/useFetch';

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

    const { required_data, loading } = useFetch("/student/getAllStudents", "GET")

    let students_list = [];
    if(!loading)
    {
        // console.log(required_data);
        for(let i = 0; i < required_data["data"].length; i++)
        {
            var obj = {};
            obj = required_data["data"][i];
            // console.log(obj)
            students_list.push(obj);
        }
        console.log(students_list);
    }

    const rows = [
        // { id: 1, Student_ID: "19CEUON133", FirstName: "Jenil", MiddleName: "J", LastName: "Gandhi", Sem_5_SPI: "8.89", Sem_6_SPI: "8.89", Sem_7_SPI: "8.89", CV: icons['IconSpeakerphone'] },
        // { id: 2, Student_ID: "19CEUON103", FirstName: "Rikin", MiddleName: "D", LastName: "Chauhan", Sem_5_SPI: "9.0", Sem_6_SPI: "9.0", Sem_7_SPI: "9.0", CV: icons['IconSpeakerphone'] },
        // { id: 3, Student_ID: "19CEUON123", FirstName: "Keval", MiddleName: "D", LastName: "Gandevia", Sem_5_SPI: "9.2", Sem_6_SPI: "9.2", Sem_7_SPI: "9.2", CV: icons['IconSpeakerphone'] },
        // { id: 2, ID: "19CEUEG017", FullName: "Keval D Gandevia", CPI: "9.34", Semester: 6, CV: icons['IconSpeakerphone'] },
        // { id: 3, ID: "19CEUOS102", FullName: "Rikin D Chauhan", CPI: "9.13", Semester: 6, CV: icons['IconSpeakerphone'] },
        // { id: 4, ID: "19CEUON112", FullName: "Harsh Patel", CPI: "7.21", Semester: 5, CV: icons['IconSpeakerphone'] },
        // { id: 5, ID: "19CEUES017", FullName: "Ansh Shah", CPI: "9.11", Semester: 5, CV: icons['IconSpeakerphone'] },


    ];

    const columns = [
        { field: "id", headerName: "ID", hide: true },
        { field: "Student_ID", headerName: "Student_ID", width: 200 },
        { field: "FirstName", headerName: "First Name", width: 200, editable: true },
        { field: "MiddleName", headerName: "Middle Name", width: 200, editable: true },
        { field: "LastName", headerName: "Last Name", width: 200, editable: true },
        { field: "Sem_5_SPI", headerName: "Sem 5 SPI", type: 'number', width: 200, editable: true },
        { field: "Sem_6_SPI", headerName: "Sem 6 SPI", type: 'number', width: 200, editable: true },
        { field: "Sem_7_SPI", headerName: "Sem 7 SPI", type: 'number', width: 200, editable: true },
    ];
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);
    return (
        <MainCard title="View Student">
            {/* <code>Editing: {JSON.stringify(editRowsModel)}</code> */}
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid checkboxSelection rows={students_list} columns={columns} components={{
                    Toolbar: CustomToolbar,
                }}
                />

            </div>
        </MainCard>
    )
}