import './App.css';
import Companies2 from './components/Companies2'
import Employees from './components/Employees';
import Teams from './components/Teams';
import EmployeeForm from './components/EmployeeForm';
import { BrowserRouter as Router, Route } from 'react-router-dom'



function App() {
  return (
    //<Router>
    <div className="App">
      <header className="App-header">
        <p>
        COMPANIES LIST
        </p> 
        
        <Companies2/>
        {/* <Teams/> */}
        {/* {<Employees/>} */}

        {/* <EmployeeForm/> */}

      </header>
    </div> 
    //</Router>
    
  );
}

export default App;
