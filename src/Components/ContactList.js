import React, {useState, useEffect} from 'react'
import './../assets/styles/ContactList.css'
import {API_KEY} from '../variables' // Make an ENV variable
import ContactEntry from './ContactEntry'
import SortMenu from './SortMenu'
import CreateContactDialogue from './CreateContactDialogue'

// Component for the entire list of contacts in addition to options
const ContactList = () => {
  const [data, setData] = useState([]) // unsorted contact data
  const [contactList, setContactList] = useState([]); // sorted contact list
  const [selectedContact, setSelectedContact] = useState({});
  // sort states
  const [sorted, setSorted] = useState(false) // Whether contactList is sorted or not
  const [sortField, setSortField] = useState('firstName'); // what field to sort by
  const [sortAscending, setSortAscending] = useState(true); // boolean state for sort direction

  // Retrieves initial data
  useEffect(() => {
    getContactList()
  }, [])

  useEffect(() => {
    setSorted(false)
  }, [data, sortAscending, sortField])

  useEffect(() => {
    if(sorted && contactList.length>0)
      setSelectedContact(contactList[0]);
  }, [contactList])

  useEffect(() => {
    if(!sorted)
      sortList();
  }, [sorted])

  // CLEAN THIS also move it
  const getContactList = () => {
    fetch(`https://front-end.oudemo.com/api/address/list?apikey=${API_KEY}`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => setData(data.result))
    .catch(err => console.log(err))
  }

  

  // Works only if both pointers point to the same object (Does not compare the actual objects)
  const isSelected = (contact) => {
    return (contact === selectedContact); 
  }

  // Method to sort the contact list based on sort states
  const sortList = () => {
    let listCopy = data.slice();

    listCopy.sort(function(a, b) {
      if(!a[sortField] || !b[sortField])
        return -1;

      // if sortAscending=true then a.compare(b) else b.compare(a)
      return (sortAscending ? a : b)[sortField].localeCompare((sortAscending ? b : a)[sortField]); 
    });
    setContactList(listCopy);
    setSorted(true);
  }

  // Clean this
  const isFirst = (contact, i) => {
    let firstOccurance = contactList.findIndex((element) => element.firstName.charAt(0) === contact.firstName.charAt(0));
    return (firstOccurance === i);
  }

  return(
    <div className='contact-list-container'>
      <div className="list-options-container">
        <SortMenu sortField={sortField} setSortField={setSortField} sortAscending={sortAscending} setSortAscending={setSortAscending}/>
        <CreateContactDialogue getContactList={getContactList}/>
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