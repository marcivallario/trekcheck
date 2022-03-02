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


    return (
         <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <div id="dashboard-header-content">
                    <p>March 11th, 2022 11:19 AM. Welcome, {user.first_name} {user.last_name}.</p>
                </div>
            </Header>
            <Content>
                <h1>Add New Passenger</h1>
                <form id="add-passenger-form" onSubmit={handleSubmit} >
                    <input placeholder="Legal First Name" value={formData.legal_first_name} name="legal_first_name" onChange={handleChange}></input>
                    <input placeholder="Legal Last Name" value={formData.legal_last_name} name="legal_last_name" onChange={handleChange}></input>
                    <input placeholder="Nickname (Optional)" value={formData.nickname} name="nickname" onChange={handleChange}></input>
                    <input placeholder="Position" value={formData.position} name="position" onChange={handleChange}></input>
                    <input placeholder="Department" value={formData.department} name="department" onChange={handleChange}></input>
                    <input placeholder="Cell" value={formData.cell} name="cell" onChange={handleChange}></input>
                    <input placeholder="Email" value={formData.email} name="email" onChange={handleChange}></input>
                    <input placeholder="Date of Birth" value={formData.dob} name="dob" onChange={handleChange}></input>
                    <input placeholder="Country of Residence" value={formData.country_of_residence} name="country_of_residence" onChange={handleChange}></input>
                    <input placeholder="State of Residence (if USA)" value={formData.state_of_residence} name="state_of_residence" onChange={handleChange}></input>
                    <input placeholder="Passport" value={formData.passport} name="passport" onChange={handleChange}></input>
                    <input placeholder="License Number" value={formData.license} name="license" onChange={handleChange}></input>
                    <input placeholder="TSA Precheck (optional)" value={formData.tsa_precheck} name="tsa_precheck" onChange={handleChange}></input>
                    <input placeholder="Global Entry (optional)" value={formData.global_entry} name="global_entry" onChange={handleChange}></input>
                    <input placeholder="Seat Assignment Preference" value={formData.seat_assignment_pref} name="seat_assignment_pref" onChange={handleChange}></input>
                    <input type="submit" value="Add" />
                </form>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
        </Layout>
    )
}

export default PassengerAdd;