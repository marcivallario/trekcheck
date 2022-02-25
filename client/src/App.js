import Home from './components/Home'
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from 'react';
import './styles/app.css'

function App() {
  const [ trips, setTrips ] = useState([])
  const [ projects, setProjects ] = useState([])
  const [ user, setUser ] = useState('')

  

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
