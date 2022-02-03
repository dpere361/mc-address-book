import React, {useState, useEffect} from 'react'
import './assets/styles/App.css';
import Contacts from './components/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactInfo from './components/ContactInfo';

function App() {
  const [selectedContact, setSelectedContact] = useState({}); 
  const [data, setData] = useState([]) // unsorted and unfiltered contact data

  // Retrieves contacts from the DB
  const getContactList = () => {
    setSelectedContact({})
    fetch(`https://front-end.oudemo.com/api/address/list?apikey=${process.env.REACT_APP_API_KEY}`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {setData(data.result);})
    .catch(err => console.log(err))
  }

  return (
    <div className="App-container">
      <Contacts data={data} getContactList={getContactList} selectedContact={selectedContact} setSelectedContact={setSelectedContact}/>
      <ContactInfo selectedContact={selectedContact} getContactList={getContactList}/>
    </div>
  );
}

export default App;
