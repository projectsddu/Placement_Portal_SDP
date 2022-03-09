const logger = require("serverloggerjs/logger")
const { sequelize } = require("../Models/index")
const Sequelize = require("sequelize")
const log = new logger(true)
const db = require("../Models/index")
const StudentPlacement = db.student_placements
const StudentService = require("../Services/StudentService")
const CompanyService = require("../Services/CompanyService")


const getPlacementReportByBatchYear = async (batch_year) => {

    try
    {
        let Passed_out_year = new Date(Date.now())
        Passed_out_year.setDate(0)
        Passed_out_year.setMonth(0)
        Passed_out_year.setFullYear(parseInt(batch_year))
        batch_year = parseInt(batch_year)
        // fetch the placement by batch year

        let placements = await StudentPlacement.findAll({
            where:[ sequelize.where(sequelize.fn('YEAR', sequelize.col('Passed_out_year')), batch_year),
            {IsFinal: 1}
        ]
        })

        placements = JSON.parse(JSON.stringify(placements))
        let placementsMetadata = {
            Total_Placed: placements.length,
            Male: 0,
            Female: 0,
            Average_Salary: 0,
            Median_Salary: 0,
            Max_Salary: 0,
            Min_Salary: 100000000,
            Total_Salary: 0
        }

        let salaries = []

        for(let i = 0; i < placements.length; i++)
        {
            let student = await StudentService.getOneStudent(placements[i]["Student_ID"])

            if(student["Gender"].toLowerCase() == "male" || student["Gender"].toLowerCase() == "m")
            {
                placementsMetadata["Male"]++;
            }
            else if(student["Gender"].toLowerCase() == "female" || student["Gender"].toLowerCase() == "f")
            {
                placementsMetadata["Female"]++;
            }

            // for median
            salaries.push(placements[i]["Salary"])
            console.log(placements["Salary"])

            // total salary
            placementsMetadata["Total_Salary"] += placements[i]["Salary"]

            // max salary
            if(placementsMetadata["Max_Salary"] < placements[i]["Salary"])
            {
                placementsMetadata["Max_Salary"] = placements[i]["Salary"]
            }

            // min salary
            if(placementsMetadata["Min_Salary"] > placements[i]["Salary"])
            {
                placementsMetadata["Min_Salary"] = placements[i]["Salary"]
            }

            // add company name
            let companyDetails = await CompanyService.getCompany(
                placements[i]["Company_ID"]
            );

            // console.log("Company Name: ", companyDetails["Company_name"])
            placements[i]["Company_name"] = companyDetails["Company_name"]
        }

        // average salary
        placementsMetadata["Average_Salary"] = placementsMetadata["Total_Salary"] / placements.length

        // even
        if(salaries.length % 2 == 0)
        {
            placementsMetadata["Median_Salary"] = (salaries[parseInt(salaries.length / 2)] + salaries[parseInt(salaries.length / 2) - 1]) / 2
        }
        else {
            placementsMetadata["Median_Salary"] = salaries[parseInt(salaries.length / 2)]
        }


        // console.log(placements)
        return [placements, placementsMetadata]

    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const multiplePlacements = async(batch_year) => {
    try
    {
        batch_year = parseInt(batch_year)

        let placements_1 = await StudentPlacement.findAll({
            where: sequelize.where(sequelize.fn('YEAR', sequelize.col('Passed_out_year')), batch_year)
        })

        let studentTaken = {}
        let placementTaken = {}
        let placeToFinal = {}

        for(let i=0;i<placements_1.length;i++)
        {
            const curPlacementObj = placements_1[i]
            if(studentTaken.hasOwnProperty(curPlacementObj["Student_ID"]))
            {
                studentTaken[curPlacementObj["Student_ID"]] += 1
            }
            else
            {
                studentTaken[curPlacementObj["Student_ID"]] = 1
            }

            if(placementTaken.hasOwnProperty(curPlacementObj["Student_ID"]))
            {
                 placementTaken[curPlacementObj["Student_ID"]].push(
                   curPlacementObj
                 );
                 placeToFinal[curPlacementObj["Student_ID"]] =
                   placementTaken[curPlacementObj["Student_ID"]];
            }
            else
            {
                placementTaken[curPlacementObj["Student_ID"]] = []
                placementTaken[curPlacementObj["Student_ID"]].push(
                  curPlacementObj
                );
            }
        }
        let keys = Object.keys(placeToFinal)
        for(let i in keys)
        {
            let studentId = keys[i]
            let student_data = await StudentService.getOneStudent(
              studentId
            );
            let studentName = student_data["FirstName"] + " " + student_data["MiddleName"] + " " + student_data["LastName"]

            let allPlacements = placeToFinal[studentId]
            let companiesData = []
            for(let j=0;j<allPlacements.length;j++)
            {
                let companyDetails = await CompanyService.getCompany(
                  allPlacements[j]["Company_ID"]
                );
                companiesData.push(companyDetails["Company_name"])
            }
            placeToFinal[studentId] = {
                "Student_Information":{"Student_Name":studentName},
                "Companies":companiesData,
                // "PlacementsDetails":allPlacements
            }
        }

                // let student_data = await StudentService.getOneStudent(placements_1[i]["Student_ID"])



                // // set name
                // student["Name"] = student_data["FirstName"] + " " + student_data["MiddleName"] + " " + student_data["LastName"]
        

        return placeToFinal
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const placedStudentsByCompany = async (batch_year) => {

    try
    {
        // console.log("from the service")
        batch_year = parseInt(batch_year)
        // console.log(batch_year)

        let placements = undefined

        if(batch_year == 1)
        {
            console.log("inside all")
            // use according name of the table by lloking at ppmyadmin
            const [results, placementsData] = await sequelize.query("SELECT Company_ID, Count(Student_ID) AS Student_Count FROM StudentPlacements GROUP BY (Company_ID)");

            placements = placementsData
        }
        else
        {
            console.log("inside the else")
            const [results, placementsData] = await sequelize.query("SELECT Company_ID, Count(Student_ID) AS Student_Count FROM StudentPlacements WHERE year(Passed_out_year) = " + batch_year + " GROUP BY (Company_ID)");

            placements = placementsData
        }


        // console.log(placements[1]["Count(Student_ID)"])

        let company_list = []

        for(let i = 0; i < placements.length; i++)
        {
            let companyDetails = await CompanyService.getCompany(placements[i]["Company_ID"])

            let data = {};

            data["Company_name"] = companyDetails["Company_name"]
            data["Student_Count"] = placements[i]["Student_Count"]

            company_list.push(data)
        }

        return company_list
    }
    catch (err) {
        log.error(err.toString())
        return false
    }

}
// const multiplePlacements = async (batch_year) => {

//     try
//     {
//         batch_year = parseInt(batch_year)

//         let placements_1 = await StudentPlacement.findAll({
//             where:[ sequelize.where(sequelize.fn('YEAR', sequelize.col('Passed_out_year')), batch_year),
//             {IsFinal: 1}
//         ]
//         })

//         placements_1 = JSON.parse(JSON.stringify(placements_1))

//         let student_list = []

//         for(let i = 0; i < placements_1.length; i++)
//         {
//             let placements_0 = await StudentPlacement.findAll({
//                 where:[ sequelize.where(sequelize.fn('YEAR', sequelize.col('Passed_out_year')), batch_year),
//                 {IsFinal: 0},
//                 {Student_ID: placements_1[i]["Student_ID"]}
//                 ]
//             })

//             if(placements_0.length != 0)
//             {
//                 let student = {
//                     Placement_Details: placements_0,
//                     Student_ID: placements_1[i]["Student_ID"],
//                     Name: "",
//                     Company: []
//                 }

                

//                 let student_data = await StudentService.getOneStudent(placements_1[i]["Student_ID"])



//                 // set name
//                 student["Name"] = student_data["FirstName"] + " " + student_data["MiddleName"] + " " + student_data["LastName"]

//                 for(let j = 0; j < placements_0.length; j++)
//                 {   
//                     let company = await CompanyService.getCompany(placements_0[j]["Company_ID"])
//                     student["Company"].push(company["Company_name"])
//                 }
//                 // temp.push(placements_0)

//                 // appned into student list
//                 student_list.push(student)
//             }

//         }

//         // return [placements_1, student_list]
//         return student_list

//         // let placements = await StudentPlacement.findAll({
//         //     where: sequelize.where(sequelize.fn('YEAR', sequelize.col('Passed_out_year')), batch_year)
//         // })

//         // placements = JSON.parse(JSON.stringify(placements))

//         // let students = {}
        

//         // // const students = await StudentService

//         // // for(let )

//         // "SELECT Student_ID FROM StudentPlacement WHERE IsFinal = 0"

//         // return placements


//     }
//     catch (err) {
//         log.error(err.toString())
//         return false
//     }

// }

module.exports = {
    getPlacementReportByBatchYear,
    multiplePlacements,
    placedStudentsByCompany
}