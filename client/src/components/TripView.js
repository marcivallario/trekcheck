import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Layout, Collapse, Card } from 'antd';
import TripEdit from './TripEdit.js';
import '../styles/tripview.css'

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
    
    const today = new Date();
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
    }

    const formatDateOnly = (dateString) => {
        let d = new Date(dateString)
        return (d.getMonth()+1)+'/'+d.getDate()+'/'+ d.getFullYear();
    }

    function renderFlights(flights) {
        return (
            flights.map(flight => {
                return (
                    <Card key={flight.id} title={flight.leg}>
                        <div className="trip-detail-card">
                            <p className="trip-view-label">Flight:</p>
                            <p>{flight.airline} {flight.flight_no}</p>

                            <p className="trip-view-label">Departs:</p>
                            <p>{flight.dep_airport} @ {formatDate(flight.dep_time)}</p>

                            <p className="trip-view-label">Arrives:</p>
                            <p>{flight.arr_airport} @ {formatDate(flight.arr_time)}</p>

                            <p className="trip-view-label">Seat:</p>
                            <p>{flight.seat}</p>

                            <p className="trip-view-label">Confirmation:</p>
                            <p> {flight.confirmation}</p>
                            {flight.notes? <><p className="trip-view-label">Notes:</p><p>{flight.notes}</p> </>: null}
                        </div>
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
                        <div className="trip-detail-card">
                            <p className="trip-view-label">Date:</p>
                            <p>{formatDate(transpo.date)}</p>

                            <p className="trip-view-label">Method:</p>
                            <p>{transpo.trans_mode}</p>

                            {transpo.confirmation? <><p className="trip-view-label">Confirmation #:</p><p>{transpo.confirmation}</p></>: null}

                            {transpo.notes? <><p className="trip-view-label">Notes:</p><p>{transpo.notes}</p></>: null}
                        </div>
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
                        <div className="trip-detail-card">
                            <p className="trip-view-label">Name: </p>
                            <p>{acc.name}</p>
                            
                            <p className="trip-view-label">Address:</p>
                            <div>
                                <p>{acc.address_1}</p>
                                {acc.address_2? <p>{acc.address_2}</p> : null}
                                <p>{acc.city}, {acc.state} {acc.zip}</p>
                            </div>
                            

                            <p className="trip-view-label">Phone: </p>
                            <p>{acc.phone}</p>
                            
                            <p className="trip-view-label">Checkin:</p>
                            <p>{formatDate(acc.checkin)}</p>

                            <p className="trip-view-label">Checkout:</p>
                            <p>{formatDate(acc.checkout)}</p>

                            <p className="trip-view-label">Confirmation #:</p>
                            <p>{acc.confirmation}</p>
                        </div>
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
                    <p>{formatDate(today)}</p>
                    <p>Welcome, {user.first_name} {user.last_name}.</p>
                </div>
            </Header>
                <Content>
                    <div id="trip-view">
                        <h1>Trip: {formatDateOnly(trip.depart)} — {formatDateOnly(trip.return)}</h1>
                        <div id="trip-view-details">
                            <p className="trip-view-label">For:</p>
                            <p>{trip.passenger.legal_first_name} {trip.passenger.legal_last_name}</p>

                            <p className="trip-view-label">Position:</p>
                            <p>{trip.passenger.position}</p>

                            <p className="trip-view-label">Department:</p>
                            <p>{trip.passenger.department}</p>

                            <label className="trip-view-label" htmlFor="itinerary_sent">Itinerary sent: </label>
                            <input type="checkbox" id="itinerary_sent" name="itinerary_sent" checked={trip.itinerary_sent} disabled/>
                        </div>

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
                        <button className="trip-edit" onClick={toggleEditForm}>Edit</button>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else if (toggleEdit && trip.id) {
        return (
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>{formatDate(today)}</p>
                        <p>Welcome, {user.first_name} {user.last_name}.</p>
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