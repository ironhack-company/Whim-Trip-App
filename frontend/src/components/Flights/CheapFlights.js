


import React, { Component } from 'react'
import axios from 'axios'



export default class HotelSearch extends Component {
    state = {
        searchQuery: "",
        searchTo: "",
        flights: [],
        filteredFlights: [],
        userLocation: { lat: 32, lng: 32 },
        loading: true
      };
    
      componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
    
            this.setState({
              userLocation: { lat: latitude, lng: longitude },
              loading: false
            });
          },
          () => {
            this.setState({ loading: false });
          }
        );
      }
    

    getFlights = () => {
        //get token on mount
        console.log("getFlight!");
        fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
          body:
            "grant_type=client_credentials&client_id=AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6&client_secret=PyEChDme4fGCMvzZ",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        })
          .then(res => res.json())
          .then(r => {
            console.log(r);
            let token = r.access_token; //token comes here
            const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v1/shopping/flight-offers?origin=${this.state.searchQuery}&destination=${this.state.searchTo}&departureDate=2020-10-01&max=50`; // if you fetch in componentDidMount it returns error because there is no origin when the page is loaded
            console.log(this.state, RAPIDAPI_API_URL, "[][][[]");
            const RAPIDAPI_REQUEST_HEADERS = {
              Authorization: `Bearer ${token}` //token goes here
            };
    
            axios
              .get(RAPIDAPI_API_URL, {
                headers: RAPIDAPI_REQUEST_HEADERS
              }) //use token to get data
              .then(response => {
                const data = response.data.data;
                console.log("data", response, data.data);
    
                this.setState({
                  flights: data, //set the flights to state
                  filteredFlights: data
                });
              })
              .catch(error => {
                console.error("create student error", error.response);
              });
          });
      };

      handleInputChange = e => {
        console.log(this.state);
        this.setState({
          searchQuery: e.target.value
        });
        let filteredFlights = this.state.flights.filter((flight, i) => {
          if (
            flight.origin
              .toLowerCase()
              .includes(this.state.searchQuery.toLowerCase())
          ) {
            return flight;
          }
        });
        this.setState({
          filteredFlights: filteredFlights
        });
      };

      handleInputTo = e => {
        console.log(this.state);
        this.setState({
          searchTo: e.target.value
        });
        let filteredFlights = this.state.flights.filter((flight, i) => {
          if (
            flight.origin
              .toLowerCase()
              .includes(this.state.searchTo.toLowerCase())
          ) {
            return flight;
          }
        });
        this.setState({
          filteredFlights: filteredFlights
        });
      };

      handleSubmit = e => {
        e.preventDefault();
        this.getFlights(); //after the user told you what to
      };
    
      showFlights = () => {
        return this.state.filteredFlights.map((flight, index) => {
          console.log(flight);
          console.log(flight.offerItems[0].services[0].segments[0].flightSegment);

          return (
            <ul key={index}>
              <li>From {flight.offerItems[0].services[0].segments[0].flightSegment.departure.iataCode}</li>
              <li>To {flight.offerItems[0].services[0].segments[0].flightSegment.arrival.iataCode}</li>
              <li>Carrier {flight.offerItems[0].services[0].segments[0].flightSegment.operating.carrierCode}</li>
              <li>Duration {flight.offerItems[0].services[0].segments[0].flightSegment.duration}</li>


              <li>Price {flight.offerItems[0].price.total}  </li>
  
            </ul>
          );
        });
      };



        // componentDidMount() {
        //     fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        //         body: "grant_type=client_credentials&client_id=AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6&client_secret=PyEChDme4fGCMvzZ",
        //         headers: {
        //           "Content-Type": "application/x-www-form-urlencoded"
        //         },
        //         method: "POST"
        //       }).then(res => res.json()).then(r => {
        //         console.log(r)
        //         let token = r.access_token
          
        //         const RAPIDAPI_REQUEST_HEADERS = {
        //           'Authorization': `Bearer ${token}`
        //         };
          
        //         axios.get(RAPIDAPI_API_URL, { headers: RAPIDAPI_REQUEST_HEADERS })
        //           .then(response => {
        //             const data = response.data;
        //             console.log('data', data)
                    
                    
        //             this.setState({
        //                 flights: response.data,
                      

        //             });
    
        //           })
        //           .catch(error => {
        //             console.error('create student error', error.response)
        //             alert(JSON.stringify(error.response.data))
        //           })
        //       })
          
        //       const config = {
        //         headers: {
        //           'Content-Type': 'application/x-www-form-urlencoded'
        //         }
        //       }
          
        //       axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', {
        //         grant_type: 'client_credentials',
        //         client_id: 'AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6',
        //         client_secret: 'PyEChDme4fGCMvzZ'
        //       }, config).then(res => {
        //         console.log(res, '?')
        //       }).catch(err => console.log(err))
          
        //       const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v1/shopping/flight-offers?origin=NYC&destination=MIA&departureDate=2020-10-01&max=2`;
          
        // }
      
    

 
    render() {
        return (
            <div>
            {/* <Fragment> */}
              <div>
                <form onSubmit={this.handleSubmit}>
                  <input
                    placeholder="Input your location"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                  />
                      <input
                    placeholder="Input your location"
                    value={this.state.query}
                    onChange={this.handleInputTo}
                  />
                  <input type="submit" value="Search cheap flights" />


                </form>
              </div>
              <div>{this.showFlights()}</div>
            {/* </Fragment> */}

    
                {/* <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div> */}


          </div>
        )
    }
}