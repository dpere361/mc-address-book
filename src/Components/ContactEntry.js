import React from 'react';
import './../Assets/Styles/ContactEntry.css';
import pfp from './../Assets/generic-avatar-1.jpg';
import InputGroup from 'react-bootstrap/InputGroup';
import { formatPhone, hashString } from '../utils/utility';

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
        <img className='entry-picture' src={contact.email?`https://www.gravatar.com/avatar/${hashString(contact.email)}?s=50&r=pg&d=robohash`:pfp} alt='profile'/>
        <div className='entry-info-box'>
          <div className='entry-name'>{contact.firstName} {contact.lastName}</div>
          <div className='entry-info'>{contact.email}</div>
          <div className='entry-info'>{formatPhone(contact.phone)}</div>
        </div>
      </div>
    </>
  )
}

export default ContactEntry