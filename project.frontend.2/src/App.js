import './App.css';

import CompaniesList from './components/CompaniesList';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
        COMPANIES DASHBOARD
        </h1> 

        <CompaniesList/>
      </header>
    </div> 
    
  );
}

export default App;
