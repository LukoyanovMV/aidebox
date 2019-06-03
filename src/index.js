import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './containers/App';
import rootReducer from './reducers';
import initialState from './initialState';
import {ipcRenderer, webFrame, screen} from 'electron';

const store = createStore(
    rootReducer,
    initialState(),
    applyMiddleware(thunk)
);

// Load full application list
ipcRenderer.on('newAppList', function(event, apps) {
    if (apps.length > 0) {
        store.dispatch({
            type: 'NEW_APP_LIST',
            apps: apps
        })
    }
});

ipcRenderer.send('updateAppList');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app-root')
);