import { useState, useEffect } from 'react';
import { Layout, Collapse, Card } from 'antd';
import FlightEditModal from './FlightEditModal';
import TranspoEditModal from './TranspoEditModal';
import AccEditModal from './AccEditModal';

    const { Panel } = Collapse;

function TripEdit({ trips, trip, user, formatDate, onUpdateTrip, setTrip, setTrips, setToggleEdit, toggleEdit, onUpdateTranspoTrip }) {
    const [ formData, setFormData ] = useState({
        user_id: user.id,
        depart: '',
        return: '',
        itinerary_sent: false
    })
    const [ toggleFlightEdit, setToggleFlightEdit ] = useState(false);
    const [ selectedFlight, setSelectedFlight ] = useState({});
    const [ toggleTranspoEdit, setToggleTranspoEdit ] = useState(false);
    const [ selectedTranspo, setSelectedTranspo ] = useState({});
    const [ toggleAccEdit, setToggleAccEdit ] = useState(false);
    const [ selectedAcc, setSelectedAcc ] = useState({});

    useEffect(() => {
        setFormData({
            user_id: user.id,
            depart: trip.depart,
            return: trip.return,
            itinerary_sent: trip.itinerary_sent,
        })
    }, [])

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleCheckedChange(e) {
        const key = e.target.name;
        const value = e.target.checked;
        setFormData({...formData, [key]: value})
    }

   function handleUpdate() {

        fetch(`/trips/${trip.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }) 
        .then(res => {
            if (res.ok) {
                res.json().then(updatedTrip => {
                    setToggleEdit(!toggleEdit)
                    setTrip(updatedTrip);
                })
            } else {
                res.json()
                .then(response => console.log(response))
            }
        })
    }


    function renderTranspo(transportations) {
        return (
            transportations.map(transpo => {
                return (
                    <Card key={transpo.id} title={transpo.direction}>
                        <p>Date: {formatDate(transpo.date)}</p>
                        <p>Method: {transpo.trans_mode}</p>
                        <p>{transpo.confirmation? `Confirmation #: ${transpo.confirmation}` : <></>}</p>
                        <p>{transpo.notes? `Notes: ${transpo.notes}` : null }</p>
                        <button type="button" onClick={() => {
                            setToggleTranspoEdit(true)
                            setSelectedTranspo(transpo)
                            }}>Edit Transportation</button>
                    </Card>
                )
            })
        )
    }

    function renderAccommodations(accommodations) {
        return (
            accommodations.map(acc=> {
                return (
                    <Card  key={acc.id} title={acc.acc_type}>
                        <p>{acc.name}</p>
                        <p>{acc.address_1}</p>
                        {acc.address_2? <p>{acc.address_2}</p> : <div></div>}
                        <p>{acc.city}, {acc.state} {acc.zip}</p>
                        <p></p>
                        <p>Checkin: {formatDate(acc.checkin)}</p>
                        <p>Checkout: {formatDate(acc.checkout)}</p>
                        <p>Confirmation #{acc.confirmation}</p>
                        <button type="button" onClick={() => {
                            setToggleAccEdit(true)
                            setSelectedAcc(acc)
                            }}>Edit Accommodation</button>
                    </Card>
                )
            })
        )
    }

    function renderFlights(flights) {
        return (
            flights.map(flight => {
                return (
                    <Card key={flight.id} title={flight.leg}>
                        <p>Flight: {flight.airline} {flight.flight_no}</p>
                        <p>Departs: {flight.dep_airport} @ {formatDate(flight.dep_time)}</p>
                        <p>Arrives: {flight.arr_airport} @ {formatDate(flight.arr_time)}</p>
                        <p>Seat: {flight.seat}</p>
                        <p>Confirmation: {flight.confirmation}</p>
                        {flight.notes? <p>Notes: {flight.notes}</p> : <></>}
                        <button type="button" onClick={() => {
                            setToggleFlightEdit(true)
                            setSelectedFlight(flight)
                            }}>Edit Flight</button>
                    </Card>
                )
            })
        )
    }

    return (
        <div>
            <h1>Edit Trip</h1>
            <form id="edit-trip" onSubmit={handleUpdate}>
                <input value={formData.depart} name="depart" onChange={handleChange}></input>
                <input value={formData.return} name="return" onChange={handleChange}></input>
                <label htmlFor="itinerary_sent">Itinerary sent?</label>
                <input type="checkbox" id="itinerary_sent" name="itinerary_sent" checked={formData.itinerary_sent} onChange={handleCheckedChange}/>
                <Collapse defaultActiveKey={[`${trip.flights.length > 0 ? '1' : <></>}`, `${trip.transportations.length > 0 ? '2' : <></>}`, `${trip.accommodations.length > 0 ? '3' : <></>}`]}>
                    <Panel header="Flights" key="1">
                    {trip.flights.length > 0? renderFlights(trip.flights) : <p>No flights on this trip!</p>/* <button>Add Flight</button>*/}
                    </Panel>
                    <Panel header="Transportation" key="2">
                    {trip.transportations.length > 0? renderTranspo(trip.transportations) : <p>No transportations on this trip!</p>}
                    </Panel>
                    <Panel header="Accommodations" key="3">
                    {trip.accommodations.length > 0? renderAccommodations(trip.accommodations) : <p>No accommodations on this trip!</p>}
                    </Panel>
                </Collapse>
                <input type="submit" value="Save Changes"/>
                {!!Object.values(selectedFlight).length && <FlightEditModal toggleShow={toggleFlightEdit} flight={selectedFlight} trip={trip} setToggle={setToggleFlightEdit} setSelectedFlight={setSelectedFlight} onUpdateTrip={onUpdateTrip} setTrip={setTrip} trips={trips} setTrips={setTrips}/>}

                {!!Object.values(selectedTranspo).length && <TranspoEditModal toggleShow={toggleTranspoEdit} transpo={selectedTranspo} trip={trip} setToggle={setToggleTranspoEdit} setSelectedTranspo={setSelectedTranspo} setTrip={setTrip} trips={trips} setTrips={setTrips}/>}

                {!!Object.values(selectedAcc).length && <AccEditModal toggleShow={toggleAccEdit} acc={selectedAcc} trip={trip} setToggle={setToggleAccEdit} setSelectedAcc={setSelectedAcc} setTrip={setTrip} trips={trips} setTrips={setTrips}/>}
            </form>
            
        </div>
    )

}

export default TripEdit;

    

