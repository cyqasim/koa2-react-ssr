import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

function renderRoutes(routes, location, token, indexPath = null) {
    return (
        <Switch location={location}>
            {indexPath ? <Redirect from={'/'} to={indexPath} exact /> : null}
            {routes.map((route, i) => {
                return (
                    <Route
                        key={route.key || i}
                        path={route.path}
                        exact={route.exact}
                        strict={route.strict}
                        render={props => {
                            if (!route.auth || (route.auth && token)) {
                                return <route.component {...props} route={route} />;
                            } else {
                                return <Redirect from={route.path} to={'/login'} exact />;
                            }
                        }}
                    />
                );
            })}
        </Switch>
    );
}

export default renderRoutes;
