//Depends
import React, { Component } from 'react';
import Updater from './components/provider/Updater'

const App = ({children}) => {
  return (<div className="react-text-adventure">
    <Updater />
    {children}
  </div>)
}
export default App;
