import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';
import { AnnouncementMenu } from '../menu-items/AnnouncementMenu';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const form_elements = Loadable(lazy(() => import('../views/utilities/form_elements')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));
const cards = Loadable(lazy(() => import('../views/utilities/cards')));
const keval = Loadable(lazy(() => import('../views/Own/keval')));
const SReg = Loadable(lazy(() => import('../views/utilities/StudentRegisterExample')));
const Announcement = Loadable(lazy(() => import('../views/Announcement')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',

                '/utils/util-typography',
                '/utils/util-color',
                '/utils/util-shadow',
                '/icons/tabler-icons',
                '/icons/form_elements',
                '/icons/material-icons',
                '/icons/cards',
                '/own/keval',
                '/sample-page',


                // Announcement Routes
                "/announcement/index"
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    {/* <AuthGuard> */}
                    <Route path="/dashboard/default" component={DashboardDefault} />

                    <Route path="/utils/util-typography" component={UtilsTypography} />
                    <Route path="/utils/util-color" component={UtilsColor} />
                    <Route path="/utils/util-shadow" component={UtilsShadow} />
                    <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
                    <Route path="/icons/material-icons" component={UtilsMaterialIcons} />
                    <Route path="/icons/form_elements" component={form_elements} />
                    <Route path="/icons/cards" component={cards} />
                    <Route path="/own/keval" component={SReg} />



                    {/* Announcement Routes */}
                    <Route path="/announcement/index" component={Announcement} />

                    {/* </AuthGuard> */}
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
