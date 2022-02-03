import React from 'react'
import './../assets/styles/SearchBar.css'
import { FaSearch, FaCog } from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup';
import { parseString } from '../utils/utility';

const settingsOrder = ['firstName', 'lastName', 'email', 'phone', 'address', 'address2', 'city', 'state', 'zipcode']

// Searchbar component
const SearchBar = ({filter, setFilter, filterSettings, setFilterSettings}) => {

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const handleSearchSettings = (e) => {
    if(e.target.checked){
      setFilterSettings([...filterSettings, e.target.value])
    }
      
    else{
      setFilterSettings(filterSettings.filter((element) => element !== e.target.value))
    }
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
      <div className='search-menu-container'>
        <div className="search-gear">
          <FaCog />
        </div>
        <div className='search-menu'>
          <label style={{padding: '3px'}} className='search-option-label'>Search By:</label>
          {settingsOrder.slice().map((settingLabel, i)=>(
            <div key={`${i}-setting-${settingLabel}`} className='search-option'>
              <InputGroup.Checkbox 
                className='contact-checkbox' 
                id={settingLabel} 
                onClick={handleSearchSettings} 
                defaultValue={settingLabel} 
                checked={filterSettings.includes(settingLabel)} 
                readOnly
              />
              <label className='search-option-label' htmlFor={settingLabel}>{parseString(settingLabel)}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBar;