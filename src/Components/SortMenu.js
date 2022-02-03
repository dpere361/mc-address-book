import React from 'react';
import './../Assets/Styles/SortMenu.css';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { parseString } from '../utils/utility';

const SORT_FIELDS = ['firstName', 'lastName', 'email']

// Sort Menu component which contains the sort heading, dropdown menu, and sort direction arrow
const SortMenu = ({sortField, setSortField, sortAscending, setSortAscending}) => {

  // checks if value is the currently selected sortField
  const isChecked = (value) => {
    return(value === sortField)
  }

  return(
    <div className="sort-container">
      <p className="sort-heading">Sort By: </p>
      <div className='sort-menu-container'>
        <div className='sort-link'>{parseString(sortField)}</div>
        <div className='sort-menu'>
          {SORT_FIELDS.map((fieldLabel, i)=>
            <div key={`${i}-sort-${fieldLabel}`} className='sort-option' onClick={() => setSortField(fieldLabel)}>
              <input className='sort-option-radio' type="radio" id={fieldLabel} name="sortField" value={fieldLabel} checked={isChecked(fieldLabel)} readOnly/>
              <label className='sort-option-label' htmlFor={fieldLabel}>{parseString(fieldLabel)}</label>
            </div>
          )}
        </div>
      </div>
      <div className='sort-arrow' onClick={()=>{setSortAscending(!sortAscending)}}>{sortAscending? <FaChevronUp/>:<FaChevronDown/>}</div>
    </div>
  )
}

export default SortMenu;