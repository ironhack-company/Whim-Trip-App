import React, { Component } from 'react'

export default class TripDashboard extends Component {

componentDidMount(){
    const script = document.createElement("script")
    script.src = '//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js';
    script.async = true;

    document.body.appendChild(script)
    }




getDestination = () => {
    let theDestination = this.props.location.destination
    return theDestination
}


    render() {
        console.log(this.props)
        
        return (
            <div>
                My Trip to {this.getDestination()}
                <div className="hotelMap">

                        <ins className="bookingaff" data-aid="1928826" 
                                data-target_aid="1928826" data-prod="map" 
                                data-width="100%" data-height="590" data-lang="ualng" 
                                data-dest_id="0" data-dest_type="landmark" 
                                data-latitude={this.props.location.destinationLocation.lat} 
                                data-longitude={this.props.location.destinationLocation.lng} data-mwhsb="1" 
                                data-zoom="12" >
                                <a href="//www.booking.com?aid=1928826">Booking.com</a>
                        </ins>

               </div>
            </div>
        )
    }
}


