import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {React, Component} from 'react';
 
export class MapContainer extends Component {

//   render() {
//     return (
//       <Map google={this.props.google} zoom={14}>
 
//         <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />
 
//         <InfoWindow onClose={this.onInfoWindowClose}>
//             <div>
//               <h1>{this.state.selectedPlace.name}</h1>
//             </div>
//         </InfoWindow>
//       </Map>
//     );
//   }
// }
 
// export default GoogleApiWrapper({
//   apiKey: ("AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ")
// })(MapContainer)


  constructor(props) {
    super(props);
    this.state = { userLocation: { lat: 32, lng: 32 } };
  }
  componentDidMount(props) {
    this.setState({
      userLocation: navigator.geolocation.getCurrentPosition(
        this.renderPosition
      )
    });
  }
  renderPosition(position) {
    return { lat: position.coords.latitude, lng: position.coords.longitude };
  }
  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={this.state.userLocation}
        zoom={10}>
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ")
})(MapContainer);