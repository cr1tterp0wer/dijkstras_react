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
import Footer from './components/Footer';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <div className="container p-3">
          <div className="jumbotron">
            <h1 className="med">Dijkstra's Algorithm</h1>
            <h3 className="light">Christopher Apodaca</h3>
          </div>
        </div>
        <Grid />
        <Footer />
      </div>
    );
  }
}

export default App;
