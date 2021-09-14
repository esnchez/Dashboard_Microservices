import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import CompaniesList from './components/CompaniesList';
import Teams from './components/Teams';
import Employees from './components/Employees';




function App() {
  return (
    <Router>
      <div className="App">

        <header className="App-header">
          <h1>
            COMPANIES DASHBOARD
          </h1>
        </header>

        <Switch>
          <Route path="/companies/teams/:id" >
            <Employees/>
          </Route>
          <Route path="/companies/:id" >
            <Teams />
          </Route>
          <Route path="/companies" exact >
            <CompaniesList />
          </Route>
          <Redirect exact from="/" to="/companies" />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
