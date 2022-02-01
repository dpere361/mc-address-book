import './Assets/Styles/App.css';
import Contacts from './Components/Contacts';

function App() {
  return (
    <div className="App-container">
      <Contacts/>
      <div style={{color: 'white'}} className="info-container">
        <p style={{fontSize:'20px'}}>No contacts :(</p>
      </div>
    </div>
  );
}

export default App;
