import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from '../../../store/constant';
import useFetch from '../../../Utilities/useFetch';
import HandleToast from '../../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import usePost from '../../../Utilities/UsePost';
import UploadCVCard from './UploadCVCard';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);

    }, []);

    const { required_data, loading } = useFetch("/student/getOneStudent/", "GET")
    let Student_ID, FirstName, MiddleName, LastName, Email_ID, CV_Upload;
    if(!loading)
    {
        // console.log(required_data["data"]);
        Student_ID = required_data["data"]["Student_ID"];
        FirstName = required_data["data"]["FirstName"];
        MiddleName = required_data["data"]["MiddleName"];
        LastName = required_data["data"]["LastName"];
        Email_ID = required_data["data"]["Email_ID"];
        CV_Upload = "http://localhost:8000" + required_data["data"]["CV_Upload"].split(".")[1] + ".pdf";

        // console.log(CV_Upload);
    }

    return (

        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard FirstName={FirstName} MiddleName={MiddleName} LastName={LastName} Email_ID={Email_ID} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <UploadCVCard CV_Upload={CV_Upload} />
                        {/* Rikin here */}
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
