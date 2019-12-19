import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Loader from "react-loader-spinner";
import axios from 'axios';
import baseUrl from '../../services/configUrl'
import airports from "../../data/airports";


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
    console.log(this.props)
    document.body.appendChild(script)
    axios.get(`${baseUrl}/getBooking/${this.props.match.params.id}`, {withCredentials:true}).then(async res=>{
        console.log(res)
       await this.setState({
            bookingDetail: res.data
        }, ()=>{
            let destinationAirportCode = this.state.bookingDetail.selectedFlight.services[1].segments[0].flightSegment.departure.iataCode
            // return this.state.bookingDetail.map(res =>{
                console.log(destinationAirportCode)
                // })
                let destinationCity = airports.find(city => {
                    return city.iata_code == destinationAirportCode;
                  });
                  
                  let theDestination;
                  
                  destinationCity
                  ? (theDestination = destinationCity.city)
                  : (theDestination = destinationCity);
                  console.log(destinationCity);
                  console.log(theDestination);
                  this.setState({
                      tripDestination: destinationCity,
                      cityName: destinationCity.city,
                      cityCoords: destinationCity._geoloc
                  })
                  console.log(destinationCity)
            let link = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destinationCity.city.replace(" ", "+")}+point+of+interest&language=en&key=AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ`
        console.log(link)
        axios.post(`${baseUrl}/getmystuff`, {link:link}).then(response => {
            console.log(response.data)
            this.setState({
                attractions: response.data
            })
        })
        });
    })
   }


  getLocationData = () => {
      
    if (this.state.attractions) {
      return this.state.attractions.map((eachAttraction, i) => {
          console.log(eachAttraction)
            return (
              <Marker
                title={eachAttraction.name}
                // onMouseover={this.onMouseoverMarker}
                onClick={this.onClickOnMarker}
                name={eachAttraction.name}
                address={eachAttraction.formatted_address}
                id={eachAttraction.id}
                hours={eachAttraction.opening_hours}
                photos={eachAttraction.photos}
                place_id={eachAttraction.place_id}
                types={eachAttraction.types}
                position={{
                  lat: eachAttraction.geometry.location.lat,
                  lng: eachAttraction.geometry.location.lng
                }}
                key={i}
              />
            );
          })
    
    }
  };

  onClickOnMarker = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      clicked: true,
    });
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ&placeid=${this.state.selectedPlace.place_id}`).then(response =>{
        console.log(response)
    })
    // console.log(this.state.selectedPlace);
    //    let link = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ&placeid=${this.state.selectedPlace.place_id}`
    //    console.log(link)
    //    axios.post(`${baseUrl}/getmystuff`, {link:link}).then(response => {
    //        console.log(response.data)
//    })
  };


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
        if (!this.state.tripDestination){
            return (
                <div>Loading</div>
            )} else {
                console.log(this.state.cityCoords.lat)
            return (
                <div>
                    My Trip to {this.state.cityName}
                    <div className="hotelMap">
    
                            <ins className="bookingaff" data-aid="1928826" 
                                    data-target_aid="1928826" data-prod="map" 
                                    data-width="100%" data-height="590" data-lang="ualng" 
                                    data-dest_id="0" data-dest_type="landmark" 
                                    data-latitude={this.state.cityCoords.lat} 
                                    data-longitude={this.state.cityCoords.lng} data-mwhsb="1" 
                                    data-zoom="12" >
                                    <a href="//www.booking.com?aid=1928826">Booking.com</a>
                            </ins>
    
                   </div>
                    
                    <div className="mapDiv col">
                        <Map google={google} initialCenter={this.state.cityCoords} zoom={10}>
                        <Marker onClick={this.onMarkerClick} name={"Current location"} />
                        {this.getLocationData()}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                        >
                            <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            <h4>{this.state.selectedPlace.address}</h4>
                            {/* <p>Open now: {this.state.selectedPlace.hours}</p> */}
                            </div>
                        </InfoWindow>
                        </Map>
                    </div>
                
                </div>
            )

        }
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ"
  })(TripDashboard);
