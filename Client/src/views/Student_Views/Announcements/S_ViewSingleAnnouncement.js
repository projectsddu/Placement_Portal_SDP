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

export default function S_ViewSingleAnnouncement() {
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


    const location = useLocation().pathname;
    const id = location.split("/")[4]

    const { required_data, loading } = useFetch("/annoucement/getAnnoucement/" + id, "GET")

    let announcement_details = undefined, rows;
    if (!loading) {

        announcement_details = required_data["data"][0];
        console.log(announcement_details)
        rows = [
            // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData("Date of Announcement", ParseDate.ParseDate(announcement_details["Date_of_announcement"])),
            createData("Date of Visit", ParseDate.ParseDate(announcement_details["Date_of_Visit"])),
            createData("Registration Deadline", ParseDate.ParseDate(announcement_details["Registration_Deadline"], true)),
            createData("Eligible Branches", announcement_details["Eligible_Branches"]),
            createData("Passed out year", ParseDate.getYear(announcement_details["Passed_out_year"])),
            createData("Job Role", announcement_details["Job_Role"]),
            createData("Salary", announcement_details["Salary"]),
            createData("Job Location", announcement_details["Job_Location"]),
            createData("Bond Details", announcement_details["Bond_Details"]),
            createData("Other Details", announcement_details["Other_Details"]),

            createData("Eligibility", announcement_details["Eligibility"]),
        ];
    }

    // const name = new URLSearchParams(search).get('id');

    const [commentData, setcommentData] = useState({
        Comment_text: ''
    })
    useEffect(() => { }, [commentData]);
    
    
    const [subscribeStatus, setsubscribeStatus] = useState(undefined);
    
    // const subscribedata = fetch("/subscribeannouncement/getSubscribedStatus/" + id, "GET")
    
    
    useEffect( async () => {
        
        const subscribedata = await fetch("/subscribeannouncement/getSubscribedStatus/" + id, { method: "GET" });

        let data1 = await subscribedata.json();
        data1 = data1["status"]
        console.log(data1)

        if(data1) {
            setsubscribeStatus(true)
        }
        else {
            setsubscribeStatus(false)
        }

     }, []);


    // if (!subscribedata["loading"]) {
    //     setsubscribeStatus(subscribedata["required_data"]["status"])
    // }


    async function handleSubscribe() {
        const res = await UsePost("/subscribeannouncement/subscribe/" + id, {}, "POST")
        setsubscribeStatus(true)
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: false,
            }
        }
        console.log(res);
        responsePipelineHandler(params1, 1)
    }

    async function handleUnsubscribe() {
        const res = await UsePost("/subscribeannouncement/unsubscribe/" + id, {}, "POST")
        setsubscribeStatus(false)
        const params1 = {
            data: res,
            HandleToast: {
                toast: toast,
                flag: true,
                customMessage: "Unsubscribed successfully!!!"
            }
        }
        console.log(res);
        responsePipelineHandler(params1, 1)
    }

    return (
        <>
            <MainCard title={loading ? "Announcement" : announcement_details["Company_Details"]["Company_name"] + " - " + announcement_details["Job_Role"] + " For " + new Date(announcement_details["Passed_out_year"]).getFullYear() + " Batch"}>
                <Grid
                    justify="space-between"
                >
                    <Grid item>
                        {subscribeStatus === undefined ? "Loading" : subscribeStatus == true ? <>
                            <Button onClick={handleUnsubscribe} variant="contained" color="error"> Unsubsribe Announcement</Button>
                        </> : 
                            <>
                            <Button onClick={handleSubscribe} variant="contained" color="success"> Subsribe Announcement</Button>
                            </>
                        }
                        <Tooltip title="Keep recieving constant updates" style={{ "margin-left": "10px" }}>
                            <IconButton>
                                <IconInfoCircle />
                            </IconButton>
                        </Tooltip>
                        <br />
                        <br />
                    </Grid>

                </Grid>



                {loading ? (
                    ''
                ) : (
                    <>



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
                                    <TableRow
                                        key="Job_Description_File"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography variant="h5">
                                                Job description file
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {announcement_details === undefined ? "Wait Loading...." : <>
                                                <a target='blank'
                                                    style={{ "text-decoration": "none", "cursor": "pointer" }}
                                                    href={
                                                        "http://localhost:8000" + announcement_details["Job_Description_File"].split(".")[1] + "." + announcement_details["Job_Description_File"].split(".")[2]}>

                                                    {announcement_details === undefined ? "Wait Loading...." : <>
                                                        <Chip label={"View Job Description File"} />

                                                    </>
                                                    }

                                                </a>
                                            </>}


                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}

            </MainCard>
            <br />
            {announcement_details === undefined ? "" : <AddComment id={id} />}
        </>
    );
}
