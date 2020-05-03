import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../Config/routes';
import { PrivateRoute } from '../Config/PrivateRoute';

class Main extends Component {
    loading = () => <div>Loading...</div>;

    render() {
        return (
            <main>
                <Suspense fallback={this.loading()}>
                    <Switch>
                        { routes.map((route, idx) => {
                            if(route.isPrivate) {
                                return <PrivateRoute
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    component={route.component}
                                />
                            }
                            return route.component ? (
                                <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => ( <route.component {...props} /> )} />
                            ) : (null)
                        })}
                        <Redirect from="/" to="/login" />
                    </Switch>
                </Suspense>
            </main>
        )
    }
}

export default Main;
