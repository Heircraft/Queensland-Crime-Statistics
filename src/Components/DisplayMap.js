import React, { Component } from 'react';
import '../Styles/css/DisplayMap.css'
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';

const Map = (props) => {
   console.log(props.returns)
   return (
      <GoogleMap 
         defaultZoom={5} 
         defaultCenter={{lat: -23, lng: 144}}
         >
         {props.returns.map((item, index) => (
            item.total !== 0 ?
               <Marker key={`${index}${item.lat}`} title={`${item.LGA}        Instances: ${item.total}`}
               position={{
                  lat: item.lat,
                  lng: item.lng
                  }}/>
            : null
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
      var subtitle;
      {this.props.month !== '' ?
         subtitle =  `${this.props.age} ${this.props.gender} ${this.props.year} month: ${this.props.month}`
      : subtitle = `${this.props.age} ${this.props.gender} ${this.props.year}`}
      
      return(
         <div className="page"> 
         <div className="title"> 
            <p> Instances of {this.props.offence}<br></br> Across Queensland </p>
         </div> 
         <div className="subtitle">
            <p> Specifiers:{subtitle}
            </p>
         </div>
            
         
            <div className="map" style={{width: '100vw', height: '80vh'}}>
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

// export default GoogleApiWrapper({
//    apiKey: ('AIzaSyAdL4XQ5Y-4KTkJKMNgU4M9qk7iP_KKJw0')
//  })(DisplayMap)