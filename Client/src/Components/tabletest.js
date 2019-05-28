import React, { Component } from 'react';


class ParentComponent extends Component {
   constructor(props) {
     super(props);
     this.state = { data: [] };
     this.onSort = this.onSort.bind(this)
   }
 
   componentDidMount() {
      let getParam = { method: "GET" };
      let head = { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1NTcxLCJlbWFpbCI6ImFsZXhhbmRlcmZseW9uQGdtYWlsLmNvbSJ9LCJpYXQiOjE1NTg1NDE2MjQsImV4cCI6MTU1ODYyODAyNH0.BQhAdlx2I-9eLOYChuDG8YF5xHA4KTC_sLZI2KMlaQQ` };
      getParam.headers = head;

      //The URL
      const baseUrl = "https://cab230.hackhouse.sh/search?";
      const query = 'offence=Armed Robbery';
      // this.state.offence = 'Armed Robbery'

      // const query = `offence=${this.state.offence}`;
      const url = baseUrl + query;

      fetch(encodeURI(url),getParam)
         .then(function(res) {
            if (res.ok) {
               return res.json();
            }
            throw new Error("Error when retrieving data");
         })
         .then(items => this.setState({ data: items.result }));
   }
 
   onSort(event, sortKey){

     const data = this.state.data;
     console.log(data)
     data.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey]))
     this.setState({data})
   }
 
   render() {
     var newdata = this.state.data;

     return (
       <table className="m-table">
         <thead>
           <tr>
             <th onClick={e => this.onSort(e, 'LGA')}>AccountName</th>
             <th onClick={e => this.onSort(e, 'total')}>ContractValue</th>
           </tr>
         </thead>
         <tbody>
           {newdata.map(function(account, index) {
             return (
               <tr key={index} data-item={account}>
                 <td data-title="Location">{account.LGA}</td>
                 <td data-title="Instances">{account.total}</td>
               </tr>
             );
           })}
         </tbody>
       </table>
     );
   }
 }
 
 export default ParentComponent;