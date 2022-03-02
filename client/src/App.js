import Header from './components/Header'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from 'react';
import './styles/app.css'

function App() {
  const [ user, setUser ] = useState('')

  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if (res.ok) {
        res.json().then(user => setUser(user))
      }
    })}, [])

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
          <Route path="/">
            <Dashboard setUser={setUser} user={user}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
