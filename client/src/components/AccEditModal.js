import { useState } from 'react';
import '../styles/flighteditmodal.css'

function FlightEditModal({ setTrips, trips, toggleShow, acc, trip, setToggle, setSelectedAcc, onUpdateTrip, setTrip }) {
    const [ formData, setFormData ] = useState({
        trip_id: trip.id,
        id: acc.id,
        checkin: acc.checkin,
        checkout: acc.checkout,
        acc_type: acc.acc_type,
        name: acc.name,
        address_1: acc.address_1,
        address_2: acc.address_2,
        city: acc.city,
        state: acc.state,
        zip: acc.zip,
        confirmation: acc.confirmation,
        phone: acc.phone,
        notes: acc.notes
    })   

    console.log(acc)

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleUpdate() {
        fetch(`/accommodations/${acc.id}`, {
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

    function onUpdateTrip(updatedAcc, tripId) {
         const updatedArr = trips.map(trip => {
            if (trip.id === tripId) {
                let updatedAccs = trip.accommodations.map(accom => {
                    if (accom.id === updatedAcc.id) {
                        return updatedAcc
                    } else {
                        return accom
                    }
                })
                trip.accommodations = updatedAccs
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
                    <h4 className="modal-title">Edit Accommodation</h4>
                </div>
                <div className="modal-body">
                    <input value={formData.checkin} name="checkin" onChange={handleChange}></input>
                    <input value={formData.checkout} name="checkout" onChange={handleChange}></input>
                    <input value={formData.acc_type} name="acc_type" onChange={handleChange}></input>
                    <input value={formData.name} name="name" onChange={handleChange}></input>
                    <input value={formData.address_1} name="address_1" onChange={handleChange}></input>
                    <input value={formData.address_2} onChange={handleChange}></input>
                    <input value={formData.city} name="city" onChange={handleChange}></input>
                    <input value={formData.state} name="state" onChange={handleChange}></input>
                    <input value={formData.zip} name="zip" onChange={handleChange}></input>
                    <input value={formData.confirmation} name="confirmation" onChange={handleChange}></input>
                    <input value={formData.phone} name="phone" onChange={handleChange}></input>
                    <input value={formData.notes} name="notes" onChange={handleChange}></input>
                </div>
                <div className="modal-footer">
                    <button type="button" className="button" onClick={handleUpdate}>Update</button>
                    <button type="button" className="button" onClick={() => {
                        setToggle(false)
                        setSelectedAcc({})
                        }}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default FlightEditModal;