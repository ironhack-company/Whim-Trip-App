import React, { Component } from 'react'
import axios from 'axios'



export default class HotelSearch extends Component {
  //   constructor() {
	// 	super();

	// 	this.state = {
	// 		flights: [],

	// 	}
	// }


  //   componentDidMount() {
  //       fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
  //           body: "grant_type=client_credentials&client_id=AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6&client_secret=PyEChDme4fGCMvzZ",
  //           headers: {
  //             "Content-Type": "application/x-www-form-urlencoded"
  //           },
  //           method: "POST"
  //         }).then(res => res.json()).then(r => {
  //           console.log(r)
  //           let token = r.access_token
      
  //           const RAPIDAPI_REQUEST_HEADERS = {
  //             'Authorization': `Bearer ${token}`
  //           };
      
  //           axios.get(RAPIDAPI_API_URL, { headers: RAPIDAPI_REQUEST_HEADERS })
  //             .then(response => {
  //               const data = response.data;
  //               console.log('data', data)
                
                
  //               this.setState({
  //                   flights: response.data,
                  

  //               });

  //             })
  //             .catch(error => {
  //               console.error('create student error', error.response)
  //               alert(JSON.stringify(error.response.data))
  //             })
  //         })
      
  //         const config = {
  //           headers: {
  //             'Content-Type': 'application/x-www-form-urlencoded'
  //           }
  //         }
      
  //         axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', {
  //           grant_type: 'client_credentials',
  //           client_id: 'AAAIgJEuGHf4LReD2lxXUiGEcrHHL5Q6',
  //           client_secret: 'PyEChDme4fGCMvzZ'
  //         }, config).then(res => {
  //           console.log(res, '?')
  //         }).catch(err => console.log(err))
      
  //         const RAPIDAPI_API_URL = `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=MIA&adults=1&radius=50&radiusUnit=KM&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true&view=FULL&sort=PRICE`;
      
  //   }

 
    render() {
        return (
            <div>

                {/* <ins class="bookingaff" data-aid="1928372" data-target_aid="1928372" data-prod="map" data-width="100%" data-height="590" data-lang="ualng" data-dest_id="0" data-dest_type="landmark" data-latitude="39.7392358" data-longitude="-104.990251" data-landmark_name="Denver" data-mwhsb="0" data-checkin="2020-01-15" data-checkout="2020-01-20" data-address="Denver, CO, USA">
                    <!-- Anything inside will go away once widget is loaded. -->
                        <a href="//www.booking.com?aid=1928372">Booking.com</a>
                </ins>
                <script type="text/javascript">
                    (function(d, sc, u) {
                      var s = d.createElement(sc), p = d.getElementsByTagName(sc)[0];
                      s.type = 'text/javascript';
                      s.async = true;
                      s.src = u + '?v=' + (+new Date());
                      p.parentNode.insertBefore(s,p);
                      })(document, 'script', '//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js');
                </script> */}
                
                
            </div>
        )
    }
}
