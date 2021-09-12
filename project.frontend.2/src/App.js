import './App.css';
import Companies from './components/Companies'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        COMPANIES LIST
        </p>

        <table>
          <Companies/>
        </table>
      </header>
    </div>
  );
}

export default App;
