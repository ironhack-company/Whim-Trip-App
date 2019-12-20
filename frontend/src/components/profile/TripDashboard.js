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
        destinationLocation: {lat:0, lng:0},
        selectedPlacePhotos: []
    }

    // getBookingMap = () => {
    //     axios.get(`https://cors-anywhere.herokuapp.com/https://www.booking.com/markers_on_map?aid=1928826&aid=1928826&sid=838966a19d3a100d913be6184691289c&dest_id=0&dest_type=&sr_id=&ref=flexiproduct&limit=&stype=1&lang=en-us&ssm=1&ngp=1&sr_countrycode=&sr_lat=&sr_long=&srh=&checkin=2019-12-19&checkout=2019-12-20&guests=2&img_size=270x200&ns=1&spr=1&u=1&avl=1&tp=1&nor=1&spc=1&mdimb=1&currency=USD&rmd=1&room1=A,A;BBOX=-90.40085026562497,29.9133707093533,-90.11520573437497,30.0733428396658`)
    //         .then(res => console.log(res))
    // }


 componentDidMount(){
     //this.getBookingMap()
     //axios.get("www.booking.com?aid=1928826")
    //window.open("https://www.booking.com?aid=1928826")
    const script = document.createElement("script")
    script.src = '//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js';
    script.async = true;
    console.log(script, 'popopop')
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
            console.log(response.data.result)
            this.setState({
                selectedPlaceDetail: response.data.result
            })
            this.getPlacePhotos()
        })
        // console.log(this.state.selectedPlace);
    //    let link = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ&placeid=${this.state.selectedPlace.place_id}`
    //    console.log(link)
    //    axios.post(`${baseUrl}/getmystuff`, {link:link}).then(response => {
    //        console.log(response.data)
//    })
  };

  getPlacePhotos = () => {

      if (this.state.selectedPlaceDetail){
        var urls = []
        let promises = [] 
        this.state.selectedPlaceDetail.photos.map(eachPhoto =>{
              console.log(eachPhoto.photo_reference)
             let picID = eachPhoto.photo_reference
            promises.push(
                axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${picID}&key=AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ`)
                .then(response => {
                    let photoData = response.headers
                    console.log(photoData)
                    console.log(photoData['x-final-url'])
                    let url = photoData['x-final-url']
                    console.log(url)
                        // this.state.selectedPlacePhotos.push(url)
                        // let selectedPlacePhotos = [...this.state.selectedPlacePhotos]
                        // selectedPlacePhotos.push(url)
                        //urls.push(url)
                        return url
                })
            )
        })

        Promise.all(promises).then(urls=>{
            console.log(urls)
            this.setState({
                selectedPlacePhotos:urls
            })
        })
    

    }


}

  showPlacePhotos = () => {
    if (this.state.selectedPlacePhotos.length > 0){
        console.log(this.state.selectedPlace)
        return this.state.selectedPlacePhotos.map(eachPhoto => {
            return (
                <img src={eachPhoto}></img>
            )
        })
    }
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
                                {/* <script src="//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js"></script> */}
    
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
                            {/* <p>Rating: {this.state.selectedPlaceDetail.rating}</p> */}
                            {/* {this.getPlacePhotos} */}
                            {this.showPlacePhotos()}
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

  //https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAPuKX9G6PiHHsHz7XtcZ3whXztxa7WxIoLICeowtqU7IeVLsmECpoAc4BNeqxiVbu5NxnvF-G2osSoYlHeuW1g8PM0kcQ8VEDe6yBeyPyY4AFeZNiih59Bf7u8stkLXVEEhCcj5H4uy6zeAYyWlQxn-5KGhQCaRrSoMcy7c0w_FnYmuEyz51iyA&key=AIzaSyC_Ryd8LuP-hChe7SPdvM_naB5ofhdF2QQ