/*
 *  CHRISTOPHER APODACA
 *  CSC338 - ALGORITHMS
 *  Dijkstra'S ALGORITHM IMPLEMENTATION
 *  01/26/2020
 *  NATIONAL UNIVERSITY CURRICULUM
 *
 * Vertex - single node
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
       id={this.props.id}
       className=
      {'vertex ' + this.props.name} 
      >
      </div>
    );
  }

}

export default Vertex;
