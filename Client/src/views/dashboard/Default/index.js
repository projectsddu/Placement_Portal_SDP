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
import { gridSpacing } from './../../../store/constant';
import UseFetch from '../../../Utilities/UseFetch';
import HandleToast from '../../../Utilities/HandleToast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import responsePipelineHandler from '../../../Utilities/ResponsePipelineHandler';
import usePost from '../../../Utilities/UsePost';
//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);

    }, []);

    // const { data, loading } = UseFetch("/annoucement/getAllAnnoucements", "GET", toast, true)
    // const params = {
    //     data: data,
    //     HandleToast: {
    //         toast: toast,
    //         customMessage: "Hey Hi from handler",
    //         flag: false,
    //     }
    // }

    // if (!loading) {
    //     console.log(data)
    //     responsePipelineHandler(params, 0)

    // }



    // // POSTING DATA TO SERVER CODE EXAMPLE HERE
    // const testingResp = {
    //     status: true,
    //     data: "Success posting data to server!!"
    // }
    // const { res, waiting } = usePost("/postTest", testingResp, "POST")
    // const params1 = {
    //     data: res,
    //     HandleToast: {
    //         toast: toast,
    //         flag: false,
    //     }
    // }

    // // To pipeline with params 1
    // if (!waiting) {
    //     console.log(res)
    //     responsePipelineHandler(params1, 0)
    // }

    // END OF POSTING DATA EXAMPLE


    return (

        <Grid container spacing={gridSpacing}>
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
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
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid> */}
        </Grid>
    );
};

export default Dashboard;
