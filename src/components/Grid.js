/*
 *  CHRISTOPHER APODACA
 *  CSC338 - ALGORITHMS
 *  Dijkstra'S ALGORITHM IMPLEMENTATION
 *  01/26/2020
 *  NATIONAL UNIVERSITY CURRICULUM
 *
 * Grid - graph of Vertices
 */

import React from 'react';
import Vertex from './Vertex';

const INFINITY = 999999;

class Grid extends React.Component{

  constructor( ){
    super( );
    
    //
    // Container width = 800px
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

  createGrid( ){
    this.initGrid();
    return this.state.grid;
  }

  //Initialize the grid elements
  initGrid(){
  
    let vertex;
    let vertex_data;
    let col_len = this.state.grid_data.column_n;
    let row_len = this.state.grid_data.row_n;

    // Outer loop to create parent
    //mod gives you column
    //division gives you row
    //calculations are not 0 index
    for ( let i = 0; i < this.state.grid_data.n; i++ ) {

      vertex_data = { };

      if( this.state.begin_i ==== i ){ // IF AT BEGIN
        vertex_data.visited = true;
        vertex_data.name    = "begin-pos pos pos-" + this.state.begin_i  + " ";
      }else if( this.state.target_i ==== i ){ // IF AT TARGET
        vertex_data.visted = false;
        vertex_data.name   = "target-pos";
      }
      else{ //IF VANILLA VERTEX
        vertex_data.visted = false;
        vertex_data.name   = "";
      }

      //ADD WEIGHTS
      if( i % col_len === 0 ) //LEFT
        vertex_data.left = -1;
      else
        vertex_data.left = 1;

      if( ( i % col_len ) === ( col_len - 1 ) ) //RIGHT
        vertex_data.right = -1;
      else
        vertex_data.right = 1;

      if( Math.floor( i / col_len ) === ( 0 ) ) //UPPER
        vertex_data.top = -1;
      else
        vertex_data.top = 1;

      if( Math.floor( i / col_len ) >= ( row_len-1 ) ) //LOWER
        vertex_data.bottom = -1;
      else
        vertex_data.bottom = 1;

      vertex = <Vertex 
                visited={vertex_data.visited} 
                name={vertex_data.name}
                key={i}
                index={i}
                left={vertex_data.left} 
                right={vertex_data.right}
                top={vertex_data.top}
                bottom={vertex_data.bottom}
               /> 
      this.state.grid.push( vertex );
    }

  }

  // Reset Grid Elements
  // Initialize Grid Elements
  reset( ){
    this.setState({grid:[]});
    this.initGrid();
  }

  //
  // DIJKSTRAS PATHFINDING ALGORITHM
  // EVERY VERTEX IS CONNECTED IT IT'S NEIGHBOR
  // EVERY EDGE HAS WEIGHT 1
  //
  // SET BEGIN = 0;
  // SET ALL VERTICES TO INFINITY
  //
  // CHECK ALL RELEVANT NEIGHBORS 
  // add the minimum distance of the current node
  // with the weight of the edge = 1
  // compare that value with the minimum distance of B ( infinity )
  // the lowest value is the one that remains as the minimum distance of B.
  // ONCE ALL NEIGHBORS ARE CHECKED, MARK THE VERTEX AS VISITED
  // PICK NEW "current" node an Unvisited with lowest distance
  //  REPEAT ALGORITHM
  //

  dijkstra_pathfinding( ){
    
    let dist = new Array( this.state.grid_data.n ).fill( INFINITY );
    dist[ this.state.begin_i ] = 0;

    let visited = [];
    let Q = [ ...this.state.grid ];

    console.log("pathfinding");
    console.log(Q);

    for( let i = 0; i < Q.length; i++ ){
      console.log( Q.pop( ) );
      
      //IF WE CAN GO TO VERTEX, DO IT
//      if(){}

    }
  }

  begin( ){
    this.dijkstra_pathfinding( );
  }

  render( ){
    return(
      <div id="grid" className="pt-5 grid-wrap">
        <div className="p-0">
          <div id="menu" className="row p-4 justify-content-md-center">
            <div className="reset-btn col-md-ofset-2 col-md-2">
              <button
               text="reset" 
               value="reset" 
               className="btn btn-secondary p-1"
               onClick={ ( ) => this.reset( ) } >
                 RESET
               </button>
            </div>
            <div className="begin-btn col-md-2">
              <button
               text="begin" 
               value="begin" 
               className="btn btn-primary p-1"
               onClick={ ( ) => this.begin( ) } >
                 BEGIN
               </button>
            </div>
          </div> 
          {
            this.createGrid( )
          }
        </div>
      </div>
    );
  }
}

export default Grid;
