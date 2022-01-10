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
import useFetch from '../../Utilities/useFetch';
import HandleToast from '../../Utilities/HandleToast'
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';

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

function ViewCompany() {
    const classes = useStyles();


    const { data, loading } = useFetch("/annoucement/getAllAnnoucements/", "GET", toast, true)
    const params = {
        data: data,
        HandleToast: {
            toast: toast,
            customMessage: "Hey Hi from handler",
            flag: false,
        }
    }

    if (!loading) {
        console.log(data)
        responsePipelineHandler(params, 0)
    }

    function setData() {
        
    }



    return (
        <>
            {/* /**{ (setData(data)).map((e) => {return e})} */}
            <MainCard title="View Company">
                <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid item xs={12} md={12}>
                        <SubCard title="Amazon">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>
                                    ABOUT : Amazon.com, Inc. is an American multinational technology company 
                                    which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.
                                </ListItem>
                            </List>

                            {/* <Button size='large' fullWidth className={classes.applyBtn}>View Details</Button> */}
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <SubCard title="Infosys">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>
                                    ABOUT : Infosys Limited is an Indian multinational information technology company 
                                    that provides business consulting, information technology and outsourcing services
                                </ListItem>
                            </List>

                            {/* <Button size='large' fullWidth className={classes.applyBtn}>View Details</Button> */}
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <SubCard title="TCS">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>
                                    ABOUT : Tata Consultancy Services is an Indian multinational information technology services and 
                                    consulting company headquartered in Mumbai, Maharashtra, India with its largest campus located in Chennai, Tamil Nadu, India.
                                </ListItem>
                            </List>

                            {/* <Button size='large' fullWidth className={classes.applyBtn}>View Details</Button> */}
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <SubCard title="Jio Platforms">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>
                                    ABOUT : Jio Platforms is an Indian technology company and a subsidiary of 
                                    Reliance Industries, headquartered in Mumbai, India.
                                </ListItem>
                            </List>

                            {/* <Button size='large' fullWidth className={classes.applyBtn}>View Details</Button> */}
                        </SubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    )
}

export default ViewCompany
