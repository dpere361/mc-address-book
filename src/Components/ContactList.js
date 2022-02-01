import React, {useState, useEffect} from 'react'
import './../Assets/Styles/ContactList.css'
import {API_KEY} from '../variables'

const mock_list = [{name: 'person'}, {name: 'person2'}, {name: 'person3'}]



// Component for the entire list of contacts
const ContactList = () => {
  const [contactList, setContactList] = useState([]);

  // Hook for onComponentMount
  useEffect(() => {
    getContactList()
  }, [])

  // CLEAN THIS
  const getContactList = () => {
    fetch(`https://front-end.oudemo.com/api/address/list?apikey=${API_KEY}`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  return(
    <div className="list-container">
      <input style={{height: '35px', fontSize: '20px'}} type='button' value="Print" onClick={() => {console.log(contactList)}}/>
      {mock_list.map((contact, i) => {
        return(
          <>
            <p key={i + 'listitem'}>{i+1}. {contact.name}</p>
          </>
        )
      })}
    </div>
  )
}

export default ContactList;