import { useState } from 'react';
import '../styles/flighteditmodal.css'

function FlightEditModal({ setTrips, trips, toggleShow, flight, trip, setToggle, setSelectedFlight, onUpdateTrip, setTrip }) {
    const [ formData, setFormData ] = useState({
        trip_id: trip.id,
        flight: flight.id,
        leg: flight.leg,
        airline: flight.airline,
        flight_no: flight.flight_no,
        dep_airport: flight.dep_airport,
        dep_time: flight.dep_time,
        arr_airport: flight.arr_airport,
        arr_time: flight.arr_time,
        seat: flight.seat,
        confirmation: flight.confirmation,
        notes: flight.notes
    })   

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleUpdate() {
        fetch(`/flights/${flight.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                res.json().then((data) => {
                    onUpdateTrip(data, trip.id)
                })
                setToggle(false);
            } else {
                res.json()
                .then(response => console.log(response))
            }
        })
    }

    function onUpdateTrip(updatedFlight, tripId) {
         const updatedArr = trips.map(trip => {
            if (trip.id === tripId) {
                let updatedFlights = trip.flights.map(flight => {
                    if (flight.id === updatedFlight.id) {
                        return updatedFlight
                    } else {
                        return flight
                    }
                })
                trip.flights = updatedFlights
                // debugger
                setTrip(trip)
                return trip
            } else {
                return trip
            }
        })
        setTrips(updatedArr)

    }
   
    if (!toggleShow) {
        return null
    }
    
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Edit Flight</h4>
                </div>
                <div className="modal-body">
                    <input value={formData.leg} name="leg" onChange={handleChange}></input>
                    <input value={formData.airline} name="airline" onChange={handleChange}></input>
                    <input value={formData.flight_no} name="flight_no" onChange={handleChange}></input>
                    <input value={formData.dep_airport} name="dep_airport" onChange={handleChange}></input>
                    <input value={formData.dep_time} name="dep_time" onChange={handleChange}></input>
                    <input value={formData.arr_airport} name="arr_airport" onChange={handleChange}></input>
                    <input value={formData.arr_time} name="arr_time" onChange={handleChange}></input>
                    <input value={formData.seat} name="seat" onChange={handleChange}></input>
                    <input value={formData.confirmation} name="confirmation" onChange={handleChange}></input>
                    <input value={formData.notes} name="notes" onChange={handleChange}></input>
                </div>
                <div className="modal-footer">
                    <button type="button" className="button" onClick={handleUpdate}>Update</button>
                    <button type="button" className="button" onClick={() => {
                        setToggle(false)
                        setSelectedFlight({})
                        }}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default FlightEditModal;