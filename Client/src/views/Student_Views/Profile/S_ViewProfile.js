import React from 'react'
import { Button } from '@material-ui/core';
// assets
import {
    Avatar,

    Card,
    CardContent,
    Chip,
    Divider,
    Grid,

    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,

} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons';
import MainCard from '../../../ui-component/cards/MainCard'
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material'
import useFetch from '../../../Utilities/useFetch';
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { IconInfoCircle } from "@tabler/icons"
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ParseDate from '../../../Utilities/ParseDate';
// import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchSection from '../../../layout/MainLayout/Header/SearchSection';
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router-dom";
import UsePost from '../../../Utilities/UsePost'
import HandleToast from '../../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import AddComment from '../Comment/S_AddComment';
// import Fetch
import ProfilePhoto from './S_ProfilePhoto'

export default function S_ViewProfile() {
    const useStyles = makeStyles((theme) => ({
        navContainer: {
            width: '100%',
            maxWidth: '330px',
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: '10px',
            [theme.breakpoints.down('sm')]: {
                maxWidth: '300px'
            }
        },
        listAction: {
            top: '22px'
        },
        actionColor: {
            color: theme.palette.grey[500]
        },

        listItem: {
            padding: 0
        },
        sendIcon: {
            marginLeft: '8px',
            marginTop: '-3px'
        },
        listDivider: {
            marginTop: 0,
            marginBottom: 0
        },
        listChipError: {
            color: theme.palette.orange.dark,
            backgroundColor: theme.palette.orange.light,
            height: '24px',
            padding: '0 6px',
            marginRight: '5px'
        },
        listChipWarning: {
            color: theme.palette.warning.dark,
            backgroundColor: theme.palette.warning.light,
            height: '24px',
            padding: '0 6px'
        },
        listChipSuccess: {
            color: theme.palette.success.dark,
            backgroundColor: theme.palette.success.light,
            height: '24px',
            padding: '0 6px'
        },
        listAvatarSuccess: {
            color: theme.palette.success.dark,
            backgroundColor: theme.palette.success.light,
            border: 'none',
            borderColor: theme.palette.success.main
        },
        listAvatarPrimary: {
            color: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.light,
            border: 'none',
            borderColor: theme.palette.primary.main
        },
        listContainer: {
            paddingLeft: '56px'
        },
        uploadCard: {
            backgroundColor: theme.palette.secondary.light
        },
        paddingBottom: {
            paddingBottom: '16px'
        },
        itemAction: {
            cursor: 'pointer',
            padding: '16px',
            '&:hover': {
                background: theme.palette.primary.light
            }
        }
    }));
    const classes = useStyles();

    function createData(key, value) {
        if (value == undefined) {
            value = "Not Defined!"
        }
        return { key, value };
    }

    let history = useHistory();

    const { required_data, loading } = useFetch("/student/getOneStudent/", 'GET' )

    let student_details, rows;
    if (!loading) {

        student_details = required_data["data"];
        // console.log(student_details)
        rows = [
            createData("Student ID", student_details["Student_ID"]),
            createData("FirstName", student_details["FirstName"]),
            createData("MiddleName", student_details["MiddleName"]),
            createData("LastName", student_details["LastName"]),
            createData("Admission type", student_details["Admission_type"]),
            createData("Cast category", student_details["Cast_category"]),
            createData("Gender", student_details["Gender"]),
            createData("DOB", student_details["DOB"]),
            createData("SSC Percentage", student_details["SSC_Percentage"]),
            createData("SSC Percentile", student_details["SSC_Percentile"]),
            createData("SSC Board", student_details["SSC_Board"]),
            createData("SSC School", student_details["SSC_School"]),
            createData("HSC Percentage", student_details["HSC_Percentage"]),
            createData("HSC Percentile", student_details["HSC_Percentile"]),
            createData("HSC Board", student_details["HSC_Board"]),
            createData("HSC School", student_details["HSC_School"]),
            createData("IsD2D", student_details["IsD2D"]),
            createData("Diploma Result CPI", student_details["Diploma_Result_CPI"]),
            createData("Diploma Result Percentage", student_details["Diploma_Result_Percentage"]),
            createData("Diploma College Name", student_details["Diploma_College_Name"]),
            createData("Diploma University", student_details["Diploma_University"]),
            createData("Sem 1 SPI", student_details["Sem_1_SPI"]),
            createData("Sem 2 SPI", student_details["Sem_2_SPI"]),
            createData("Sem 3 SPI", student_details["Sem_3_SPI"]),
            createData("Sem 4 SPI", student_details["Sem_4_SPI"]),
            createData("Sem 5 SPI", student_details["Sem_5_SPI"]),
            createData("Sem 6 SPI", student_details["Sem_6_SPI"]),
            createData("Sem 7 SPI", student_details["Sem_7_SPI"]),
            createData("Sem 8 SPI", student_details["Sem_8_SPI"]),
            createData("Current CPI", student_details["Current_CPI"]),
            createData("Enrollment year", student_details["Enrollment_year"]),
            createData("Passed out year", student_details["Passed_out_year"]),
            createData("Email ID", student_details["Email_ID"]),
            createData("Contact No 1", student_details["Contact_No_1"]),
            createData("Contact No 2", student_details["Contact_No_2"]),
            createData("Address", student_details["Address"]),
            createData("City", student_details["City"]),
            createData("Pin Code", student_details["Pin_Code"]),
            createData("Current semester", student_details["Current_semester"]),
            createData("Career Preference", student_details["Career_Preference"]),
            createData("CV Upload", student_details["CV_Upload"]),
            createData("Student Photo", student_details["Student_Photo"]),
            createData("Branch Id", student_details["Branch_Id"])
        ];
    }


    return (
        <>
            <MainCard title="Student Details">
                {loading ? (
                    ''
                ) : (
                    <>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <ProfilePhoto />
                                            </TableCell>
                                            <TableCell>
                                                <h1>METADATA</h1>
                                            </TableCell>
                                            <TableCell>
                                                <h1>SKILLS</h1>
                                            </TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br/><br/>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">

                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Typography variant="h5">
                                                    {row.key}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </MainCard>
        </>
    );
}

