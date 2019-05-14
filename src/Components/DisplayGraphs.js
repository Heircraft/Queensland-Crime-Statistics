import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';


class DisplayGraphs extends Component {
   constructor(props){
    super(props);
    this.state = {
       chartData: {
          labels: [this.props.offence]
       }
    }
  }

   render() {
      return (
<div></div>
      )
   }
}
export default DisplayGraphs

// class Chart extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//        chartData: {
//          labels: ['Boston', 'Worcester', 'Springfield'],
//          datasets: [
//             {
//                label:'Population',
//                data:[
//                   11343,
//                   15343,
//                   12334,
//                ],
//                backgroundColor:[
//                   'rgba(255,99,132,0.6)',
//                   'rgba(255,99,132,0.6)',
//                   'rgba(255,99,132,0.6)'
//                ]
//             }
//          ]
//        }
//     }
//   }

//   static defaultProps = {
//     displayTitle:true,
//     displayLegend: true,
//     legendPosition:'right',
//     location:'City'
//   }

//   render(){
      
//     return (
//       <div className="chart">
//         <Bar
//             data={this.state.chartData}
//         />

//       </div>
//     )
//   }
// }

// export default Chart;