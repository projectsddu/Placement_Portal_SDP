import React, { lazy, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import HandleCookies from "../Utilities/HandleCookies"
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

// announcement starts
const Announcement = Loadable(lazy(() => import('../views/Announcement/index')));
const AddAnnouncement = Loadable(lazy(() => import('../views/Announcement/AddAnnoucement')));
const ViewAnnouncement = Loadable(lazy(() => import('../views/Announcement/ViewAnnoucements')));
const ViewSingleAnnoucement = Loadable(lazy(() => import('../views/Announcement/ViewSingleAnnoucement')));
const EditAnnouncement = Loadable(lazy(() => import('../views/Announcement/EditAnnouncement')));
const ViewSubscribedStudents = Loadable(lazy(() => import('../views/Announcement/ViewSubscribedStudents')));

// announcement ends


// placement starts

const AddPlacement = Loadable(lazy(() => import('../views/Placement/AddPlacement')));


// placement ends

// internship starts
const AddInternship = Loadable(lazy(() => import('../views/Internship/AddInternship')));

// internship ends

// company starts
const AddCompany = Loadable(lazy(() => import('../views/Company/AddCompany')));

const ViewCompany = Loadable(lazy(() => import('../views/Company/ViewCompany')));
const ViewStudent = Loadable(lazy(() => import('../views/Student/ViewStudent')));
const ViewSingleCompany = Loadable(lazy(() => import('../views/Company/ViewSingleCompany')));
const EditCompany = Loadable(lazy(() => import('../views/Company/EditCompanyDetails')));

// company ends

const Temp = Loadable(lazy(() => import('../views/Student_Views/Dashboard/index')));


// student starts
const AddStudent = Loadable(lazy(() => import('../views/Student/AddStudent')));
const EditSingleStudent = Loadable(lazy(() => import('../views/Student/EditSingleStudent')));
const StudentPasswords = Loadable(lazy(() => import('../views/Student/StudentPasswords')));
const UpdateStudent = Loadable(lazy(() => import('../views/Student/UpdateStudent')));
const S_ViewAnnouncements = Loadable(lazy(() => import('../views/Student_Views/Announcements/S_ViewAnnouncements')));
const S_ViewSingleAnnouncement = Loadable(lazy(() => import('../views/Student_Views/Announcements/S_ViewSingleAnnouncement')));

const S_ViewSubscribedAnnouncements = Loadable(lazy(() => import('../views/Student_Views/Announcements/S_ViewSubscribedAnnouncement')));

const S_AllNotifications = Loadable(lazy(() => import('../views/Student_Views/Notifications/AllNotifications')));
const S_ViewProfile = Loadable(lazy(() => import('../views/Student_Views/Profile/S_ViewProfile')));
const S_AddInternship = Loadable(lazy(() => import('../views/Student_Views/Achievements/S_AddInternship')));

// student ends


const ErrorPage = Loadable(lazy(() => import('../views/Error/ErrorPage')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();
    const history = useHistory();
    const exemptRoutes = ["/admin/login", "/_student/login"]

    const isAdminRoute = function (location) {
        console.log(location.split("/")[2])
        if (location.split("/")[1] == "_student") {
            return false
        }
        else {
            return true
        }
    }

    useEffect(() => {
        console.log(location.pathname)
        if (location.pathname != "/admin/login" && location.pathname != "/_student/login") {
            console.log("here")

            const isAdmin = isAdminRoute(location.pathname)
            console.log(document.cookie)
            const allCookies = HandleCookies.parseCookies(document.cookie)

            if (isAdmin) {
                const status = HandleCookies.VerifyAdminCookie()
                if (!status) {
                    history.push("/admin/login")
                }
            }
            else {
                const status = HandleCookies.VerifyStudentCookie()
                if (!status) {
                    history.push("/_student/login")
                }
            }

        }
    })

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
                "/announcement/index",
                '/announcement/add_annoucement',
                "/announcement/view_annoucement",
                "/announcement/view_annoucement/:annoucement_id",
                "/announcement/edit_announcement/:annoucement_id",
                "/announcement/view_subscribed_announcement/:annoucement_id",
                // annoucement routers finished


                // placement routes
                "/placement/add_placement",
                // placement routes finished

                // internship starts
                "/internship/add_internship",
                // internship ends

                // Company Routes

                '/company/add_company',
                // Company routes finished


                '/company/view_company',
                '/company/view_company/:id',
                '/company/edit_company/:id',

                // Student Routes
                '/student/view_student',
                '/student/add_student',
                '/student/update_student',
                '/student/student_passwords',
                '/student/edit_student/:id',

                '/_student/Dashboard',
                "/_student/announcement/view_announcement/:idx",
                "/_student/announcement/view_announcement",

                "/_student/announcement/view_subscribed_announcement",

                "/_student/notifications/all",
                "/_student/Dashboard/profile",
                "/_student/achievements/add_internship",

                // for any errorneous page
                // "/"

            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    {/* <AuthGuard> */}

                    <Route path="/_student/notifications/all" component={S_AllNotifications} />

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
                    <Route path="/announcement/add_annoucement" component={AddAnnouncement} />
                    <Route path="/announcement/edit_announcement/:annoucement_id" component={EditAnnouncement} />
                    <Route path="/announcement/view_annoucement/:annoucement_id" component={ViewSingleAnnoucement} />
                    <Route path="/announcement/view_subscribed_announcement/:annoucement_id" component={ViewSubscribedStudents} />
                    <Route path="/announcement/view_annoucement" component={ViewAnnouncement} />


                    {/* placement routes */}
                    <Route path="/placement/add_placement" component={AddPlacement} />

                    {/* internship routes */}
                    <Route path="/internship/add_internship" component={AddInternship} />


                    {/* Company Routes */}
                    <Route path="/company/view_company/:id" component={ViewSingleCompany} />
                    <Route path="/company/edit_company/:id" component={EditCompany} />
                    <Route path="/company/view_company" component={ViewCompany} />
                    <Route path="/company/add_company" component={AddCompany} />

                    {/* Student Routes */}
                    <Route path="/student/view_student" component={ViewStudent} />
                    <Route path="/student/add_student" component={AddStudent} />
                    <Route path="/student/update_student" component={UpdateStudent} />
                    <Route path="/student/edit_student/:id" component={EditSingleStudent} />
                    <Route path="/student/student_passwords" component={StudentPasswords} />

                    {/* </AuthGuard> */}

                    {/* Student View Routes */}

                    <Route path="/_student/Dashboard/profile" component={S_ViewProfile} />
                    <Route path="/_student/Dashboard/" component={Temp} />
                    <Route path="/_student/announcement/view_announcement/:idx" component={S_ViewSingleAnnouncement} />
                    <Route path="/_student/announcement/view_announcement" component={S_ViewAnnouncements} />
                    <Route path="/_student/announcement/view_subscribed_announcement" component={S_ViewSubscribedAnnouncements} />
                    <Route path="/_student/achievements/add_internship" component={S_AddInternship} />

                    {/* for any errorneous page */}
                    {/* <Route path="" component={ErrorPage} /> */}



                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
