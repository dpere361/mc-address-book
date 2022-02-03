import React, {useState, useEffect} from 'react'
import './../assets/styles/Contacts.css'
import ContactList from './ContactList';
import SearchBar from './SearchBar';


// Contacts component for the left-hand side of the app
const Contacts = () => {
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
            <ContactList filter={filter} filterSettings={filterSettings}/>
        </div>
    )
}

export default Contacts;