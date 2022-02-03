import React, {useState} from 'react'
import './../Assets/Styles/Contacts.css'
import ContactList from './ContactList';
import SearchBar from './SearchBar';

// Contacts component for the left-hand side of the app
const Contacts = ({data, getContactList, selectedContact, setSelectedContact}) => {
    const [filter, setFilter] = useState('')
    const [filterSettings, setFilterSettings] = useState(['firstName', 'lastName', 'email'])

    return(
        <div className="contacts-container">
            <SearchBar 
                filter={filter} 
                setFilter={setFilter} 
                filterSettings={filterSettings} 
                setFilterSettings={setFilterSettings}>
            </SearchBar>
            <ContactList 
                filter={filter} 
                filterSettings={filterSettings} 
                data={data} 
                getContactList={getContactList} 
                selectedContact={selectedContact} 
                setSelectedContact={setSelectedContact}
            />
        </div>
    )
}

export default Contacts;