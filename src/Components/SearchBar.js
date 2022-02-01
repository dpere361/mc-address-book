import React, {useState, useEffect} from 'react'
import './../Assets/Styles/SearchBar.css'
import { FaSearch, FaCog } from 'react-icons/fa';

// Searchbar component
const SearchBar = () => {

  return(
    <div className="search-container">
      <div type='text' className="search-bar">
        <FaSearch className="search-glass"/>
        <input type='text' name="searchQuery" placeholder='Name or Email' className="search-input"/>
      </div>
      <FaCog className="search-gear"/>
    </div>
  )
}

export default SearchBar;