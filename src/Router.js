import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/homepage'
import ItemList from './pages/itemlist'
import EditPage from './pages/editpage'

const Router = () => (
    <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/store' component={ItemList} />
        <Route path='/editItem/:id' component={EditPage} />
    </Switch>
)

export default Router