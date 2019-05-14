import React, { Component } from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';


const Map = (props) => {

   return (
      <GoogleMap 
         defaultZoom={10} 
         defaultCenter={{lat: 12, lng: 12}}
         >
         {props.returns.map((item, index) => (
            <Marker key={`${index}${item.lng}`} 
            position={{
               lat: item.lat,
               lng: item.lat
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
      // console.log(this.props.returns)
      return(
            <div style={{width: '100vw', height: '100vh'}}>
               <WrappedMap returns={this.props.returns} googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=
                  AIzaSyCtdsmklZEvkycTrlB-b0N9RTpwZen4ZQw`}
                  loadingElement={<div style={{height: "100%"}}/>}
                  containerElement={<div style={{height: "100%"}}/>}
                  mapElement={<div style={{height: "100%"}}/>}
               />
            </div>
      )
   }
}
export default DisplayMap

// export default GoogleApiWrapper({
//    apiKey: ('AIzaSyAdL4XQ5Y-4KTkJKMNgU4M9qk7iP_KKJw0')
//  })(DisplayMap)