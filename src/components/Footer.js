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

class Footer extends React.Component{
  render(){
    return(
    <footer className="page-footer font-small bg-primary pt-4">

      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase">Footer Content</h5>
            <p>Here you can use rows and columns to organize your footer content.</p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-3"/>
          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Links</h5>
             <ul className="list-unstyled">
              <li>
                <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">Dijkstras Algorithm</a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=uEGSBnSsE2E">Introduction to Dijkstra's Algorithm</a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=idBMEVPl1m8&t=11s">Introduction to Binary Numbers</a>
              </li>
              <li>
                <a href="https://www.github.com/cr1tterp0wer">My Github</a>
              </li>
            </ul>

         </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Additional Info</h5>
             <ul className="list-unstyled">
              <li>
                <a href="https://www.christopher-apodaca.com/blog">My Blog</a>
              </li>
              <li>
                <a href="https://critter-physicsapp.herokuapp.com/">Physics Calculator</a>
              </li>
              <li>
                <a href="https://www.tijana-walks.com/">Austin Dog Walking</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div className="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="https://www.christopher-apodaca.com/">Christopher-Apodaca.com</a>
      </div>

    </footer>
    );
  }
}

export default Footer;
