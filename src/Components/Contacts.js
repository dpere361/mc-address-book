import React, {useState, useEffect} from 'react'
import './../assets/styles/Contacts.css'
import ContactList from './ContactList';
import SearchBar from './SearchBar';


// Contacts component for the left-hand side of the app
const Contacts = () => {
    const [filterQuery, setFilterQuery] = useState('')
    const [filterSettings, setFilterSettings] = useState([])

    return(
        <div className="contacts-container">
            <SearchBar></SearchBar>
            <ContactList/>
        </div>
    )
}

export default Contacts;