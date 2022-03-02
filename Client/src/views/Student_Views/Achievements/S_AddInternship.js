import React, { useState, useEffect } from 'react';
import MainCard from '../../../ui-component/cards/MainCard';
import S_AddInternshipsCard from './S_AddInternshipsCard';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconCirclePlus } from '@tabler/icons';

function S_AddInternship() {
    const [internshipCard, setInternshipCard] = useState([]);

    function handleClick() {
        let internship_card_copy = internshipCard;
        internship_card_copy.push(
            <S_AddInternshipsCard
                callerFunc={changeStateFromChild}
                seed={Math.random()}
                from={'line 19'}
                details={{
                    Company_Name: '',
                    Start_Date: null,
                    End_Date: null,
                    Company_Address: '',
                    Description: ''
                }}
            />
        );
        setInternshipCard([].concat(internship_card_copy));
    }

    function changeStateFromChild(seed, operation) {
        let internship_card_copy = internshipCard;
        if (operation == 'delete') {
            // for (let i = 0; i < placementCard.length; i++) {
            //     let propDetails = placementCard[i].props.seed
            //     if(seed==propDetails)
            //     {

            //     }
            // }
            let filteredList = internship_card_copy.filter((elem) => {
                return elem.props.seed != seed;
            });
            console.log(filteredList);

            setInternshipCard(filteredList);
        }
    }

    return (
        <>
            <MainCard title="Add Internship">
                {internshipCard.map((elem) => {
                    return <>{elem}</>;
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

export default S_AddInternship;
