import { Layout } from 'antd';
import { useState } from 'react';
import "../styles/tripview.css";


function TripAdd({ user, projects, passengers, onAdd }) {
const { Header, Footer, Content } = Layout;
    const [ formData, setFormData ] = useState({
        user_id: user.id,
        depart: '',
        return: '',
        itinerary_sent: false,
        project_id: 0,
        passenger_id: 0
    })
    const [ flightFormData, setFlightFormData ] = useState([]) 
    const [ transpoFormData, setTranspoFormData ] = useState([]) 
    const [ accFormData, setAccFormData ] = useState([]) 

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleDropdownChange(e) {
        const key = e.target.name;
        const value = parseInt(e.target.value);
        setFormData({...formData, [key]: value})
    }

    function handleCheckedChange(e) {
        const key = e.target.name;
        const value = e.target.checked;
        setFormData({...formData, [key]: value})
    }

    function handleFlightChange(e) {
        const updatedFlights = [...flightFormData];
        updatedFlights[e.target.dataset.idx][e.target.name] = e.target.value;
        setFlightFormData(updatedFlights);
    }

    function handleTranspoChange(e) {
        const updatedTranspo = [...transpoFormData];
        updatedTranspo[e.target.dataset.idx][e.target.name] = e.target.value;
        setTranspoFormData(updatedTranspo);
    }

    function handleAccChange(e) {
        const updatedAcc = [...accFormData];
        updatedAcc[e.target.dataset.idx][e.target.name] = e.target.value;
        setAccFormData(updatedAcc);
    }

    function AddAnotherFlight(e) {
        setFlightFormData([...flightFormData, {
            leg: '',
            airline: '',
            flight_no: '',
            dep_airport: '',
            dep_time: '',
            arr_airport: '',
            arr_time: '',
            seat: '',
            confirmation: '',
            notes: ''
        }])
    }

    function AddAnotherTranspo(e) {
        setTranspoFormData([...transpoFormData, {
            direction: '',
            date: '',
            trans_mode: '',
            confirmation: '',
            notes: ''
        }])
    }

    function AddAnotherAcc(e) {
        setAccFormData([...accFormData, {
            checkin: '',
            checkout: '',
            acc_type: '',
            name: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            zip: '',
            confirmation: '',
            phone: '',
            notes: ''
        }])
    }

    console.log('Acc Form Data: ', accFormData)

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/trips', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
            })
        .then(resp => resp.json())
        .then(newTrip => {
            if (flightFormData.length > 0) {
                const updatedFlightAdds = flightFormData.map(flight => {
                    flight.trip_id = newTrip.id
                    return flight
                })
                updatedFlightAdds.forEach(flight => {
                    fetch('/flights', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(flight)
                    }).then(resp => resp.json())
                    .then(newFlight => {
                        console.log('submitted')
                    })
                })
            }
            
            if (transpoFormData.length > 0) {
                const updatedTranspoAdds = transpoFormData.map(transpo => {
                    transpo.trip_id = newTrip.id
                    return transpo
                })
                updatedTranspoAdds.forEach(transpo => {
                    fetch('/transportations', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(transpo)
                    }).then(resp => resp.json())
                    .then(newTranspo => {
                        console.log('submitted')
                    })
                })
            }

            if (accFormData.length > 0) {
                const updatedAccAdds = accFormData.map(acc => {
                    acc.trip_id = newTrip.id
                    return acc
                })
                updatedAccAdds.forEach(acc => {
                    fetch('/accommodations', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(acc)
                    }).then(resp => resp.json())
                    .then(newAcc => {
                        console.log('submitted')
                    })
                })
            }
            
            onAdd(newTrip)  
        })
    }

    function passengerOptions() {
        let options = passengers.map(passenger => {
            return <option key={passenger.id} value={parseInt(passenger.id)}>{passenger.legal_first_name} {passenger.legal_last_name}</option>
        })
        return options
    }

    function projectOptions() {
        let options = projects.map(project => {
            return <option key={project.id} value={project.id}>#{project.job_no} {project.client} "{project.job_name}"</option>
        })
        return options
    }

    return (
         <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <div id="dashboard-header-content">
                    <p>March 11th, 2022 11:19 AM. Welcome, {user.first_name} {user.last_name}.</p>
                </div>
            </Header>
            <Content>
                <div id="trip-add-section">
                    <h1>Add New Trip</h1>
                    <form id="add-trip-form" onSubmit={handleSubmit} >
                        <div id="trip-add">
                            <label className="edit-label" htmlFor="passenger_id">Passenger:</label>
                            <select value={(formData.passenger_id)} name="passenger_id" onChange={handleDropdownChange}>
                                <option value={0} disabled hidden>Choose a Passenger</option>
                                {passengerOptions()}
                            </select>

                            <label className="edit-label" htmlFor="project_id">Project:</label>
                            <select value={(formData.project_id)} name="project_id" id="select-project" onChange={handleDropdownChange}>
                                <option value={0} disabled hidden>Choose a Project</option>
                                {projectOptions()}
                            </select>

                            <label className="edit-label" htmlFor="depart">Depart:</label>
                            <input placeholder="Depart" value={formData.depart} name="depart" onChange={handleChange}></input>

                            <label className="edit-label" htmlFor="return">Return:</label>
                            <input placeholder="Return" value={formData.return} name="return" onChange={handleChange}></input>

                            <label className="edit-label" htmlFor="itinerary_sent">Itinerary sent?</label>
                            <input type="checkbox" id="itinerary_sent" name="itinerary_sent" checked={formData.itinerary_sent} onChange={handleCheckedChange}/>
                        </div>
                        {
                            flightFormData.map((flight, idx) => {
                                return (
                                    <div key={idx}>
                                        <h3 className="add-new">New Flight</h3>
                                        <div className="flight-add">
                                            <label className="edit-label" htmlFor="leg">Leg:</label>
                                            <input data-idx={idx} value={flightFormData[idx].leg} name="leg" onChange={handleFlightChange}></input>

                                            <label className="edit-label" htmlFor="airline">Airline:</label>
                                            <input data-idx={idx} value={flightFormData[idx].airline} name="airline" onChange={handleFlightChange}></input>

                                            <label className="edit-label" htmlFor="flight_no">Flight #:</label>
                                            <input data-idx={idx} value={flightFormData[idx].flight_no} name="flight_no" onChange={handleFlightChange}></input>

                                            <label className="edit-label" htmlFor="dep_airport">Departure Airport</label>
                                            <input data-idx={idx} value={flightFormData[idx].dep_airport} name="dep_airport" onChange={handleFlightChange}></input>

                                            <label className="edit-label" htmlFor="dep_time">Departure Date/Time:</label>
                                            <input data-idx={idx} value={flightFormData[idx].dep_time} name="dep_time" onChange={handleFlightChange}></input>

                                            <label className="edit-label" htmlFor="arr_airport">Arrival Airport:</label>
                                            <input data-idx={idx} value={flightFormData[idx].arr_airport} name="arr_airport" onChange={handleFlightChange}></input>

                                            <label className="edit-label" htmlFor="arr_time">Arrival Date/Time:</label>
                                            <input data-idx={idx} value={flightFormData.arr_time} name="arr_time" onChange={handleFlightChange}></input>

                                            <label className="edit-label" htmlFor="seat">Seat Assignment: </label>
                                            <input data-idx={idx} value={flightFormData.seat} name="seat" onChange={handleFlightChange}></input>

                                            <label className="edit-label" htmlFor="confirmation">Confirmation #:</label>
                                            <input data-idx={idx} value={flightFormData.confirmation} name="confirmation" onChange={handleFlightChange}></input>

                                            <label className="edit-label" htmlFor="notes">Notes:</label>
                                            <input data-idx={idx} value={flightFormData.notes} name="notes" onChange={handleFlightChange}></input>
                                        </div>
                                    </div>
                                );      
                            })
                        }
                        <input className="trip-edit" type="button" value="Add Flight" onClick={AddAnotherFlight}/>
                        {
                            transpoFormData.map((transpo, idx) => {
                                return (
                                    <div key={idx}>
                                        <h3 className="add-new">New Transportation</h3>
                                        <div className="transpo-add">
                                            <label className="edit-label" htmlFor="direction">Direction:</label>
                                            <input data-idx={idx} value={transpoFormData.direction} name="direction" onChange={handleTranspoChange}></input>

                                            <label className="edit-label" htmlFor="date">Date: </label>
                                            <input data-idx={idx} value={transpoFormData.date} name="date" onChange={handleTranspoChange}></input>

                                            <label className="edit-label" htmlFor="trans_mode">Mode:</label>
                                            <input data-idx={idx} value={transpoFormData.trans_mode} name="trans_mode" onChange={handleTranspoChange}></input>

                                            <label className="edit-label" htmlFor="confirmation">Confirmation:</label>
                                            <input data-idx={idx} value={transpoFormData.confirmation} name="confirmation" onChange={handleTranspoChange}></input>

                                            <label className="edit-label" htmlFor="notes">Notes:</label>
                                            <input data-idx={idx} value={transpoFormData.notes} name="notes" onChange={handleTranspoChange}></input>
                                        </div>
                                    </div>
                                );      
                            })
                        }
                        <input className="trip-edit" type="button" value="Add Transpo" onClick={AddAnotherTranspo}/>
                        {
                            accFormData.map((acc, idx) => {
                                return (
                                    <div key={idx}>
                                        <h3 className="add-new">New Accommodation</h3>
                                        <div className="acc-add">
                                            <label className="edit-label" htmlFor="checkin">Checkin:</label>
                                            <input data-idx={idx} value={accFormData.checkin} name="checkin" onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="checkout">Checkout:</label>
                                            <input data-idx={idx} value={accFormData.checkout} name="checkout" onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="acc_type">Accommodation Type:</label>
                                            <input data-idx={idx} value={accFormData.acc_type} name="acc_type" onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="name">Name:</label>
                                            <input data-idx={idx} value={accFormData.name} name="name" onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="address_1">Address (line 1):</label>
                                            <input data-idx={idx} value={accFormData.address_1} name="address_1" onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="address_2">Address (line 2): </label>
                                            <input data-idx={idx} name="address_2" value={accFormData.address_2} onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="city">City:</label>
                                            <input data-idx={idx} value={accFormData.city} name="city" onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="state">State:</label>
                                            <input data-idx={idx} value={accFormData.state} name="state" onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="zip">Zip:</label>
                                            <input data-idx={idx} value={accFormData.zip} name="zip" onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="confirmation">Confirmation #:</label>
                                            <input data-idx={idx} value={accFormData.confirmation} name="confirmation" onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="phone">Phone:</label>
                                            <input data-idx={idx} value={accFormData.phone} name="phone" onChange={handleAccChange}></input>

                                            <label className="edit-label" htmlFor="notes">Notes:</label>
                                            <input data-idx={idx} value={accFormData.notes} name="notes" onChange={handleAccChange}></input>
                                        </div>
                                    </div>
                                );      
                            })
                        }
                        <input className="trip-edit" type="button" value="Add Accommodation" onClick={AddAnotherAcc}/>
                        <input className="trip-edit" type="submit" value="Save" />
                    </form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
        </Layout>
    )
}

export default TripAdd;