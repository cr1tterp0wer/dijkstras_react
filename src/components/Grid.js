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

  //
  // Container width = 800px
  // Number of elements, multiple of 80
  // row_n = 20
  // column_n = 32
  // n=500
  // 
  constructor( ){
    super( );
    
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

  componentDidMount(){
    this.initGrid();
  }

  createGrid( ){
    this.initGrid();
    return this.state.grid;
  }

  //Initialize the grid elements
  initGrid(){
  
    let vertex;
    let vertices=[];
    let vertex_data;
    let col_len = this.state.grid_data.column_n;
    let row_len = this.state.grid_data.row_n;

    // Outer loop to create parent
    //mod gives you column
    //division gives you row
    //calculations are not 0 index
    for ( let i = 0; i < this.state.grid_data.n; i++ ) {

      vertex_data = { };

      if( this.state.begin_i === i ){ // IF AT BEGIN
        vertex_data.visited   = true;
        vertex_data.name      = "begin-pos pos pos-" + this.state.begin_i  + " ";
        vertex_data.distance  = 0;
      }else if( this.state.target_i === i ){ // IF AT TARGET
        vertex_data.visted = false;
        vertex_data.name   = "target-pos";
        vertex_data.distance  = INFINITY;
      }
      else{ //IF VANILLA VERTEX
        vertex_data.visted = false;
        vertex_data.name   = "";
        vertex_data.distance  = INFINITY;
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
                visited_via=""
                distance={vertex_data.distance}
                visited={vertex_data.visited} 
                name={vertex_data.name}
                key={i}
                index={i}
                left={vertex_data.left} 
                right={vertex_data.right}
                top={vertex_data.top}
                bottom={vertex_data.bottom}
               /> 
        vertices.push( vertex );
    }

    this.setState( (state,props) => {
      return { grid: [...vertices] }
    });
  }

  
  //
  // DIJKSTRAS PATHFINDING ALGORITHM
  // EVERY VERTEX IS CONNECTED IT IT'S NEIGHBOR
  // EVERY EDGE HAS WEIGHT 1
  //
  // SET BEGIN = 0;
  // SET ALL VERTICES TO INFINITY
  //
  //

  dijkstra_pathfinding( s, t ){
    
    let visited = [];
    let source  = this.state.grid[s];
    let target  = this.state.grid[t];

    let priority_queue = [source];
    let current_vertex;
    let vertex_data;
    let i;
    let tmp_grid;

    console.log( this.state.grid );
    while( priority_queue.length > 0 ){

      current_vertex = priority_queue.shift();
      vertex_data    = current_vertex.props;
      tmp_grid       = [...this.state.grid];

      i = vertex_data.index;

      let v;//tmp vertex to update React state

      if( vertex_data.left > 0 ){
        if( vertex_data.distance + vertex_data.left < this.state.grid[ i - 1 ].props.distance ){
          v = <Vertex 
                visited_via={i}
                distance={vertex_data.distance + vertex_data.right}
                visited={tmp_grid[i-1].visited} 
                name={tmp_grid[i -1].name}
                key={tmp_grid[i-1].key}
                index={tmp_grid[i-1].index}
                left={tmp_grid[i-1].left} 
                right={tmp_grid[i-1].right}
                top={tmp_grid[i-1].top}
                bottom={tmp_grid[i-1].bottom}
               /> 
          tmp_grid[ i - 1 ] = v;
        }
      }
      if( vertex_data.right > 0 ) {
        if( vertex_data.distance + vertex_data.right < this.state.grid[ i + 1 ].props.distance ){
          v = <Vertex 
                visited_via={i}
                distance={vertex_data.distance + vertex_data.right}
                visited={tmp_grid[ i + 1 ].visited} 
                name={tmp_grid[ i + 1].name}
                key={tmp_grid[i+1].key}
                index={tmp_grid[i+1].index}
                left={tmp_grid[i+1].left} 
                right={tmp_grid[i+1].right}
                top={tmp_grid[i+1].top}
                bottom={tmp_grid[i+1].bottom}
               /> 
          tmp_grid[ i + 1 ] = v;
        }
      }
      if( vertex_data.top > 0 ){
        if( vertex_data.distance + vertex_data.top < this.state.grid[ i - this.state.grid_data.column_n ].props.distance ){
          v = <Vertex 
                visited_via={i}
                distance={vertex_data.distance + vertex_data.right}
                visited={tmp_grid[i-this.state.grid_data.column_n].visited} 
                name={tmp_grid[i-this.state.grid_data.column_n].name}
                key={tmp_grid[i-this.state.grid_data.column_n].key}
                index={tmp_grid[i-this.state.grid_data.column_n].index}
                left={tmp_grid[i-this.state.grid_data.column_n].left} 
                right={tmp_grid[i-this.state.grid_data.column_n].right}
                top={tmp_grid[i-this.state.grid_data.column_n].top}
                bottom={tmp_grid[i-this.state.grid_data.column_n].bottom}
               /> 
          tmp_grid[i-this.state.grid_data.column_n] = v;
        }
      }
      if( vertex_data.bottom > 0 ){
        if( vertex_data.distance + vertex_data.bottom < this.state.grid[ i + this.state.grid_data.column_n ].props.distance ){
          v = <Vertex 
                visited_via={i}
                distance={vertex_data.distance + vertex_data.right}
                visited={tmp_grid[i+this.state.grid_data.column_n].visited} 
                name={tmp_grid[i+this.state.grid_data.column_n].name}
                key={tmp_grid[i+this.state.grid_data.column_n].key}
                index={tmp_grid[i+this.state.grid_data.column_n].index}
                left={tmp_grid[i+this.state.grid_data.column_n].left} 
                right={tmp_grid[i+this.state.grid_data.column_n].right}
                top={tmp_grid[i+this.state.grid_data.column_n].top}
                bottom={tmp_grid[i+this.state.grid_data.column_n].bottom}
               /> 
          tmp_grid[i+this.state.grid_data.column_n] = v;
        }
      }

      this.setState({
        grid: [ ...tmp_grid ]
      });
    }

  }

  //
  // Utility Functions
  //

  removeAt( i ){
    var tmpGrid = this.state.grid;

    tmpGrid[i] = null;
    this.setState( ( state, props) => {
      return { grid: [...tmpGrid] }
    });
  }

  begin( ){
    this.dijkstra_pathfinding( this.state.begin_i, 
                               this.state.target_i );
  }

  // Reset Grid Elements
  reset( ){
    this.setState({grid:[]});
    this.initGrid();
  }

  //Clear Grid Elements
  clear( ){
    this.setState({grid:[]});
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
           this.state.grid.length > 0 ? this.state.grid.map( vertex => {
              return vertex;
            }) : null 
          }
        </div>
      </div>
    );
  }
}

export default Grid;
