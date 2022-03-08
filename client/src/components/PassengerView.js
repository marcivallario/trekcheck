import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import '../styles/passengerview.css'

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
    const today = new Date();

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

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }
        return new Date(dateString).toLocaleTimeString(undefined, options)
    }

    
    if (!toggleEdit && passenger.id) {
        return (
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div id="dashboard-header-content">
                        <p>{formatDate(today)}</p>
                        <p>Welcome, {user.first_name} {user.last_name}.</p>
                    </div>
                </Header>
                <Content>
                    <div id="passenger-view">
                        <h1>Passenger: {passenger.legal_first_name} {passenger.nickname? `"${passenger.nickname}"` : <></>} {passenger.legal_last_name}</h1>
                        <div id="passenger-view-details">
                            <p className="view-label">Position:</p>
                            <p>{passenger.position}</p>
                            <p className="view-label">Department:</p>
                            <p>{passenger.department}</p>
                            <p className="view-label">Cell:</p>
                            <p>{passenger.cell}</p>
                            <p className="view-label">Email:</p>
                            <p>{passenger.email}</p>
                            <p className="view-label">Date of Birth:</p>
                            <p>{passenger.dob}</p>
                            <p className="view-label">Country of Residence:</p>
                            <p>{passenger.country_of_residence}</p>
                            {passenger.country_of_residence === 'USA'? <><p className="view-label">State of Residence:</p> <p>{passenger.state_of_residence}</p></>: null}
                            <p className="view-label">Passport:</p>
                            <p>{passenger.passport}</p>
                            <p className="view-label">License #</p>
                            <p>{passenger.license}</p>
                            {passenger.tsa_precheck ? <><p className="view-label">TSA Precheck:</p> <p>{passenger.tsa_precheck}</p></>: null}
                            {passenger.global_entry ? <><p className="view-label">Global Entry:</p> <p>{passenger.global_entry}</p></>: null}
                            <p className="view-label">Seat Assignment Preferences:</p>
                            <p>{passenger.seat_assignment_pref}</p>
                        </div>
                        <button className="passenger-edit" onClick={toggleEditForm}>Edit</button>
                    </div>
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
                    <div id="passenger-edit">
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
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>TrekCheck © 2022. All Rights Reserved.</Footer>
            </Layout>
        )
    } else {
        return(<div></div>)
    }
}

export default PassengerView