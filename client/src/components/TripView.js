import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Layout, Collapse, Card } from 'antd';

function TripView({ user }) {
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
        console.log(flights)
        return (
            flights.map(flight => {
                return (
                    <Card title={`Direction: ${flight.leg}`}>
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

    function renderTransportation(transpo) {

    }

    console.log('Trip: ', trip);
    
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
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="Flights" key="1">
                        {trip.flights? renderFlights(trip.flights) : <p>Click edit to add a flight.</p>}
                        </Panel>
                        <Panel header="Transportation" key="2">
                        {trip.transportation? renderFlights(trip.transportation) : <p>Click edit to add a flight.</p>}
                        </Panel>
                        <Panel header="Accommodations" key="3">
                        <p>3</p>
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
                    <h1>Edit Trip</h1>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else {
        return(<div></div>)
    }
}

export default TripView