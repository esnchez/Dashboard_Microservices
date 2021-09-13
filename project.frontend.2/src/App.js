import './App.css';
import Employees from './components/Employees';
import Teams from './components/Teams';
import EmployeeForm from './components/EmployeeForm';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CompaniesList from './components/CompaniesList';



function App() {
  return (
    //<Router>
    <div className="App">
      <header className="App-header">
        <p>
        COMPANIES LIST
        </p> 
        
        <CompaniesList/>
        {/* <Teams/> */}
        {/* {<Employees/>} */}

        {/* <EmployeeForm/> */}

      </header>
    </div> 
    //</Router>
    
  );
}

export default App;
