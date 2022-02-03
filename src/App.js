import './assets/styles/App.css';
import Contacts from './components/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App-container">
      <Contacts/>
      <div className="info-container">
        <p style={{fontSize:'20px'}}>No contacts</p>
      </div>
    </div>
  );
}

export default App;
