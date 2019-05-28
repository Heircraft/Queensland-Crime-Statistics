import React, { Component } from 'react';
import '../Styles/css/DisplayMap.css'
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';

const Map = (props) => {
   return (
      <GoogleMap 
         defaultZoom={5} 
         defaultCenter={{lat: -23, lng: 144}}
         >
         {props.returns.map((item, index) => (
            <Marker key={`${index}${item.lat}`} title={`${item.LGA}        Instances: ${item.total}`}
            position={{
               lat: item.lat,
               lng: item.lng
               }}/>
         ))}
      </GoogleMap>
   );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

class DisplayMap extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }
   
   render() {    
      var subtitle = ''
      
      return(
         
         <div className="page">
            <div className="invis">
               {this.props.age !== '' ? subtitle = subtitle + ` - ${this.props.age}` : null}
               {this.props.gender !== '' ? subtitle = subtitle + ` - ${this.props.gender}` : null}
               {this.props.year !== '' ? subtitle = subtitle + ` - ${this.props.year}` : null}
               {this.props.month !== '' ? subtitle = subtitle + ` - month(s): ${this.props.month}`: null} 
            </div>
         <div className="title"> 
            <p> Instances of </p><h3>{this.props.offence}</h3><p> Across Queensland </p>
         </div> 
         <div className="subtitle">
            <h2>Specifiers:</h2><p>{subtitle}</p>
            
         </div>
            
         
            <div className="map" style={{width: '100vw', height: '75vh'}}>
               <WrappedMap returns={this.props.returns} googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=
                  AIzaSyCtdsmklZEvkycTrlB-b0N9RTpwZen4ZQw`}
                  loadingElement={<div style={{height: "100%"}}/>}
                  containerElement={<div style={{height: "100%"}}/>}
                  mapElement={<div style={{height: "100%"}}/>}
               />
            </div>
         </div>
      )
   }
}
export default DisplayMap
