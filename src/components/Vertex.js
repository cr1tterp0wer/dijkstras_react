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
