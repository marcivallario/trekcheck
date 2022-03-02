import Header from './components/Header'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
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

  console.log('Trips: ', trips)

  return (
    <div className="App">
      <Switch>
        <Route path='/signup'>
          <Header user ={user} setUser={setUser}/>
          {(!user) ? <Signup setUser={setUser} /> : <div></div>}
        </Route>
        <Route path='/login'>
          <Header user ={user} setUser={setUser}/>
          {(!user) ? <Login setUser={setUser} /> : <div></div>}
        </Route>
        <Route exact path="/">
          {(!user) ? <> <Header /> <Home/> </>: <Dashboard projects={projects} trips={trips} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
