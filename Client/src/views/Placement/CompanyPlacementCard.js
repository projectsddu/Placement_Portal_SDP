import { Typography, MenuItem, Button, Checkbox } from '@material-ui/core';
import React from 'react';
import SubCard from '../../ui-component/cards/SubCard';
import { TextField } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import useFetch from '../../Utilities/useFetch';


const Input = styled('input')({
    display: 'none'
});

function CompanyPlacementCard(props) {
    const { required_data, loading } = useFetch('/annoucement/requiredAnnoucementDetails', 'GET');

    let companies = [];
    if (!loading) {
        // props.checkFunc("jenil")
        // console.log(required_data["data"].length);
        for (let i = 0; i < required_data['data'].length; i++) {
            // console.log("Company Id: ", required_data["data"][i]["Company_ID"]);
            var obj = {};
            obj['value'] = required_data['data'][i]['Company_ID'];
            obj['label'] = required_data['data'][i]['Company_name'];
            companies.push(obj);
        }

        // console.log(companies)
    }

    return (
        <>
            <SubCard>
                <TextField
                    fullWidth
                    id="companies"
                    select
                    // required
                    label="Select Company"
                >
                    {companies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <br />
                <br />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField fullWidth label="Designation"></TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField fullWidth label="Salary"></TextField>

                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item md={2} xs={12}>
                        <label htmlFor="contained-button-file">
                            {/* <label>Job Description File</label>    */}
                            <Input
                                // onChange={changeHandler}
                                // required
                                // accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <Button variant="outlined" component="span">
                                Upload Job File
                            </Button>
                            <label id="fileUploadName"> </label>
                        </label>
                    </Grid>

                    <Grid item md={2} xs={12}>
                        <Checkbox /> <label>Final</label>
                    </Grid>
                    <Grid container md={8} xs={12} justifyContent="flex-end">
                        <Grid item >
                            <Button variant="contained" style={{ "margin-top": "15%" }} size="medium" component="span">
                                Add Placement
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </SubCard>
            <br />
        </>
    );
}

export default CompanyPlacementCard;
