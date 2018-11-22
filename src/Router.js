import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import EditPage from './pages/editpage'
import Dashboard from './pages/dashboard'
import ListView from './pages/list-view'

const Router = () => (
    <Switch>
        <Route path="/" exact render={() => <Redirect to="/listview" />} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/listview' component={ListView} />
        <Route path='/editItem/:id' component={EditPage} />
        <Route path='/addItem/' component={EditPage} />
    </Switch>
)

export default Router