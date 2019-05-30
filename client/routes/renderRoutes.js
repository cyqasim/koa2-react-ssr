import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';

function renderRoutes(routes, indexPath = null) {
    return (
        <Switch>
            {routes.map((route, i) => {
                return (
                    <Route
                        key={route.key || i}
                        path={route.path}
                        exact={route.exact}
                        strict={route.strict}
                        render={props => {
                            return <route.component {...props} route={route} />;
                        }}
                    />
                );
            })}
            {indexPath ? <Redirect from={'/'} to={indexPath} /> : null}
        </Switch>
    );
}

export default renderRoutes;
