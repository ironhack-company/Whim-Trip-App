import React, { Component } from 'react';
import axios from 'axios';


export default class MyTrips extends Component {

    state = {
        location: null
    }
    componentDidMount(){
        axios.get(`http://localhost:5000${this.props.location.pathname}`)
        .then(data => {
            console.log(data)
            this.setState({
                location: data.data.location,
                start: data.data.startDate,
                end: data.data.endDate,
                pictures: data.data.pictures,
            })
        })
    }



    showPictures = () => {
        if (this.state.pictures !== undefined){
      
          return this.state.pictures.map((eachPicture, i) => {
              
            return (
              <div>   
                <li key={i} className="pictureListItem">
                      <img className='teamBadge' alt='' src={eachPicture} height='70px' width='70px'></img>
                    
                </li> 
              
            </div>
            
          );
        });
      }
      };


    showDetails = () => {
        if (this.state.location !== null){ 
            return (
             <div className="tripPage">
                <h1>{this.state.location}</h1>
                <h3>{this.state.start}-{this.state.end}</h3>
                
            </div>
            )
        }
    }
      
      
            


    render() {
        console.log(this.state)
        return (
            <div>
<h1>Here are the trip details</h1>
                {this.showDetails()}
                {this.showPictures()}

            </div>
            )
    }
}
