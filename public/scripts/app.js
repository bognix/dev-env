import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import Welcome from './components/Welcome.jsx';
import Dashboard from './containers/Dashboard';
import AdminDashboard from './containers/AdminDashboard';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import App from './containers/App';
import RestrictedRoute from './containers/shared/RestrictedRoute';
import withRouteOnEnter from './components/hoc/withRouteOnEnter.jsx';
import {fetchTrips} from './actions/trips';

import styles from '../styles/main.sass';


const history = createBrowserHistory();
const middlewares = [
    thunk,
    routerMiddleware(history)
];

if (_app.ENV !== 'production') {
    middlewares.push(logger);
}

const store = createStore(rootReducer,
    applyMiddleware(...middlewares)
);

export class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route component={() => <div> Oops, page not found </div>} />
                        </Switch>
                    </ConnectedRouter>
                </App>
            </Provider>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
