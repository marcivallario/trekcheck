import PassengerAdd from './PassengerAdd';
import PassengerList from './PassengerList';
import PassengerView from './PassengerView';
import TripAdd from './TripAdd';
import TripList from './TripList';
import TripView from './TripView';
import ProjectAdd from './ProjectAdd';
import ProjectList from './ProjectList';
import ProjectView from './ProjectView';
import AccountOverview from './AccountOverview';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  GlobalOutlined,
  LogoutOutlined,
  IdcardOutlined,
  UserOutlined,
  FolderOpenOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo_white.png'
import "../styles/dashboard.css"

function Dashboard({ setUser, user }) {
    const [ trips, setTrips ] = useState([])
    const [ projects, setProjects ] = useState([])
    const [ passengers, setPassengers ] = useState([])
    
    const { Content, Sider } = Layout;
    const { SubMenu } = Menu;

    useEffect(() => {
        if (user.id) {
        fetch('/projects')
        .then(res => res.json())
        .then(projects => setProjects(projects))

        fetch('/passengers')
        .then(res => res.json())
        .then(passengers => setPassengers(passengers))

        fetch('/trips')
        .then(res => res.json())
        .then(trips => setTrips(trips))
        }
    }, [user.id])

    let history = useHistory();
    function handleLogout() {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(setUser(''))
        .then(history.push('/'))
    }

    function onAddPassenger(newPassenger) {
        setPassengers([...passengers, newPassenger])
        history.push('/passengers')
    }

    function onDeletePassenger(passengerIdToDelete) {
        debugger
        setPassengers(passengers.filter(passenger => passenger.id !== parseInt(passengerIdToDelete)))
    }

    function onAddTrip(newTrip) {
        setTrips([...trips, newTrip])
        history.push('/trips')
    }

    function onDeleteTrip(tripIdToDelete) {
        setTrips(trips.filter(trip => trip.id !== parseInt(tripIdToDelete)))
    }

    function onAddProject(newProject) {
        setProjects([...projects, newProject])
        history.push('/projects')
    }

    function onDeleteProject(projectIdToDelete) {
        setProjects(projects.filter(project => project.id !== parseInt(projectIdToDelete)))
    }

    function onUpdateActive(updatedProject) {
        const updatedArr = projects.map(project => {
            if (project.id === updatedProject.id) {
                return updatedProject;
            } else {
                return project;
            }
        });
        setProjects(updatedArr);
    }

    function onUpdateTrip(updatedFlight, tripId) {
         const updatedArr = trips.map(trip => {
            if (trip.id === tripId) {
                let updatedFlights = trip.flights.map(flight => {
                    if (flight.id === updatedFlight.id) {
                        return updatedFlight
                    } else {
                        return flight
                    }
                })
                trip.flights = updatedFlights
                return trip
            } else {
                return trip
            }
        })
        setTrips(updatedArr)
    }

    return (
      <div id="dashboard">
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <div className="logo">
                    <img src={logo} alt="logo"/> 
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to='/'>Dashboard</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Passengers">
                        <Menu.Item key="2"><Link to='/passengers/add'>Add Passenger</Link></Menu.Item>
                        <Menu.Item key="3"><Link to='/passengers/' >View Profiles</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<IdcardOutlined />} title="Trips">
                        <Menu.Item key="4"><Link to='/trips/add'>Add Trip</Link></Menu.Item>
                        <Menu.Item key="5"><Link to='/trips'>View Trips</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<FolderOpenOutlined />} title="Projects">
                        <Menu.Item key="6"><Link to='/projects/add'>Add Project</Link></Menu.Item>
                        <Menu.Item key="7"><Link to='/projects'>View Projects</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="8" icon={<DesktopOutlined />}>
                        <a href="https://flightaware.com/" target='_blank' rel="noreferrer">Flight Aware</a>
                    </Menu.Item>
                    <Menu.Item key="9" icon={<GlobalOutlined />}>
                        <a href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/" target='_blank' rel="noreferrer">US Travel Alerts</a>
                    </Menu.Item>
                    <Menu.Item key="10" icon={<LogoutOutlined />} onClick={handleLogout}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content>
                <Switch>
                    <Route exact path='/passenger/:passengerId'>
                        <PassengerView user={user} passengers={passengers}/>
                    </Route>
                    <Route exact path='/passengers/add'>
                        <PassengerAdd user={user} onAdd={onAddPassenger}/>
                    </Route>
                    <Route exact path='/passengers'>
                        <PassengerList user={user} passengers={passengers} onDelete={onDeletePassenger}/>
                    </Route>
                    <Route exact path='/trip/:tripId'>
                        <TripView user={user} trips={trips} onUpdateTrip={onUpdateTrip} setTrips={setTrips}/>
                    </Route>
                    <Route exact path='/trips/add'>
                        <TripAdd user={user} projects={projects} passengers={passengers} onAdd={onAddTrip}/>
                    </Route>
                    <Route exact path='/trips'>
                        <TripList user={user} trips={trips} onDelete={onDeleteTrip}/>
                    </Route>
                    <Route exact path='/project/:projectId'>
                        <ProjectView user={user} projects={projects}/>
                    </Route>
                    <Route exact path='/projects/add'>
                        <ProjectAdd user={user} onAdd={onAddProject}/>
                    </Route>
                    <Route exact path='/projects'>
                        <ProjectList user={user} projects={projects} onDelete={onDeleteProject}/>
                    </Route>
                    <Route exact path='/'>
                        <AccountOverview user={user} trips={trips} projects={projects} onUpdate={onUpdateActive}/>
                    </Route>
                </Switch>
            </Content>
        </Layout>
      </div>
    );
  }

export default Dashboard;