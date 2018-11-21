import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/homepage'
import EditPage from './pages/editpage'

const Router = () => (
    <Switch>
        <Route exact path='/store' component={HomePage} />
        <Route path='/editItem/:id' component={EditPage} />
    </Switch>
)

export default Router