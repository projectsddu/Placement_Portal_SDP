import React, { useState, useEffect } from 'react';

import MainCard from '../../ui-component/cards/MainCard';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import { Paper, Typography, Box, Grid, Button, ListItem, List } from '@material-ui/core';
import { IconDashboard, IconCirclePlus, IconDeviceAnalytics, IconSpeakerphone } from '@tabler/icons';
import UseFetch from '../../Utilities/UseFetch';
import SubCard from './../../ui-component/cards/SubCard';
import { useHistory } from 'react-router-dom';
import ChipCard from '../../ui-component/cards/GenericCards/ChipCard';
import EmptyStudent from './JSX/EmptyStudent';
import { TextField } from '@material-ui/core';

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
    const [search, setSearch] = useState('');
    const [student_list_original, setStudent_list_original] = useState([]);
    const [student_list_copy, setStudent_list_copy] = useState([]);

    useEffect(async () => {
        let response = undefined;
        response = await fetch("/student/getAllStudentPasswords", { method: "POST" })

        if (response != undefined) {
            let jsonData = undefined
            jsonData = await response.json()
            if (jsonData != undefined) {
                console.log(jsonData);

                for (let i = 0; i < jsonData["data"].length; i++) {
                    jsonData["data"][i]["id"] = i;
                }

                setStudent_list_original([].concat(jsonData["data"]))
                setStudent_list_copy([].concat(jsonData["data"]))
                // console.log(company_list_original)
            }
        }

    }, []);

    function handleSearch(e) {
        console.log(e.target.value)
        setSearch(e.target.value);

        let temp = [];
        for (let i = 0; i < student_list_original.length; i++) {
            let keys = Object.keys(student_list_original[i])
            // console.log(keys)
            for (let j = 0; j < keys.length; j++) {
                let key = keys[j];
                let value = student_list_original[i][key].toString().toLowerCase();
                if (value.includes(e.target.value.toString().toLowerCase())) {
                    temp.push(student_list_original[i])
                    break;
                }
            }

        }

        setStudent_list_copy(temp);

    }




    const [columns, setcolumns] = useState([


        { field: 'id', headerName: 'ID', hide: true },
        { field: 'StudentId', headerName: 'Student ID', width: 200, editable: true },
        { field: 'FirstTimePassword', headerName: 'First Time Passwords', width: 300, editable: true },


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
        <MainCard title="Student First Time Passwords">
            <TextField label="Search" value={search} onInput={(e) => handleSearch(e)} fullWidth></TextField>
            <br />
            <br />
            <br />

            <div style={{ height: 400, width: '100%' }}>
                {student_list_original.length == 0 ? (
                    <>
                        <ChipCard loading={false} data={<EmptyStudent />} />
                    </>
                ) : (
                    <DataGrid
                        editMode="row"
                        onEditCellChange={handleEditRowsModelChange}
                        onCellClick={handleCellClick}
                        checkboxSelection
                        rows={student_list_copy}
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
