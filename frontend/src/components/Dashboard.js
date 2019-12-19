import React, { Component } from 'react'
import Axios from 'axios'
import baseUrl from '../services/configUrl'
import {Link} from 'react-router-dom'
export default class Dashboard extends Component {
    state = {
        allBookings:[]
    }
    componentDidMount(){
        Axios.get(`${baseUrl}/getAllBookings`, {withCredentials:true}).then(res=>{
            console.log(res)
            this.setState({
                allBookings:res.data.аллбукингс
            })
        })
    }

    showBookings = () => {
        return this.state.allBookings.map(eachBooking => {
            return (<li>
                        <Link to={`/dashboard/${eachBooking._id}`}>
                        {eachBooking.firstName}
                        </Link>                        
                    </li>)
        })
    }

    render() {
        return (
            <div>
              our dashboard  
              {this.showBookings()}
            </div>
        )
    }
}
