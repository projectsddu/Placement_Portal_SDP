import React, { useState } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField } from '@material-ui/core';
import CompanyInternshipCard from './CompanyInternshipCard';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import useFetch from '../../Utilities/useFetch';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconCirclePlus } from '@tabler/icons';
import Grid from '@mui/material/Grid';

function AddInternship() {
    const [internshipCard, setInternshipCard] = useState([<CompanyInternshipCard />]);

    function handleClick() {
        // console.log("keval")
        let internship_card_copy = internshipCard;
        internship_card_copy.push(<CompanyInternshipCard />);
        setInternshipCard([].concat(internship_card_copy));
    }

    return (
        <>
            <MainCard title="Add Internship">
                <TextField
                    fullWidth
                    // required
                    label="Student ID"
                    id="fullWidth"
                    helperText="Enter Student ID"
                />
                <br />
                <br />
                {/* <CompanyInternshipCard /> */}
                {internshipCard.map((e) => {
                    return e;
                })}

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

export default AddInternship;
