import { Layout } from 'antd';
import { useState } from 'react';

function PassengerAdd({ user, onAdd }) {
    const { Header, Footer, Content } = Layout;
    const [ formData, setFormData ] = useState({
        user_id: user.id,
        legal_first_name: '',
        legal_last_name: '',
        nickname: '',
        position: '',
        department: '',
        cell: '',
        email: '',
        dob: '',
        country_of_residence: '',
        state_of_residence: '',
        passport: '',
        license: '',
        tsa_precheck: '',
        global_entry: '',
        seat_assignment_pref: ''
    })

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/passengers', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
            })
            .then(resp => resp.json())
            .then(newPassenger => {
                onAdd(newPassenger)
        })
    }

    const today = new Date();
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
    }


    return (
         <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <div id="dashboard-header-content">
                    <p>{formatDate(today)}</p>
                    <p>Welcome, {user.first_name} {user.last_name}.</p>
                </div>
            </Header>
            <Content>
                <div id="passenger-add">
                    <h1>Add New Passenger</h1>
                    <form id="add-passenger-form" onSubmit={handleSubmit}>
                        <label className="edit-label" htmlFor="legal_first_name">Legal First Name:</label>
                        <input value={formData.legal_first_name} placeholder="Legal First Name"name="legal_first_name" onChange={handleChange}></input>

                        <label className="edit-label" htmlFor="legal_last_name">Legal Last Name:</label>
                        <input placeholder="Legal Last Name" value={formData.legal_last_name} name="legal_last_name" onChange={handleChange}></input>

                        <label className="edit-label" htmlFor="nickname">Nickname:</label>
                        <input placeholder="Nickname (Optional)" value={formData.nickname} name="nickname" onChange={handleChange}></input>

                        <label className="edit-label" htmlFor="position">Position:</label>
                        <input placeholder="Position" value={formData.position} name="position" onChange={handleChange}></input>

                        <label className="edit-label" htmlFor="department">Department:</label>
                        <input placeholder="Department" value={formData.department} name="department" onChange={handleChange}></input>

                        <label className="edit-label" htmlFor="cell">Cell: </label>
                        <input placeholder="Cell" value={formData.cell} name="cell" onChange={handleChange}></input>

                        <label className="edit-label" htmlFor="email">Email:</label>
                        <input placeholder="Email" value={formData.email} name="email" onChange={handleChange}></input>

                        <label className="edit-label"  htmlFor="dob">Date of Birth:</label>
                        <input placeholder="Date of Birth" value={formData.dob} name="dob" onChange={handleChange}></input>

                        <label className="edit-label"  htmlFor="country_of_residence">Country of Residence:</label>
                        <input placeholder="Country of Residence" value={formData.country_of_residence} name="country_of_residence" onChange={handleChange}></input>

                        <label className="edit-label"  htmlFor="state_of_residence">State of Residence:</label>
                        <input placeholder="State of Residence (if USA)" value={formData.state_of_residence} name="state_of_residence" onChange={handleChange}></input>

                        <label className="edit-label"  htmlFor="passport">Passport:</label>
                        <input placeholder="Passport" value={formData.passport} name="passport" onChange={handleChange}></input>

                        <label className="edit-label"  htmlFor="license">License:</label>
                        <input placeholder="License Number" value={formData.license} name="license" onChange={handleChange}></input>

                        <label className="edit-label"  htmlFor="tsa_precheck">TSA Precheck:</label>
                        <input placeholder="TSA Precheck (optional)" value={formData.tsa_precheck} name="tsa_precheck" onChange={handleChange}></input>

                        <label className="edit-label"  htmlFor="global_entry">Global Entry:</label>
                        <input placeholder="Global Entry (optional)" value={formData.global_entry} name="global_entry" onChange={handleChange}></input>

                        <label className="edit-label" htmlFor="seat_assignment_pref">Seat Assignment Preference:</label>
                        <input placeholder="Seat Assignment Preference" value={formData.seat_assignment_pref} name="seat_assignment_pref" onChange={handleChange}></input>
                        <input className="passenger-add" type="submit" value="Add Passenger" />
                    </form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
        </Layout>
    )
}

export default PassengerAdd;