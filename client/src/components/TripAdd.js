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
                <div id="trip-add">
                    <h1>Add New Trip</h1>
                    <form id="add-trip-form" onSubmit={handleSubmit} >
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
                        <input className="trip-edit" type="submit" value="Add" />
                    </form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
        </Layout>
    )
}

export default TripAdd;