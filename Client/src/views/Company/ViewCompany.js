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
import { useHistory } from 'react-router';
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
    const history = useHistory()
    const classes = useStyles();
    const { required_data, loading } = useFetch("/company/getCompany", "GET")
    return (
        <>
            {/* /**{ (setData(data)).map((e) => {return e})} */}
            <MainCard title="View Company">
                <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    {
                        loading ? "" : required_data["data"].map((e) => {
                            return <><Grid item xs={12} md={12}>
                                <SubCard title={e["Company_name"]}>
                                    <List dense={false}>
                                        <ListItem>
                                            <Typography variant="h5">Roles :</Typography>
                                            {e["Company_offer_type"]}
                                        </ListItem>
                                        <ListItem>
                                            <Typography variant="h5">Address :</Typography>
                                            {e["Company_address"]}
                                        </ListItem>
                                        <ListItem>
                                            <Typography variant="h5">City :</Typography>
                                            {e["City"] + " " + e["State"]}
                                        </ListItem>

                                    </List>

                                    <Button size='large' onClick={() => {
                                        history.push("/company/view_company/" + e["Company_ID"])
                                    }} fullWidth className={classes.applyBtn}>View Details</Button>
                                </SubCard>
                            </Grid>
                            </>

                        })
                    }
                    {/* <Grid item xs={12} md={12}>
                        <SubCard title="Infosys">
                            <Typography variant="h5">Description</Typography>
                            <List dense={true}>
                                <ListItem>
                                    ABOUT : Infosys Limited is an Indian multinational information technology company
                                    that provides business consulting, information technology and outsourcing services
                                </ListItem>
                            </List>

                           
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

                           
                        </SubCard>
                    </Grid> */}
                </Grid>
            </MainCard>
        </>
    )
}

export default ViewCompany
