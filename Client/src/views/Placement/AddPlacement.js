import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField } from '@material-ui/core';
import CompanyPlacementCard from './CompanyPlacementCard';
import { ToastContainer, toast } from 'react-toastify';
import UseFetch from '../../Utilities/UseFetch';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconCirclePlus } from '@tabler/icons';
import Grid from '@mui/material/Grid';
import SubCard from '../../ui-component/cards/SubCard';
import { Typography } from '@material-ui/core';
import { ParseDate } from '../../Utilities/ParseDate';
import Modal from '@mui/material/Modal';
import ChipCard from "../../ui-component/cards/GenericCards/ChipCard"
import Student_details from './JSX/Student_details';
import NoStudent from "./JSX/NoStudent"
import CircularProgress from '@mui/material/CircularProgress';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';

function AddPlacement() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        bgcolor: 'background.paper',
        // boxShadow: 24,
        p: 4,
        border: "0px solid white"
    };
    const [studentData, setStudentData] = useState('');
    const [StudentDetails, setStudentDetails] = useState(undefined);
    const [studentPlacement, setStudentPlacement] = useState(undefined)
    const [allCompanies, setallCompanies] = useState([])
    // const [checkedStatus, setcheckedStatus] = useState([])
    const [placementData, setplacementData] = useState([])

    const [placementCard, setPlacementCard] = useState([]);

    useEffect(async () => {
        let response = await fetch("/company/getCompany")
        if (response) {
            let data = await response.json()
            if (data) {
                console.log(data["data"])
                setallCompanies([].concat(data["data"]))

            }
        }
    }, [])
    function changeStateFromChild(seed, operation) {
        let placement_card_copy = placementCard
        if (operation == "delete") {
            let filteredList = placement_card_copy.filter((elem) => {
                return elem.props.seed != seed
            })
            console.log(filteredList)

            setPlacementCard(filteredList)
        }
    }

    // const [jsonData, setjsonData] = useState(undefined)

    async function handleChange(e) {
        setStudentData(e.target.value)

        if (e.target.value.length === 10) {
            handleOpen()
            let response = undefined
            response = await fetch("/student/getOneStudentInAdmin/" + e.target.value.toUpperCase(), { method: "GET" })

            if (response != undefined) {
                let jsonData = undefined
                jsonData = await response.json()
                if (jsonData != undefined) {
                    console.log(jsonData);
                    if (jsonData["data"] == "Error Fetching Student data !!!") {
                        console.log("Here in ese")
                        setStudentDetails("No student found!")
                    }
                    else {

                        setStudentDetails(jsonData["data"])
                        const student_Id = jsonData["data"]["Student_ID"]
                        // console.log(student_Id)
                        let response1 = undefined
                        response1 = await fetch("/studentplacement/getStudentPlacement/" + student_Id, { method: "GET" })

                        if (response1 != undefined) {
                            let jsonData1 = undefined
                            jsonData1 = await response1.json()
                            console.log(jsonData1)
                            setStudentPlacement(jsonData1)
                            let studentPlacementCardCopy = placementCard
                            console.log(jsonData1.data)

                            if (jsonData1.data != "Student Placement Record Not Found!" && jsonData1 != undefined) {
                                for (let i = 0; i < jsonData1.data.length; i++) {
                                    console.log(jsonData1.data[i])
                                    let x = Math.random();
                                    studentPlacementCardCopy.unshift(
                                        <CompanyPlacementCard
                                            callerFunc={changeStateFromChild}
                                            seed={x}
                                            from={"line 86"}
                                            allCompanies={allCompanies}
                                            details={jsonData1.data[i]}
                                            idx={i}
                                        />
                                    )

                                }
                                setPlacementCard([].concat(studentPlacementCardCopy))
                            }
                            // console.log(placementCard)
                        }
                    }
                }

            }




        }
        else if (e.target.value === 0) {
            setStudentDetails(undefined)
            console.log("Here")
        }
        handleClose()

    }

    function handleClick() {
        // console.log("keval")
        let placement_card_copy = placementCard;
        placement_card_copy.push(<CompanyPlacementCard
            callerFunc={changeStateFromChild}
            seed={Math.random()}
            from={"line 123"}
            details={{
                Designation: "",
                Salary: "",
                Offer_Letter: "",
                Passed_out_year: "",
                IsFinal: false,
                Company_ID: "",
                companyName: "",
                Student_ID: studentData.toUpperCase()
            }}
            allCompanies={allCompanies} />);
        setPlacementCard([].concat(placement_card_copy));
    }

    const [first, setfirst] = useState("")
    useEffect(() => {
        console.log(first)
    }, [first])

    let oppo = 9000
    function checkMe(str1) {
        setfirst(str1 + oppo + "From GHere")
    }



    return (
        <>
            <MainCard title="Add Placement">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <CircularProgress style={style} color="primary" />
                </Modal>
                <TextField
                    fullWidth
                    // required
                    label="Student ID"
                    onInput={(e) => {
                        handleChange(e)
                    }}
                    id="fullWidth"
                    helperText="Enter Student ID"
                />
                <br />
                <br />
                {StudentDetails === undefined ? "" :
                    StudentDetails == "No student found!" ?
                        <ChipCard data={
                            <NoStudent ID={studentData} />} loading={false} type={"error"} /> :
                        <>
                            <ChipCard loading={false} data={<Student_details details={StudentDetails} />}>
                            </ChipCard>
                            <br />
                        </>

                }

                {/* {placementCard.map((e) => {
                    return e;
                })} */}
                {placementCard.map((elem) => {
                    return (<>
                        {elem}
                    </>)
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
