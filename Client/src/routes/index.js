import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// project imports
import config from './../config';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import ErrorPage from '../views/Error/ErrorPage';

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    return (
        <Switch>
            <Redirect exact from="/" to={config.defaultPath} />
            <React.Fragment>
                {/* Routes for authentication pages */}
                <AuthenticationRoutes />

                {/* Route for login */}
                <LoginRoutes />

                {/* Routes for main layouts */}
                <MainRoutes />
                {/* <Route exact path={["*"]}>
                    <Route exact path="*" component={ErrorPage} />
                </Route> */}
            </React.Fragment>
        </Switch>
    );
};

export default Routes;
