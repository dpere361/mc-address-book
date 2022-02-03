import React, {useState, useEffect} from 'react';
import './../Assets/Styles/CreateContactDialogue.css';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { parseString } from '../utils/utility';

const FIELDS = ['firstName', 'lastName', 'phone', 'email', 'address', 'address2','city', 'state', 'zipcode']

// Component for create contact button + modal
const CreateContactDialogue = ({getContactList}) => {

  // Having all fields in one state object is easier to loop through
  const [newContact, setNewContact] = useState({})

  const [show, setShow] = useState(false); // modal status
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({emailError: false, phoneError: false})

  useEffect(()=>{
    setErrors({...errors, phoneError: false})
  },[newContact.phone])

  useEffect(()=>{
    setErrors({...errors, emailError: false})
  },[newContact.email])

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
    if(validateForm()){
      fetch(`https://front-end.oudemo.com/api/address/new`, {
        method: 'POST',
        body: JSON.stringify({
          apikey: process.env.REACT_APP_API_KEY,
          ...newContact
        })
      })
      .then(res => res.json())
      .then(data => {console.log(data); getContactList(); setSubmitted(true)})
      .catch(err => console.log(err))
    }
  }

  // Method to validate phone and email using regular expressions
  const validateForm = () => {
    
    let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneValidation = /^(\+0?1\s)?\(?\d{3}\)?[\s.]\d{3}[\s.]\d{4}$/;
    
    // Long boolean tests that returns true if the field is undefined, and empty string, or if the string(length>0) passes the regex test
    let isValidEmail = (newContact.email && emailValidation.test(newContact.email));
    let isValidPhone = (newContact.phone && phoneValidation.test(newContact.phone));
    setErrors({phoneError: !isValidPhone, emailError: !isValidEmail});
    return (isValidEmail && isValidPhone);
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
              <Form.Group key={`${i}-${field}-form`}>
                <Form.Control 
                  defaultValue={newContact[field]} 
                  className ='' 
                  placeholder={parseString(field)} 
                  onChange={(e) => setNewContact({...newContact, [field]: e.target.value})}
                />
                {(field === 'email' && errors.emailError) || (field === 'phone' && errors.phoneError) 
                ? <div className='error'>
                    {field === 'email'
                    ? 'Not a valid email (e.g. user@domain.com)' 
                    : 'Not a valid phone (e.g. 333.444.5555 or 333 444 5555)'
                    }
                  </div> 
                : null
                }
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