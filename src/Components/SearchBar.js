import React, {useState, useEffect} from 'react'
import './../assets/styles/SearchBar.css'
import { FaSearch, FaCog } from 'react-icons/fa';

// Searchbar component
const SearchBar = ({filter, setFilter, filterSettings, setFilterSettings}) => {

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  return(
    <div className="search-container">
      <div type='text' className="search-bar">
        <FaSearch className="search-glass"/>
        <input 
          type='text' 
          name="searchQuery" 
          placeholder='Name or Email' 
          className="search-input"
          defaultValue={filter} 
          onChange={handleFilter}
        />
      </div>
      <FaCog className="search-gear"/>
    </div>
  )
}

export default SearchBar;