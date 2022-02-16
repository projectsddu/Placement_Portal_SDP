import React, { useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField } from '@material-ui/core';
import CompanyPlacementCard from './CompanyPlacementCard';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import useFetch from '../../Utilities/useFetch';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconCirclePlus } from '@tabler/icons';
import Grid from '@mui/material/Grid';

function AddPlacement() {
    const { required_data, loading } = useFetch('/annoucement/requiredAnnoucementDetails', 'GET');

    let companies = [];
    if (!loading) {
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

    const [placementCard, setPlacementCard] = useState([<CompanyPlacementCard companies={companies} />]);

    function handleClick() {
        console.log("keval")
        let placement_card_copy = placementCard;
        placement_card_copy.push(<CompanyPlacementCard companies={companies} />);
        setPlacementCard([].concat(placement_card_copy));
    }

    return (
        <>
            <MainCard title="Add Placement">
                <TextField
                    fullWidth
                    // required
                    label="Student ID"
                    id="fullWidth"
                    helperText="Enter Student ID"
                />
                <br />
                <br />

                {placementCard.map(e => {
                  return e
                }) }

                <br />
                <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                    <LoadingButton
                        color="primary"
                        onClick={handleClick}
                        loading={false}
                        loadingPosition="start"
                        startIcon={<IconCirclePlus />}
                        variant="contained"
                    >
                        Add
                    </LoadingButton>
                </Grid>
            </MainCard>
        </>
    );
}

export default AddPlacement;
