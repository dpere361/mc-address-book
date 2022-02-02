import React, {useState, useEffect} from 'react'
import './../Assets/Styles/ContactList.css'
import {API_KEY} from '../variables'
import ContactEntry from './ContactEntry'


const mock_list = [{name: 'person'}, {name: 'person2'}, {name: 'person3'}]


// Component for the entire list of contacts in addition to options
const ContactList = () => {
  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});

  // Hook for onComponentMount
  useEffect(() => {
    getContactList()
  }, [])

  useEffect(() => {
    console.log(selectedContact)
  }, [selectedContact])

  // CLEAN THIS
  const getContactList = () => {
    fetch(`https://front-end.oudemo.com/api/address/list?apikey=${API_KEY}`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {setContactList(data.result); setSelectedContact(contactList[0])})
    .catch(err => console.log(err))
  }

  const createContact = () => {
    fetch(`https://front-end.oudemo.com/api/address/new`, {
      method: 'POST',
      body: JSON.stringify({
        apikey: API_KEY,
        firstName:"Waron",
        lastName:"Dadger",
        phone:"8055555678",
        email:"aaron@badger.com",
        address:"1320 Flynn Rd.",
        city:"Camarillo",
        state:"CA",
        zipcode:"93012"
      })
    })
    .then(res => res.json())
    .then(data => {console.log(data); getContactList()})
    .catch(err => console.log(err))
  }

  const isSelected = (contact) => {
    return (contact == selectedContact) 
  }

  return(
    <div style={{height: '85%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className="list-options-container">
        <input style={{height: '35px', fontSize: '20px'}} type='button' value="Sort" />
        <input style={{height: '35px', fontSize: '20px'}} type='button' value="Add" onClick={createContact}/>
      </div>
      <div className='list-top-separator'/>
      <div className="list-container">
        {contactList.map((contact, i) => {
          return(
            <ContactEntry key={`${i}-listitem`} i={i} contact={contact} isSelected={isSelected(contact)} setSelectedContact={setSelectedContact}/>
          )
        })}
      </div>
    </div>
  )
}

export default ContactList;