import { useState } from 'react';
import '../styles/editmodal.css'

function TranspoEditModal({ setTrips, trips, toggleShow, transpo, trip, setToggle, setSelectedTranspo, setTrip, onUpdateTrip }) {
    const [ formData, setFormData ] = useState({
        trip_id: trip.id,
        direction: transpo.direction,
        date: transpo.date,
        trans_mode: transpo.trans_mode,
        confirmation: transpo.confirmation,
        notes: transpo.notes
    })   

    console.log(formData)

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleUpdate() {
        fetch(`/transportations/${transpo.id}`, {
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

    function onUpdateTrip(updatedTranspo, tripId) {
         const updatedArr = trips.map(trip => {
            if (trip.id === tripId) {
                let updatedTranspos = trip.transportations.map(transpo => {
                    if (transpo.id === updatedTranspo.id) {
                        return updatedTranspo
                    } else {
                        return transpo
                    }
                })
                trip.transportations = updatedTranspos
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
                    <h4 className="modal-title">Edit Transportation</h4>
                </div>
                <div className="modal-body">
                    <label className="edit-label" htmlFor="direction">Direction:</label>
                    <input value={formData.direction} name="direction" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="date">Date: </label>
                    <input value={formData.date} name="date" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="trans_mode">Mode:</label>
                    <input value={formData.trans_mode} name="trans_mode" onChange={handleChange}></input>

                    <label className="edit-label" htmlFor="confirmation">Confirmation:</label>
                    <input value={formData.confirmation} name="confirmation" onChange={handleChange}></input>
                    <label className="edit-label" htmlFor="notes">Notes:</label>
                    <input value={formData.notes} name="notes" onChange={handleChange}></input>
                </div>
                <div className="modal-footer">
                    <button className="trip-edit-modal"type="button"  onClick={handleUpdate}>Update</button>
                    <button className="trip-edit-modal" type="button" onClick={() => {
                        setToggle(false)
                        setSelectedTranspo({})
                        }}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default TranspoEditModal;