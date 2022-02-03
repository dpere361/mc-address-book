import React, {useState, useEffect} from 'react';
import './../assets/styles/CreateContactDialogue.css';
import {API_KEY} from '../variables'; // Make an ENV variable
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const FIELDS = ['firstName', 'lastName', 'phone', 'email', 'address', 'address2','city', 'state', 'zipCode']

// Component for create contact button + modal
const CreateContactDialogue = ({getContactList}) => {

  // Seperate states would cause less rerendering
  const [firstName, setFirstName] = useState('firstName');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  // Having all fields in one state object is easier to loop through
  const [newContact, setNewContact] = useState({})

  const [show, setShow] = useState(false); // modal status
  const [submitted, setSubmitted] = useState(false);

  useEffect(()=>{
    console.log(newContact.firstName)
  }, [newContact])

  // closes modal and resets contact
  const handleClose = () => {
    setNewContact({});
    setShow(false);
    setTimeout(()=> {setSubmitted(false)}, 500); // stops info from changing before closing animation finishes
  }

  const handleShow = () => {
    setShow(true);
  }

  const createContact = () => {
    fetch(`https://front-end.oudemo.com/api/address/new`, {
      method: 'POST',
      body: JSON.stringify({
        apikey: API_KEY,
        ...newContact
      })
    })
    .then(res => res.json())
    .then(data => {console.log(data); getContactList(); setSubmitted(true)})
    .catch(err => console.log(err))
  }

  // Formats sortField string into a proper title
  const parseFieldName = (field) => {
    if(field){
      let parsedField = (field + '').charAt(0).toUpperCase() + field.slice(1) // Capitalize first letter
      return parsedField = parsedField.split(/(?=[A-Z])/).join(' ') // Split string at capitals
    }
  }

  return(<>
    <div className='sort-arrow' onClick={handleShow}><FaPlus/></div>
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create a New Contact</Modal.Title>
      </Modal.Header>
      {submitted 
      ?(<>
          <Modal.Body>
          <p style={{fontWeight:'500'}}>Contact has been created</p>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Okay
          </Button>
          </Modal.Footer>
        </>)
      :(<>
          <Modal.Body>
          <Form id='requestForm'>
            {FIELDS.map((field, i)=>(
              <Form.Group>
                <Form.Control 
                  defaultValue={newContact[field]} 
                  className ='' 
                  placeholder={parseFieldName(field)} 
                  onChange={(e) => setNewContact({...newContact, [field]: e.target.value})}
                />
              </Form.Group>
            ))}
          </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" className='' type='submit' onClick={function () {createContact();}}>Create</Button>
          </Modal.Footer>
        </>)
      }
    </Modal>
  </>)
}

export default CreateContactDialogue