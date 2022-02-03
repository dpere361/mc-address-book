import React, {useState, useEffect} from 'react'
import './../assets/styles/ContactList.css'
import ContactEntry from './ContactEntry'
import SortMenu from './SortMenu'
import CreateContactDialogue from './CreateContactDialogue'

import DeleteButton from './DeleteButton'

// Component for the entire list of contacts in addition to options
const ContactList = ({filter, filterSettings, data, getContactList, selectedContact, setSelectedContact}) => {
  const [filteredList, setFilteredList] = useState([]) // unsorted filtered data
  const [contactList, setContactList] = useState([]); // sorted and filtered contact list
  
  // sort states
  const [sortField, setSortField] = useState('firstName'); // what field to sort by
  const [sortAscending, setSortAscending] = useState(true); // boolean state for sort direction

  const [deleting, setDeleting] = useState(false); // boolean state for if the user is deleting contacts
  const [deleteList, setDeleteList] = useState([]);

  // Retrieves initial data
  useEffect(() => {
    getContactList()
  }, [])

  useEffect(() => {
      filterContacts()
  }, [data, filter])

  useEffect(() => {
    if(filteredList)
    sortList()
  }, [filteredList, sortAscending, sortField])

  useEffect(() => {
    if(contactList.length>0)
      setSelectedContact(contactList[0]);
    cancelDelete()
  }, [contactList])

  const cancelDelete = () => {
    setDeleting(false);
    setDeleteList([]);
  }

  // Method to sort the contact list based on sort states
  const sortList = () => {
      if(filteredList){
        let listCopy = filteredList.slice();
        listCopy.sort(function(a, b) {
          if(!a[sortField])
            return 1;
          if(!b[sortField])
            return -1;

          // if sortAscending=true then a.compare(b) else b.compare(a)
          return (sortAscending ? a : b)[sortField].localeCompare((sortAscending ? b : a)[sortField]); 
        });
        setContactList(listCopy);
      }
  }

  // Filters contact data based on filterSettings
  const filterContacts = () => {
    let listCopy = data.slice();
    if(data && filter.length>1){
      let filterCopy = filter.slice().toUpperCase();
      listCopy = listCopy.filter((contact) => {
        return filterSettings.some((filter) => contact[filter]?.toUpperCase().includes(filterCopy))
      })
    }
    setFilteredList(listCopy)
  }

  // Method to check if the first letter of a contact's info is the first occurance, make it State based
  const isFirst = (contact, i) => {
      let firstOccurance=0;
    if(contactList.length > 0)
      firstOccurance = contactList.findIndex((element) => element[sortField]?.charAt(0) === contact[sortField]?.charAt(0));
    
      return (firstOccurance === i)
  }

  return(
    <div className='contact-list-container'>
      <div className="list-options-container">
        <SortMenu sortField={sortField} setSortField={setSortField} sortAscending={sortAscending} setSortAscending={setSortAscending}/>
        <div style={{display:'flex'}}>
          <DeleteButton 
            setDeleting={setDeleting} 
            deleting={deleting} 
            deleteList={deleteList} 
            setDeleteList={setDeleteList} 
            getContactList={getContactList}
          />
          <CreateContactDialogue getContactList={getContactList}/>
        </div>
      </div>
      <div className='list-top-separator'/>
      <div className="list-container">
        {contactList.map((contact, i) => {
          return(
            <ContactEntry 
              key={`${i}-listitem`}
              contact={contact} 
              selectedContact={selectedContact} 
              setSelectedContact={setSelectedContact} 
              isFirst={isFirst(contact, i)}
              deleting={deleting}
              setDeleteList={setDeleteList}
              deleteList={deleteList}
              sortField={sortField}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ContactList;