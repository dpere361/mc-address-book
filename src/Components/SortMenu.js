import React, {useEffect, useState} from 'react';
import './../assets/styles/SortMenu.css';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

// Sort Menu component which contains the sort heading, dropdown menu, and sort direction arrow
const SortMenu = ({sortField, setSortField, sortAscending, setSortAscending}) => {

  // checks if value is the currently selected sortField
  const isChecked = (value) => {
    return(value === sortField)
  }

  // Formats sortField string into a proper title
  const parseSortField = () => {
    let parsedField = (sortField + '').charAt(0).toUpperCase() + sortField.slice(1) // Capitalize first letter
    return parsedField = parsedField.split(/(?=[A-Z])/).join(' ') // Split string at capitals
  }

  return(
    <div className="sort-container">
      <p className="sort-heading">Sort By: </p>
      <div className='sort-menu-container'>
        <div className='sort-link'>{parseSortField()}</div>
        <div className='sort-menu'> {/*clean this, put it in a loop*/}
          <div className='sort-option' onClick={() => setSortField('firstName')}>
            <input className='sort-option-radio' type="radio" id="firstName" name="sortField" value="firstName" checked={isChecked('firstName')} readOnly/>
            <label className='sort-option-label' htmlFor="firstName">First Name</label>
          </div>
          <div className='sort-option' onClick={() => setSortField('lastName')}>
            <input className='sort-option-radio' type="radio" id="lastName" name="sortField" value="lastName" checked={isChecked('lastName')} readOnly/>
            <label className='sort-option-label' htmlFor="lastName">Last Name</label>
          </div>
          <div className='sort-option' onClick={() => setSortField('email')}>
            <input className='sort-option-radio' type="radio" id="email" name="sortField" value="email" checked={isChecked('email')} readOnly/>
            <label className='sort-option-label' htmlFor="email">Email</label>
          </div>
          
        </div>
      </div>
      <div className='sort-arrow' onClick={()=>{setSortAscending(!sortAscending)}}>{sortAscending? <FaChevronUp/>:<FaChevronDown/>}</div>
    </div>
  )
}

export default SortMenu;