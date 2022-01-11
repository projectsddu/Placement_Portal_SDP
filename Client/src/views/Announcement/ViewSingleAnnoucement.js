import React from 'react'
import MainCard from '../../ui-component/cards/MainCard'
import { Typography } from '@mui/material'
import useFetch from '../../Utilities/useFetch';
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ParseDate from '../../Utilities/ParseDate';

function ViewSingleAnnoucement() {

    function createData(key, value) {
        return { key, value };
    }

    const location = useLocation().pathname;
    const id = location.split("/")[3]

    const { required_data, loading } = useFetch("/annoucement/getAnnoucement/" + id, "GET")

    let announcement_details, rows;
    if (!loading) {

        announcement_details = required_data["data"][0];
        rows = [
          // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
          createData("Date of Visit", ParseDate(announcement_details["Date_of_Visit"])),
          createData("Registration Deadline",ParseDate(announcement_details["Registration_Deadline"], true)),
          createData("Eligible Branches", announcement_details["Eligible_Branches"]),
          createData("Passed out year", announcement_details["Passed_out_year"]),
          createData("Job Role", announcement_details["Job_Role"]),
          createData("Salary", announcement_details["Salary"]),
          createData("Job Location", announcement_details["Job_Location"]),
          createData("Bond Details", announcement_details["Bond_Details"]),
          createData("Other Details", announcement_details["Other_Details"]),
          createData("Date of Announcement", announcement_details["Date_of_announcement"]),
          createData("Eligibility", announcement_details["Eligibility"]),
        ];
    }

    // const name = new URLSearchParams(search).get('id');

    
      

    return (
        <>
            <MainCard title={loading ?"Announcement" : announcement_details["Company_Details"]["Company_name"]+ " - " + announcement_details["Job_Role"] + " For " + new Date(announcement_details["Passed_out_year"]).getFullYear() + " Batch"}>
                {loading ? (
                    ''
                ) : (
                    <>
                        

                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            {/* <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                            </TableRow>
                            </TableHead> */}
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.key}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </>
                )}

                

            </MainCard>
        </>
    );
}

export default ViewSingleAnnoucement
