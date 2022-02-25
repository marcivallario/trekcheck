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
  const [ user, setUser ] = useState('')

  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if (res.ok) {
        res.json().then(user => setUser(user))
      }
    })}, [])

  return (
    <div className="App">
      <Header user ={user} setUser={setUser}/>
      <Switch>
        <Route path='/signup'>
          {(!user) ? <Signup setUser={setUser} /> : <Home />}
        </Route>
        <Route path='/login'>
          {(!user) ? <Login setUser={setUser} /> : <Home />}
        </Route>
        <Route exact path="/">
          {(!user) ? <Home/> : <Dashboard />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
