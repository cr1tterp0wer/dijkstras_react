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

let data = {
  n: 640,
  row_n: 20,
  column_n: 32,
  begin_pos: [19, 0],
  target_pos: [0,31],
};

let grid = {
  vertex_data:[],
  n: data.n,
  row_n: data.row_n,
  column_n: data.column_n,
  begin_pos: data.begin_pos,
  target_pos: data.target_pos,

  begin_i: ( data.begin_pos[0] * data.column_n ) + ( data.begin_pos[1] % data.column_n  ),
  target_i: ( data.target_pos[0] * data.column_n ) + ( data.target_pos[1] % data.column_n  ),
}


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
    this.state = {
       vertices: []
    }
  }

  componentDidMount(){
    this.initGrid();
  }

  createGrid( ){
    this.initGrid();
    return this.state.vertices;
  }

  //Initialize the grid elements
  initGrid(){
  
    let vertex;
    let vertices = [];
    let vertex_data;
    let col_len = grid.column_n;
    let row_len = grid.row_n;

    // Outer loop to create parent
    // mod gives you column
    // division gives you row
    // calculations are not 0 index
    for ( let i = 0; i < grid.n; i++ ) {

      vertex_data = { };

      if( grid.begin_i === i ){ // IF AT BEGIN
        vertex_data.name      = "vertex begin-pos pos pos-" + grid.begin_i  + " item-" + i;
        vertex_data.id        = "vertex-" + i;
        vertex_data.distance  = 0;
      }else if( grid.target_i === i ){ // IF AT TARGET
        vertex_data.name      = "vertex target-pos item-" + i;
        vertex_data.distance  = INFINITY;
        vertex_data.id        = "vertex-" + i;
      }
      else{ //IF VANILLA VERTEX
        vertex_data.name      = "vertex item-" + i ;
        vertex_data.distance  = INFINITY;
        vertex_data.id        = "vertex-" + i;
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
                name={vertex_data.name}
                key={i}
                index={i}
                id={vertex_data.id}
               /> 

      vertices.push( vertex );

      grid.vertex_data.push({
        index: i,
        visited_via: "",
        cost:   vertex_data.distance,
        left:   vertex_data.left,
        right:  vertex_data.right,
        top:    vertex_data.top,
        bottom: vertex_data.bottom,
      });
    }

    //ADD TO STATE-STORE FOR RENDER()
    this.setState( (state,props) => {
      return { vertices: [...vertices] }
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
  // The Set of all VISITED vertices = EMPTY
  // The PriorityQueue contains all vertices
  // While the PriorityQueue is not empty()
  // Get the item(u) in PriorityQueue with smallest distance
  // Add (u) to the Set of VISITED vertices
  //
  // Foreach( n in u.neighbors )
  //   if( n.cost > u.cost + Edge( n, u )  ){
  //     n.cost = u.cost + Edge( n, u ) )
  //     n.visited_via = u.index
  //    }
  // 
  // EDGE( n, u ) -> 1

  dijkstra_pathfinding( target ){
    
    let visited = [];
    let priority_queue;

    //Get a sorted Deep Copy - Hacky, change later
    priority_queue = JSON.parse( JSON.stringify( grid.vertex_data ) ).sort( (a,b) => ( a.cost <  b.cost ? -1 : 1 ) );

    let neighbors = [];
    let u; // current_vertex 

    while( priority_queue.length > 0 ){
      u = priority_queue.shift();
      visited.push( u );
      neighbors = this.getNeighbors( u );
      let self = this;

      neighbors.forEach( function( e, i ){
        let grid_neighbor = grid.vertex_data.find( ( item ) => ( item.index === e ) ); 
        let pq_neighbor   = priority_queue.find(   ( item ) => item.index === grid_neighbor.index );

        if( grid_neighbor.cost > u.cost + 1 ){
          grid_neighbor.cost        = u.cost + 1;
          grid_neighbor.visited_via = u.index;
          
          pq_neighbor.cost        = u.cost + 1;
          pq_neighbor.visited_via = u.index;

          setTimeout( () => self.crawlStateGrid( grid_neighbor.index, u.index ), i * 100 );
        }
      });

      priority_queue = priority_queue.sort( (a,b) => ( a.cost <  b.cost ? -1 : 1 ) );
    }

    return visited;
  }


  //@Params: Vertex_Object 
  //@returns: array of vertex_indexes
  getNeighbors( u ){

    let n = [];

    if( u.top > 0 )
      n.push( u.index - grid.column_n );
    if( u.bottom > 0 )
      n.push( u.index + grid.column_n );
    if( u.left > 0 )
      n.push( u.index - 1 );
    if( u.right > 0 )
      n.push( u.index + 1 );
   return n;
  }

  crawlStateGrid( vertex_id, via ){
    let el = document.getElementById( 'vertex-' + vertex_id );
    el.className = el.className + ' visited';
  }

  findPath( vertices, target ){
    
    // start at target,
    // output target index
    // travel to visited_via
    // output index

    let from = target; 
    let path = [];
    path.push(from);

    while( from != grid.begin_i ){
      for( let i = 0; i < vertices.length; i++ ){
        if( vertices[i].index == from && from != grid.begin_i ){
          from = vertices[i].visited_via;
          path.push(from);
        }
      }
    }

    return path;
  }

  updatePath( path ){

    path.forEach( function( e, i ){
      let el = document.getElementById( 'vertex-' + e )
      el.className = el.className + ' target-pos';
    });
  }

  //
  // Utility Functions
  //
  //
  begin( ){
    let visited = this.dijkstra_pathfinding( grid.target_i );
    let path = this.findPath( visited, grid.target_i )
    this.updatePath( path );
  }

  // Reset Grid Elements
  reset( ){
    this.setState({vertices:[]});
    this.initGrid();
  }

  render( ){
    return(
      <div id="grid" className="grid-wrap">
        <div className="p-0">
          <div id="menu" className="row p-4 justify-content-md-center">
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
           this.state.vertices.length > 0 ? this.state.vertices.map( vertex => {
              return vertex;
            }) : null 
          }
        </div>
      </div>
    );
  }
}

export default Grid;
