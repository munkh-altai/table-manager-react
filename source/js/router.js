import React, { Component } from 'react'

import { HashRouter, Route } from 'react-router-dom'

import Main from './components/Main';
import GridContainer from './containers/GridContainer';
import AddEditContainer from './containers/AddEditContainer';

export default class App extends Component {

    render() {
        return (
            <HashRouter >
                <Main>
                    <Route exact path="/" component={ GridContainer }/>
                    <Route path="/add" component={ AddEditContainer }/>
                    <Route path="/edit/:id" component={ AddEditContainer }/>
                </Main>
            </HashRouter>
        );
    }
}
