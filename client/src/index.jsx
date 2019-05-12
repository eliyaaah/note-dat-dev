import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/store';
import { App } from './App';


render(
    // Cover app Component with <Provider> to give access to the Redux Store
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);