import React, {useState, useEffect} from 'react'
import './../Assets/Styles/Contacts.css'
import SearchBar from './SearchBar';


// Contacts component for the left-hand side of the app
const Contacts = () => {
    return(
        <div className="contacts-container">
            <SearchBar></SearchBar>
        </div>
    )
}

export default Contacts;