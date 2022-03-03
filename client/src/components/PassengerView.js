import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Layout } from 'antd';

function PassengerView({ user, passengers }) {
    const params = useParams();
    const [toggleEdit, setToggleEdit] = useState(false);
    const [ passenger, setPassenger ] = useState({})
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
    const { Header, Footer, Content } = Layout;

    useEffect(() => {
        if (user.id && params.passengerId) {
            fetch(`/passengers/${params.passengerId}`)
            .then(res => res.json())
            .then(data => setPassenger(data))
        }
    }, [])

    useEffect(() => {
        setFormData({
            user_id: user.id,
            legal_first_name: passenger.legal_first_name,
            legal_last_name: passenger.legal_last_name,
            nickname:  passenger.nickname,
            position:  passenger.position,
            department:  passenger.department,
            cell:  passenger.cell,
            email:  passenger.email,
            dob:  passenger.dob,
            country_of_residence:  passenger.country_of_residence,
            state_of_residence:  passenger.state_of_residence,
            passport:  passenger.passport,
            license:  passenger.license,
            tsa_precheck:  passenger.tsa_precheck,
            global_entry:  passenger.global_entry,
            seat_assignment_pref:  passenger.seat_assignment_pref
        })
    }, [passenger, user.id])

    function toggleEditForm() {
        setToggleEdit(!toggleEdit);
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({...formData, [key]: value})
    }

    function handleUpdate() {
        fetch(`/passengers/${passenger.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(updatedPassenger => {
                    setToggleEdit(!toggleEdit)
                    setPassenger(updatedPassenger);
                })
            } else {
                res.json()
                .then(response => console.log(response))
            }
        })
    }

    
    if (!toggleEdit && passenger.id) {
        return (
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>March 11th, 2022 11:19 AM. Welcome, {user.first_name} {user.last_name}.</p>
                    </div>
                </Header>
                <Content>
                    <h1>Passenger: {passenger.legal_first_name} {passenger.nickname? `"${passenger.nickname}"` : <></>} {passenger.legal_last_name}</h1>
                    <p>Position: {passenger.position}</p>
                    <p>Department: {passenger.department}</p>
                    <p>Cell: {passenger.cell}</p>
                    <p>Email: {passenger.email}</p>
                    <p>Date of Birth: {passenger.dob}</p>
                    <p>Country of Residence: {passenger.country_of_residence}</p>
                    {passenger.country_of_residence === 'USA'? <p>State of Residence: {passenger.state_of_residence}</p> : <></>}
                    <p>Passport: {passenger.passport}</p>
                    <p>License #: {passenger.license}</p>
                    {passenger.tsa_precheck ? <p>TSA Precheck: {passenger.tsa_precheck}</p> : <></>}
                    {passenger.global_entry ? <p>Global Entry: {passenger.global_entry}</p> : <></>}
                    <p>Seat Assignment Preferences: {passenger.seat_assignment_pref}</p>
                    <button onClick={toggleEditForm}>Edit</button>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else if (toggleEdit && passenger.id) {
        return (
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>March 11th, 2022 11:19 AM. Welcome, {user.first_name} {user.last_name}.</p>
                    </div>
                </Header>
                <Content>
                    <h1>Edit Passenger</h1>
                    <form id="add-passenger-form" onSubmit={handleUpdate}>
                        <input value={formData.legal_first_name} name="legal_first_name" onChange={handleChange}></input>
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
                        <input type="submit" value="Save Changes" />
                    </form>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else {
        return(<div></div>)
    }
}

export default PassengerView