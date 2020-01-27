/*
 *  CHRISTOPHER APODACA
 *  CSC338 - ALGORITHMS
 *  Dijkstra'S ALGORITHM IMPLEMENTATION
 *  01/26/2020
 *  NATIONAL UNIVERSITY CURRICULUM
 *
 */

import React from 'react';

class Vertex extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.props = props;
  }

  render(){
    return(
      <div 
       className=
      {'vertex ' + this.props.name} 
      >
      </div>
    );
  }

}

export default Vertex;
