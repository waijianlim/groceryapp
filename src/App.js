import React, { Component } from 'react';

import Router from './Router'
import AppBar from './pages/homepageAppBar'


class App extends Component {
  render() {
    return <div className='page-container'>
      <AppBar />
      <Router />
    </div>
     
    
  }
}

export default App;
