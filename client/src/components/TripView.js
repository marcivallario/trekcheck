import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Layout, Collapse, Card } from 'antd';
import TripEdit from './TripEdit.js';

function TripView({ trips, user, onUpdateTrip, setTrips, onUpdateTranspoTrip }) {
    const params = useParams();
    const [toggleEdit, setToggleEdit] = useState(false);
    const [ trip, setTrip ] = useState({})
    const { Header, Footer, Content } = Layout;
    const { Panel } = Collapse;

    useEffect(() => {
        if (user.id && params.tripId) {
            fetch(`/trips/${params.tripId}`)
            .then(res => res.json())
            .then(data => setTrip(data))
        }
    }, [])

    function toggleEditForm() {
        setToggleEdit(!toggleEdit);
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
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
                    </Card>
                )
            })
        )
    }

    function renderTransportation(transportations) {
        return (
            transportations.map(transpo => {
                return (
                    <Card key={transpo.id} title={transpo.direction}>
                        <p>Date: {formatDate(transpo.date)}</p>
                        <p>Method: {transpo.trans_mode}</p>
                        <p>{transpo.confirmation? `Confirmation #: ${transpo.confirmation}` : <></>}</p>
                        <p>{transpo.notes? `Notes: ${transpo.notes}` : <></>}</p>
                    </Card>
                )
            })
        )
    }

    function renderAccommodation(accommodations) {
        return (
            accommodations.map(acc=> {
                return (
                    <Card  key={acc.id} title={acc.acc_type}>
                        <p>{acc.name}</p>
                        <p>{acc.address_1}</p>
                        {acc.address_2? <p>{acc.address_2}</p> : <div></div>}
                        <p>{acc.city}, {acc.state} {acc.zip}</p>
                        <p></p>
                        <p>Checkin: {acc.checkin}</p>
                        <p>Checkout: {acc.checkout}</p>
                        <p>Confirmation #{acc.confirmation}</p>
                    </Card>
                )
            })
        )
    }

    
    
    if (!toggleEdit && trip.id) {
        return (
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>March 11th, 2022 11:19 AM. Welcome, {user.first_name} {user.last_name}.</p>
                    </div>
                </Header>
                <Content>
                    <h1>Trip: {trip.depart} — {trip.return}</h1>
                    <label htmlFor="itinerary_sent">Itinerary sent: </label>
                    <input type="checkbox" id="itinerary_sent" name="itinerary_sent" checked={trip.itinerary_sent} disabled/>
                    <p>For: {trip.passenger.legal_first_name} {trip.passenger.legal_last_name}</p>
                    <p>Position: {trip.passenger.position}</p>
                    <p>Department: {trip.passenger.department}</p>
                    <Collapse defaultActiveKey={[`${trip.flights.length > 0 ? '1' : <></>}`, `${trip.transportations.length > 0 ? '2' : <></>}`, `${trip.accommodations.length > 0 ? '3' : <></>}`]}>
                        <Panel header="Flights" key="1">
                        {trip.flights.length > 0 ? renderFlights(trip.flights) : <p>No flights.</p>}
                        </Panel>
                        <Panel header="Transportation" key="2">
                        {trip.transportations.length > 0? renderTransportation(trip.transportations) : <p>No transportations.</p>}
                        </Panel>
                        <Panel header="Accommodations" key="3">
                        {trip.accommodations.length > 0? renderAccommodation(trip.accommodations) : <p>No accommodations.</p>}
                        </Panel>
                    </Collapse>
                    <button onClick={toggleEditForm}>Edit</button>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else if (toggleEdit && trip.id) {
        return (
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>March 11th, 2022 11:19 AM. Welcome, {user.first_name} {user.last_name}.</p>
                    </div>
                </Header>
                <Content>
                    <TripEdit trip={trip} user={user} formatDate={formatDate} onUpdateTrip={onUpdateTrip} setTrip={setTrip} trips={trips} setTrips={setTrips} setToggleEdit={setToggleEdit} toggleEdit={toggleEdit} onUpdateTranspoTrip={onUpdateTranspoTrip}/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else {
        return(<div></div>)
    }
}

export default TripView