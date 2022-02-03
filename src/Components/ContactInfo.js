import React from 'react'
import './../Assets/Styles/ContactInfo.css'
import pfp from './../Assets/generic-avatar-1.jpg';
import EditMenu from './EditMenu'
import { formatPhone, hashString } from '../utils/utility';

const ContactInfo = ({selectedContact, getContactList}) => {

  return(
    <div className="info-container">
      {Object.keys(selectedContact).length !== 0
      ? <>
          <EditMenu selectedContact={selectedContact} getContactList={getContactList}/>
          <img className='info-picture' src={selectedContact.email?`https://www.gravatar.com/avatar/${hashString(selectedContact.email)}?s=200&r=pg&d=robohash`: pfp} alt='profile'/>
          <h1 className='info-name'>{selectedContact.firstName} {selectedContact.lastName}</h1>
          <div className='sub-info-container'>
            <div className='sub-info-row'>
              <div className='info-labels'>
                <h3 className='sub-info-label'>Phone</h3>
                <div className='sub-info-separator-labels'></div>
                <h3 className='sub-info-label'>Email</h3>
                <div className='sub-info-separator-labels'></div>
                <h3 className='sub-info-label'>Address</h3>
              </div>
              <div className='info-data'>
                {selectedContact.phone ? <h3 className='sub-info'>{formatPhone(selectedContact.phone)}</h3> : <h3 className='empty-info'>N/A</h3>}
                <div className='sub-info-separator-data'></div>
                {selectedContact.email ? <h3 className='sub-info'>{selectedContact.email}</h3> : <h3 className='empty-info'>N/A</h3>} 
                <div className='sub-info-separator-data'></div>
                {selectedContact.address 
                  ? <h3 style={{marginTop: '10px'}} className='address-info'>{selectedContact.address}</h3> 
                  : <h3 style={{marginTop: '10px'}} className='empty-address'>N/A</h3>
                }
                {selectedContact.address2 
                  ? <h3 className='address-info'>{selectedContact.address2}</h3> 
                  : <h3 className='empty-address'>N/A</h3>
                }
                {selectedContact.city 
                  ? <h3 className='address-info'>{selectedContact.city}</h3> 
                  : <h3 className='empty-address'>N/A</h3>
                }
                {selectedContact.state 
                  ? <h3 className='address-info'>{selectedContact.state}</h3> 
                  : <h3 className='empty-address'>N/A</h3>
                }
                {selectedContact.zipcode 
                  ? <h3 className='address-info'>{selectedContact.zipcode}</h3> 
                  : <h3 className='empty-address'>N/A</h3>
                }
              </div>
            </div>
          </div>
        </>
      : <p style={{fontSize:'20px'}}>No contact selected</p>
      }
    </div>
  )
} 

export default ContactInfo