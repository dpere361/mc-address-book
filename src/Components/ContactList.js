import React, {useState, useEffect} from 'react'
import './../assets/styles/ContactList.css'
import {API_KEY} from '../variables'
import ContactEntry from './ContactEntry'


// Component for the entire list of contacts in addition to options
const ContactList = () => {
  const [contactList, setContactList] = useState([]);
  const [sorted, setSorted] = useState(false)
  const [selectedContact, setSelectedContact] = useState({});

  // Hook for onComponentMount
  useEffect(() => {
    getContactList()
  }, [])

  useEffect(() => {
    if(sorted && contactList.length>0)
      setSelectedContact(contactList[0])
  }, [contactList])

  useEffect(() => {
    if(!sorted)
      sortList()
  }, [sorted])

  // CLEAN THIS
  const getContactList = () => {
    fetch(`https://front-end.oudemo.com/api/address/list?apikey=${API_KEY}`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {setContactList(data.result); setSorted(false)})
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

  // Works only if both pointers point to the same location
  const isSelected = (contact) => {
    return (contact === selectedContact) 
  }

  const sortList = () => {
    let listCopy = contactList.slice();
    listCopy.sort(function(a, b) {
      return a.firstName.localeCompare(b.firstName);
    });
    setContactList(listCopy);
    setSorted(true);
  }

  // Clean this
  const isFirst = (contact, i) => {
    let indexOfFirst = contactList.findIndex((element) => element.firstName.charAt(0) === contact.firstName.charAt(0))
    if(indexOfFirst == i)
      return true
  }

  return(
    <div style={{height: '85%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className="list-options-container">
        <div className="sort-container">
          <p className="sort-heading">Sort By: </p>
          <div className='sort-link'>First Name</div>
          <div className='sort-arrow'>V</div>
        </div>
        
        <div className='sort-arrow' onClick={createContact}>V</div>
      </div>
      <div className='list-top-separator'/>
      <div className="list-container">
        {contactList.map((contact, i) => {
          return(
            <ContactEntry key={`${i}-listitem`} i={i} contact={contact} isSelected={isSelected(contact)} setSelectedContact={setSelectedContact} isFirst={isFirst(contact, i)}/>
          )
        })}
      </div>
    </div>
  )
}

export default ContactList;