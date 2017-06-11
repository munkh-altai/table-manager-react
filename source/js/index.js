import React from 'react';
import {render} from 'react-dom';
import App from './router';
import createStore from './createStore/createStore';
import { Provider } from 'react-redux';
const store = createStore();

import { getSetupData } from './actions/grid'
require('./vendor/chosen/chosen.jquery.js')
require('./vendor/chosen/handsontable-chosen-editor.js')

//call page setup datas
store.dispatch(getSetupData());

// Load SCSS
import '../scss/app.scss';

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('solar-tp')
);





