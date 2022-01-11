import React from 'react'
import { Paper, Typography, Box, Grid, Button, ListItem, List } from "@material-ui/core"
import { useTheme } from '@material-ui/styles';
import MainCard from './../../ui-component/cards/MainCard';
import SubCard from './../../ui-component/cards/SubCard';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';
import { color } from '@material-ui/system';
import { ClassNames } from '@emotion/react';
import usePost from '../../Utilities/UsePost';
import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import useFetch from '../../Utilities/useFetch';
import { useHistory } from "react-router-dom";

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
        color: "#FFFFFF"
    }
})(Typography);
const LightBlueTextTypography = withStyles({
    root: {
        color: "##e3f2fd"
    }
})

function ViewAnnoucements() {
    const classes = useStyles();


    const { required_data, loading } = useFetch("/annoucement/getAllAnnoucements/", "GET")

    var annoucements;

    if (!loading) {
        // console.log(required_data["data"]);

        annoucements = required_data["data"];
        console.log(annoucements);

        // annoucements.map((e) => console.log(e.Announcement_ID))

    }

    let history = useHistory();

    function handleRedirect(id) {
        // console.log(id)
        history.push('/announcement/view_annoucement/' + id)
    }

    return (
        <>
            {/* /**{ (setData(data)).map((e) => {return e})} */}
            <MainCard title="View Annoucements">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>

                    {loading ? "" : annoucements.map((e) => (
                        <Grid item xs={12} md={6}>
                            <SubCard title={e.Announcement_ID}>
                                <Typography variant="h5">Description</Typography>
                                <List dense={true}>
                                    <ListItem>Job Role: {e.Job_Role}</ListItem>
                                    <ListItem>Job Location: {e.Job_Location}</ListItem>
                                    <ListItem>Branches: {e.Eligible_Branches}</ListItem>
                                </List>

                                <Button onClick={() => handleRedirect(e.Announcement_ID)} size='large' fullWidth className={classes.applyBtn}>View Full Annoucement</Button>
                            </SubCard>
                        </Grid>
                    ))}


                    {/* {
                        annoucements.map((e) => (
                            <Grid item xs={12} md={6}>
                                <SubCard title={e.Announcement_ID}>
                                    <Typography variant="h5">Description</Typography>
                                    <List dense={true}>
                                        <ListItem>Job Role: {e.Job_Role}</ListItem>
                                        <ListItem>Job Location: {e.Job_Location}</ListItem>
                                        <ListItem>Branches: {e.Eligible_Branches}</ListItem>
                                    </List>

                                    <Button size='large' fullWidth className={classes.applyBtn}>View Full Annoucement</Button>
                                </SubCard>
                            </Grid>
                        ))
                    } */}
                    {/* <Grid item xs={12} md={6}>
                        <SubCard title="Amazon Recruitment 2022-23">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>CTC : 18Lpa</ListItem>
                                <ListItem>Min CPI : 8.86</ListItem>
                                <ListItem>Branches : CE , IT</ListItem>
                            </List>

                            <Button size='large' fullWidth className={classes.applyBtn}>View Full Annoucement</Button>
                        </SubCard>
                    </Grid> */}
                    {/* <Grid item xs={12} md={6}>
                        <SubCard title="Infosys Recruitment 2022-23">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>CTC : 18Lpa</ListItem>
                                <ListItem>Min CPI : 8.86</ListItem>
                                <ListItem>Branches : CE , IT</ListItem>
                            </List>

                            <Button size='large' fullWidth className={classes.applyBtn}>Apply</Button>
                        </SubCard>
                    </Grid> */}
                    {/* <Grid item xs={12} md={6}>
                        <SubCard title="TCS Recruitment 2022-23">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>CTC : 4Lpa</ListItem>
                                <ListItem>Min CPI : 6.86</ListItem>
                                <ListItem>Branches : CE , IT</ListItem>
                            </List>

                            <Button size='large' fullWidth className={classes.applyBtn}>Apply</Button>
                        </SubCard>
                    </Grid> */}
                    {/* <Grid item xs={12} md={6}>
                        <SubCard title="InfoCusp Pvt Ltd. Recruitment 2022-23">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>CTC : 10Lpa</ListItem>
                                <ListItem>Min CPI : 8.6</ListItem>
                                <ListItem>Branches : CE , IT</ListItem>
                            </List>

                            <Button size='large' fullWidth className={classes.applyBtn}>Apply</Button>
                        </SubCard>
                    </Grid> */}
                </Grid>
            </MainCard>
        </>
    )
}

export default ViewAnnoucements
