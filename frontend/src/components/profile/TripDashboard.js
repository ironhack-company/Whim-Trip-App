import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Loader from "react-loader-spinner";
import axios from 'axios';
import baseUrl from '../../services/configUrl'

class TripDashboard extends Component {
    
    state = {
        userLocation: { lat: 32, lng: 32 },
        loading: true,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        destinationLocation: {lat:0, lng:0}
    }

componentDidMount(){
    const script = document.createElement("script")
    script.src = '//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js';
    script.async = true;
    console.log()
    document.body.appendChild(script)

    // axios.get("https://maps.googleapi.com/maps/api/place/textsearch/json?query=new+york+city+point+of+interest&language=en&key=AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ").then(data =>
    //     this.setState({
    //       pointsOfInterest: data.data
    //     })
    //   );
    }





getDestination = () => {
    console.log('in here', this.props.match.params.id)
    // Axios.get(your flights)
    axios
    .get(`${baseUrl}/getBooking/${this.props.match.params.id}`)
    .then(data => {
      console.log(data);
      this.setState({data:data.data})
    })
    .catch(err => {
      console.log(err);
    });
}


    render() {
        console.log(this.props)
        console.log(this.state)
        // const { loading, userLocation } = this.state;
        const { google } = this.props;
    
        // if (loading) {
        //   return (
        //     <Loader
        //       type="Plane"
        //       color="#00BFFF"
        //       height={100}
        //       width={100}
        //       timeout={3000} //3 secs
        //       className="loader"
        //     />
        //   );
        //   //return null;
        // }
        return (
            <div>
                {/* My Trip to {this.getDestination()} */}
                <div className="hotelMap">

                        <ins className="bookingaff" data-aid="1928826" 
                                data-target_aid="1928826" data-prod="map" 
                                data-width="100%" data-height="590" data-lang="ualng" 
                                data-dest_id="0" data-dest_type="landmark" 
                                data-latitude={this.state.destinationLocation.lat} 
                                data-longitude={this.state.destinationLocation.lng} data-mwhsb="1" 
                                data-zoom="12" >
                                <a href="//www.booking.com?aid=1928826">Booking.com</a>
                        </ins>

               </div>
                
                <div className="mapDiv col">
                    <Map google={google} initialCenter={this.state.destinationLocation} zoom={10}>
                    <Marker onClick={this.onMarkerClick} name={"Current location"} />
                    {/* {this.getLocationData()} */}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                    </Map>
                </div>
            
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ"
  })(TripDashboard);

