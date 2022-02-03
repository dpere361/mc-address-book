import React, {useEffect, useState} from 'react';
import './../assets/styles/ContactEntry.css';
import pfp from './../assets/generic-avatar-1.jpg';
import InputGroup from 'react-bootstrap/InputGroup';

const ContactEntry = ({contact, selectedContact, setSelectedContact, isFirst, deleting, setDeleteList, deleteList, sortField}) => {

  // Works only if both pointers point to the same object (Does not compare the actual objects)
  const isSelected = (contact) => {
    return (contact === selectedContact); 
  }

  const toDelete = (e) => {
    if(e.target.checked)
      setDeleteList([...deleteList, contact.id])
    else{
      setDeleteList(deleteList.filter((element) => element !== contact.id))
    }
  }

  return(
    <>
      {isFirst
        ? <div className='entry-separator'/>
        : null
      }
      <div onClick={()=>{setSelectedContact(contact)}} className={`entry-container ${isSelected(contact) && 'selected-contact'} ${isFirst && 'first-separator'}`}>
        {deleting
        ? <InputGroup.Checkbox className='contact-checkbox' onClick={toDelete} />
        : (isFirst
          ? <div className='entry-letter'>{contact[sortField]?.slice(0,1).toUpperCase()}</div>
          : <div className='entry-letter'></div>
          )
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