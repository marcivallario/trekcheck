import Header from './components/Header'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PassengerList from './components/PassengerList';
import PassengerAdd from './components/PassengerAdd';
import PassengerView from './components/PassengerView';
import TripList from './components/TripList';
import TripView from './components/TripView';
import TripAdd from './components/TripAdd';
import ProjectList from './components/ProjectList';
import ProjectView from './components/ProjectView';
import ProjectAdd from './components/ProjectAdd';
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from 'react';
import './styles/app.css'

function App() {
  const [ trips, setTrips ] = useState([])
  const [ projects, setProjects ] = useState([])
  const [ passengers, setPassengers ] = useState([])
  const [ user, setUser ] = useState('')

  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if (res.ok) {
        res.json().then(user => setUser(user))
      }
    })}, [])

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
  }, [user])

  if (!user) {
    return (
      <div className="App">
        <Header user ={user} setUser={setUser}/>
        <Switch>
          <Route path='/signup'>
            <Signup setUser={setUser} />
          </Route>
          <Route path='/login'>
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    ); 
  } else {
    return (
      <div className="App">
        <Switch>
          <Route path='/passengers/add'>
            <PassengerAdd />
          </Route>
           <Route exact path='/passengers/:passengerId'>
            <PassengerView />
          </Route>
          <Route path='/passengers'>
            <PassengerList passengers={passengers}/>
          </Route>
          <Route path='/trips/add'>
            <TripAdd />
          </Route>
          <Route exact path='/trips/:tripId'>
            <TripView />
          </Route>
          <Route path='/trips'>
            <TripList />
          </Route>
          <Route path='/projects/add'>
            <ProjectAdd />
          </Route>
          <Route exact path='/projects/:projectId'>
            <ProjectView />
          </Route>
          <Route path='/projects'>
            <ProjectList />
          </Route>
          <Route exact path="/">
            <Dashboard projects={projects} trips={trips} setUser={setUser}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
