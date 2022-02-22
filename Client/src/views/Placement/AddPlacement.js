import React, { useState, useEffect } from 'react';
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
    const [placementCard, setPlacementCard] = useState([<CompanyPlacementCard />]);

    const [studentData, setStudentData] = useState('');
    const [stduentDetails, setStduentDetails] = useState(undefined);

    // useEffect(async () => {
    //     if (studentData.length === 10) {
    //         // fetch details
    //         const student_data_api = await fetch("/student/getOneStudentInAdmin/" + studentData, {method: 'GET'})

    //         if(student_data_api)
    //         {
    //             student_data_api.json()
    //             .then((value) => {
    //                 console.log(value)
    //                 setStduentDetails(value["data"])
    //                 setTimeout(() =>{
    //                     // console.log(value["data"]);
    //                     console.log(stduentDetails);
    //                 }, 1000)
                    
    //             })
    //         }

    //     } 
        
    // }, [studentData]);


    async function handleChange(e)
    {
        setStudentData(e.target.value)
        
        if(e.target.value.length === 10)
        {
            fetch("/student/getOneStudentInAdmin/" + e.target.value, {method: 'GET'})
            .then((value) => {
                value.json()
                .then((value) => {
                    // console.log(value);
                    setStduentDetails(value)

                    setTimeout(() =>{
                        // console.log(value["data"]);
                        console.log(stduentDetails);
                    }, 1000)

                    // console.log(stduentDetails)
                })
            })
            
            // const data = await student_data_api.json()
            
            // setStduentDetails(data["data"])
            // console.log(stduentDetails);
        }

    }   

    function handleClick() {
        // console.log("keval")
        let placement_card_copy = placementCard;
        placement_card_copy.push(<CompanyPlacementCard />);
        setPlacementCard([].concat(placement_card_copy));
    }

    return (
        <>
            <MainCard title="Add Placement">
                <TextField
                    fullWidth
                    // required
                    label="Student ID"
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    id="fullWidth"
                    helperText="Enter Student ID"
                />
                <br />
                <br />

                {placementCard.map((e) => {
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

export default AddPlacement;
