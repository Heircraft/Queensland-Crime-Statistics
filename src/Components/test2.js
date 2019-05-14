import React, { Component } from 'react';

/* 
  Row component written as a simple function:
  https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components
  
  Any components that do not have state should be written this way,
  see: https://medium.com/@housecor/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
*/
const Row = ({id, title, priority, type, complete}) => (
   <div className="row">
     <div>{id}</div>
     <div>{title}</div>
     <div>{priority}</div>
     <div>{type}</div>    
     <div>{complete}</div>    
   </div>
 );
 
 /*
   Table component written as an ES6 class
 */
 class Test extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       data: [
         {id: 403, title: 'Task 403', priority: 'High', type: 'Improvement', complete: 100}, 
         {id: 532, title: 'Task 532', priority: 'Medium', type: 'Improvement', complete: 30}, 
         {id: 240, title: 'Task 240', priority: 'High', type: 'Story', complete: 66},
       ],
     };
     
     // http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
     // bind the context for compareBy & sortBy to this component instance
     this.compareBy.bind(this);
     this.sortBy.bind(this);
   }
   
   compareBy(key) {
     return function (a, b) {
       if (a[key] < b[key]) return -1;
       if (a[key] > b[key]) return 1;
       return 0;
     };
   }
  
   sortBy(key) {
     let arrayCopy = [this.state.data];
     arrayCopy.sort(this.compareBy(key));
     this.setState({data: arrayCopy});
   }
     
   render() {
     const rows = this.state.data.map( (rowData) => <Row {...rowData} />);
 
     return (
       <div className="table">
         <div className="header">
           <div onClick={() => this.sortBy('id')} >ID</div>
           <div onClick={() => this.sortBy('title')}>Title</div>
           <div onClick={() => this.sortBy('priority')}>Priority</div>
           <div onClick={() => this.sortBy('type')}>Issue Type</div>
           <div onClick={() => this.sortBy('complete')}>% Complete</div>
         </div>
         <div className="body">
           {rows}
         </div>
       </div>
     );
     
   }
 }
 
export default Test