import { useState } from 'react';
import '../styles/editmodal.css'

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
                    <label className="edit-label" htmlFor="checkin">Checkin:</label>
                    <input value={formData.checkin} name="checkin" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="checkout">Checkout:</label>
                    <input value={formData.checkout} name="checkout" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="acc_type">Accommodation Type:</label>
                    <input value={formData.acc_type} name="acc_type" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="name">Name:</label>
                    <input value={formData.name} name="name" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="address_1">Address (line 1):</label>
                    <input value={formData.address_1} name="address_1" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="address_2">Address (line 2): </label>
                    <input name="address_2" value={formData.address_2} onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="city">City:</label>
                    <input value={formData.city} name="city" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="state">State:</label>
                    <input value={formData.state} name="state" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="zip">Zip:</label>
                    <input value={formData.zip} name="zip" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="confirmation">Confirmation #:</label>
                    <input value={formData.confirmation} name="confirmation" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="phone">Phone:</label>
                    <input value={formData.phone} name="phone" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="notes">Notes:</label>
                    <input value={formData.notes} name="notes" onChange={handleChange}></input>
                </div>
                <div className="modal-footer">
                    <button type="button" className="trip-edit-modal" onClick={handleUpdate}>Update</button>
                    <button type="button" className="trip-edit-modal" onClick={() => {
                        setToggle(false)
                        setSelectedAcc({})
                        }}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default FlightEditModal;