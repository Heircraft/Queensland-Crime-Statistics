import React, { Component } from 'react';


import "../Styles/vendor/bootstrap/css/bootstrap.min.css"
import "../Styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import "../Styles/vendor/animate/animate.css"
import "../Styles/vendor/select2/select2.min.css"
import "../Styles/vendor/perfect-scrollbar/perfect-scrollbar.css"
import "../Styles/css/util.css"
import "../Styles/css/DisplayQuery.css"

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
 
 class DisplayQuery extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
     };
     this.onSort = this.onSort.bind(this)
   }
   
   onSort(event, sortKey){
      const data = this.props.returns;
      data.pop();
      data.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey]))
      this.setState({data})
    }

   render() {
     return (
      <div className="container-table100">
      {this.props.returns !== '' ?
      
         <div className="wrap-table100">
            <div className="table100">
               <table>
                  <thead>
                     <tr className="table100-head">
                        <th>Offence</th>
                        <th onClick={e => this.onSort(e, 'LGA')}>Location</th>
                        <th onClick={e => this.onSort(e, 'total')}>Instances</th>
                        {this.props.gender !== '' ? <th>Gender</th> : null}
                        {this.props.age !== '' ? <th>Age</th> : null}
                        {this.props.year !== '' ? <th>Year</th> : null}
                        {this.props.month !== '' ? <th>Month</th> : null}
                        <th>Coordinates</th>
                     </tr>
                  </thead>
                  <tbody>
                     {this.props.returns.map((item, index) => 
                        <tr className="bodyy" key={`${index}${item.lng}`}>
                           <td>{this.props.offence}</td>
                           <td>{item.LGA}</td>
                           <td>{item.total}</td>   
                           {this.props.gender !== '' ? <td>{this.props.gender}</td> : null}     
                           {this.props.age !== '' ? <td>{this.props.age}</td> : null}
                           {this.props.year !== '' ? <td>{this.props.year}</td> : null}
                           {this.props.month !== '' ? <td>{this.props.month}</td> : null}                
                           <td >{`latitude: ${item.lat}`}<br></br>{`longitude: ${item.lng}`}</td>
                        </tr> 
                     )}   
                  </tbody> 
               </table>
            </div>
         </div>   

      : null}  
   </div> 
     );
     
   }
 }
 
export default DisplayQuery