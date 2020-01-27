/*
 *  CHRISTOPHER APODACA
 *  CSC338 - ALGORITHMS
 *  Dijkstra'S ALGORITHM IMPLEMENTATION
 *  01/26/2020
 *  NATIONAL UNIVERSITY CURRICULUM
 *
 *  APP 
 */

import React from 'react';
import './App.scss';
import Grid from './components/Grid';

class App extends React.Component {
  render(){
    return (
      <div className="App container">
        <Grid />
      </div>
    );
  }
}

export default App;
