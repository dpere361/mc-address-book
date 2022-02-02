import React, {useEffect, useState} from 'react';
import './../Assets/Styles/ContactEntry.css';
import pfp from './../Assets/generic-avatar-1.jpg';

const ContactEntry = ({contact, isSelected, setSelectedContact}) => {

  return(
    <div onClick={()=>{setSelectedContact(contact)}} className={`entry-container ${isSelected && 'selected-contact'}`}>
      <div className='entry-letter'>{contact.firstName.slice(0,1).toUpperCase()}</div>
      <img className='entry-picture' src={pfp} alt='profile'/>
      <div style={{display:'flex', flexDirection:'column', textAlign: 'left'}}>
        <div className='entry-name'>{contact.firstName} {contact.lastName}</div>
        <div className='entry-info'>{contact.email}</div>
        <div className='entry-info'>{contact.phone}</div>
      </div>
    </div>
    
  )
}

export default ContactEntry