import React from 'react';
import Square from './Vertex';

class Grid extends React.Component{

  constructor(){
    super();
    
    //
    // Container width = 800px
    // Therefore: 
    // Number of elements, multiple of 80
    // row_n = 20
    // column_n = 32
    // n=500
    // 
    let data = {
      n: 640,
      row_n: 20,
      column_n: 32,

      begin_pos: [19, 0],
      target_pos: [0,31],
    };
    
    this.state = {
      grid_data: data,
      grid: [],
      begin_i: ( data.begin_pos[0] * data.column_n ) + ( data.begin_pos[1] % data.column_n  ),
      target_i: ( data.target_pos[0] * data.column_n ) + ( data.target_pos[1] % data.column_n  ),
      begin_pos: [ 19, 0 ], //row,col
      target_pos: [ 0, 31 ],
    };
  }

  createGrid(){
    this.reset();
    return this.state.grid;
  }

  reset(){
    this.state.grid = [];

    // Outer loop to create parent
    for ( let i = 0; i < this.state.grid_data.n; i++ ) {
      //mod gives you column
      //division gives you row
      //calculations are not 0 index
      if( this.state.begin_i === i ){
        this.state.grid.push( 
             <Square name={ "begin-pos pos pos-"+ this.state.begin_i  + " " + i } key={i} /> 
           );
      }else if( this.state.target_i === i ){
        this.state.grid.push( 
             <Square name="target-pos" key={i} /> 
           );
      }
      else{
        this.state.grid.push( 
          <Square name="no" key={i} /> 
        );
      }
    }
  }

  dijkstra_pathfinding( path, source ){
    
  }

  begin(){
    this.dijkstra_pathfinding();
  }

  render(){
    return(
      <div id="grid" className="pt-5 grid-wrap">
        <div className="p-0">
          <div id="menu" className="row p-4 justify-content-md-center">
            <div className="reset-btn col-md-ofset-2 col-md-2">
              <button
               text="reset" 
               value="reset" 
               className="btn btn-primary p-1"
               onClick={ () => this.reset() } >
                 RESET
               </button>
            </div>
            <div className="begin-btn col-md-2">
              <button
               text="begin" 
               value="begin" 
               className="btn btn-secondary p-1"
               onClick={ () => this.begin() } >
                 BEGIN
               </button>
            </div>
          </div> 
          {
            this.createGrid()
          }
        </div>
      </div>
    );
  }
}

export default Grid;
