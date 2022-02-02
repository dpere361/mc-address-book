import React, {useEffect, useState} from 'react';
import './../assets/styles/ContactEntry.css';
import pfp from './../assets/generic-avatar-1.jpg';

const ContactEntry = ({contact, isSelected, setSelectedContact, isFirst}) => {

  return(
    <>
      {isFirst
        ? <div className='entry-separator'/>
        : null
      }
      <div onClick={()=>{setSelectedContact(contact)}} className={`entry-container ${isSelected && 'selected-contact'} ${isFirst && 'first-separator'}`}>
        {isFirst
        ? <div className='entry-letter'>{contact.firstName.slice(0,1).toUpperCase()}</div>
        : <div className='entry-letter'></div>
        }
        <img className='entry-picture' src={pfp} alt='profile'/>
        <div style={{display:'flex', flexDirection:'column', textAlign: 'left'}}>
          <div className='entry-name'>{contact.firstName} {contact.lastName}</div>
          <div className='entry-info'>{contact.email}</div>
          <div className='entry-info'>{contact.phone}</div>
        </div>
      </div>
    </>
  )
}

export default ContactEntry