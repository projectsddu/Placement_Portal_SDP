import React, { useState, useEffect } from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { TextField } from '@material-ui/core';
import CompanyInternshipCard from './CompanyInternshipCard';
import { ToastContainer, toast } from 'react-toastify';
import responsePipelineHandler from '../../Utilities/ResponsePipelineHandler';
import UseFetch from '../../Utilities/UseFetch';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconCirclePlus } from '@tabler/icons';
import Grid from '@mui/material/Grid';
import ChipCard from "../../ui-component/cards/GenericCards/ChipCard"
import Student_details from '../Placement/JSX/Student_details'
import NoStudent from '../Placement/JSX/NoStudent'

function AddInternship() {

    const [studentData, setStudentData] = useState('');
    const [StudentDetails, setStudentDetails] = useState(undefined);
    const [studentInternship, setStudentInternship] = useState(undefined)
    const [allCompanies, setallCompanies] = useState([])

    const [internshipCard, setInternshipCard] = useState([]);

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

    // function handleClick() {
    //     // console.log("keval")
    //     let internship_card_copy = internshipCard;
    //     internship_card_copy.push(<CompanyInternshipCard />);
    //     setInternshipCard([].concat(internship_card_copy));
    // }

    function handleClick() {
        // console.log("keval")
        let internship_card_copy = internshipCard;
        internship_card_copy.push(<CompanyInternshipCard
            callerFunc={changeStateFromChild}
            seed={Math.random()}
            from={"line 123"}
            details={{
                Stipend: "",
                Project_Title: "",
                Internal_Guide_ID: "",
                Company_ID: "",
                companyName: "",
                External_Guide_Name: "",
                External_Guide_Mobile_Number: "",
                External_Guide_Email_ID: "",
                Passed_out_year: StudentDetails["Passed_out_year"],
                Student_ID: studentData.toUpperCase()
            }}
            allCompanies={allCompanies} />);
        setInternshipCard([].concat(internship_card_copy));
    }

    function changeStateFromChild(seed, operation) {
        let internship_card_copy = internshipCard
        if (operation == "delete") {
            // for (let i = 0; i < placementCard.length; i++) {
            //     let propDetails = placementCard[i].props.seed
            //     if(seed==propDetails)
            //     {

            //     }
            // }
            let filteredList = internship_card_copy.filter((elem) => {
                return elem.props.seed != seed
            })
            console.log(filteredList)

            setInternshipCard(filteredList)
        }
    }


    async function handleChange(e) {
        setStudentData(e.target.value)

        if (e.target.value.length === 10) {
            console.log("called")
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
                        response1 = await fetch("/studentinternship/getStudentInternship/" + student_Id, { method: "GET" })

                        if (response1 != undefined) {
                            let jsonData1 = undefined
                            jsonData1 = await response1.json()
                            console.log(jsonData1)
                            setStudentInternship(jsonData1)
                            let studentInternshipCardCopy = internshipCard
                            console.log(jsonData1.data)

                            if (jsonData1.data != "Student Internship Record Not Found!" && jsonData1 != undefined) {
                                console.log(jsonData1.data.length)

                                for (let i = 0; i < jsonData1.data.length; i++) {
                                    console.log(jsonData1.data[i])
                                    let x = Math.random();
                                    studentInternshipCardCopy.unshift(
                                        <CompanyInternshipCard
                                            callerFunc={changeStateFromChild}
                                            seed={x}
                                            from={"line 86"}
                                            allCompanies={allCompanies}
                                            details={jsonData1.data[i]}
                                            idx={i}
                                        />
                                    )

                                }
                                setInternshipCard([].concat(studentInternshipCardCopy))
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

    }



    return (
        <>
            <MainCard title="Add Internship">
                <TextField
                    fullWidth
                    // required
                    label="Student ID"
                    id="fullWidth"
                    onInput={(e) => {
                        handleChange(e)
                    }}
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
                {internshipCard.map((elem) => {
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

export default AddInternship;
