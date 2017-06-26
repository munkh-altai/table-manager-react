import React from 'react';
import {render} from 'react-dom';
import App from './router';
import createStore from './createStore/createStore';
import { Provider } from 'react-redux';
const store = createStore();

import { getSetupData } from './actions/grid'
require('./vendor/chosen/chosen.jquery.js')
require('./vendor/chosen/handsontable-chosen-editor.js')

import 'element-theme-default';

// Load SCSS
import '../scss/app.scss'


import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

i18n.use(locale);



window.TableManager = (element, options)=>{
  //call page setup datas
  store.dispatch(getSetupData(options));
  return   render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById(element)
  );
}

