import React, {Component} from 'react';
import {Bar, Doughnut, Pie} from 'react-chartjs-2';
import '../Styles/css/DisplayMap.css'
var min = 1;
var max = 255;
// var returned = [];
class DisplayGraphs extends Component{
  constructor(props){
    super(props);
    this.state = {
       chartData: {
         labels: this.props.returns.map(item => item.LGA),
         datasets: [
            {
               data: this.props.returns.map(item => item.total),
               backgroundColor: this.props.returns.map(item =>`rgba(${min+(Math.random()*(max-min))},${min+(Math.random()*(max-min))},${min+(Math.random()*(max-min))},0.6)`)
            }
         ]
       }
    }
  }

   render(){
      var subtitle = ''
      return (
         <div className="chart">
            <div className="invis">
               {this.props.age !== '' ? subtitle = subtitle + ` - ${this.props.age}` : null}
               {this.props.gender !== '' ? subtitle = subtitle + ` - ${this.props.gender}` : null}
               {this.props.year !== '' ? subtitle = subtitle + ` - ${this.props.year}` : null}
               {this.props.month !== '' ? subtitle = subtitle + ` - month(s): ${this.props.month}`: null} 
            </div>
            <div className="subtitle2">
               <h2>Specifiers:</h2><p>{subtitle}</p>
            </div>
            <Bar
               data={this.state.chartData}
               width={1100}
               height={500}
               options={{ maintainAspectRatio: true,
                  title:{
                     display:true,
                     fontSize:50,
                     fontColor: '#000',
                     text: `Instances of ${this.props.offence}`
                  },
                  legend: {
                     display:false,
                     labels:{
                        fontColor: '#000',
                        fontSize: 1
                     }
                  }
               }}
            />
         <Doughnut
               data={this.state.chartData}
               width={1100}
               height={1300}
               options={{ maintainAspectRatio: true,
                  legend: {
                     display:true,
                     labels:{
                        fontColor: '#000',
                        fontSize: 15
                     }
                  }
               }}
         /> 

         </div>
      )
   }
}

export default DisplayGraphs;