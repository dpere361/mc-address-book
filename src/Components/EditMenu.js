import React, {useState, useEffect} from 'react';
import { FaEdit } from 'react-icons/fa';
import './../Assets/Styles/EditMenu.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { parseString } from '../utils/utility';

const FIELDS = ['firstName', 'lastName', 'phone', 'email', 'address', 'address2','city', 'state', 'zipcode']

const EditMenu = ({selectedContact, getContactList}) =>{
  const [show, setShow] = useState(false); // modal status
  const [submitted, setSubmitted] = useState(false);
  const [editContact, setEditContact] = useState({...selectedContact}) // Having all fields in one state object is easier to loop through
  const [errors, setErrors] = useState({emailError: false, phoneError: false})

  useEffect(()=>{
    setEditContact({...selectedContact})
  },[selectedContact])

  useEffect(()=>{
    setErrors({...errors, phoneError: false})
  },[editContact.phone])

  useEffect(()=>{
    setErrors({...errors, emailError: false})
  },[editContact.email])

  const handleShow = () => {
    setShow(true);
  }

  // closes modal and resets contact
  const handleClose = () => {
    setEditContact({...selectedContact});
    setShow(false);
    setTimeout(()=> {setSubmitted(false)}, 500); // stops info from changing before closing animation finishes
  }

  // Method to validate phone and email using regular expressions
  const validateForm = () => {
    let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneValidation = /^(\+0?1\s)?\(?\d{3}\)?[\s.]\d{3}[\s.]\d{4}$/;

    // Long boolean tests that returns true if the string(length>0) passes the regex test 
    let isValidEmail = (editContact.email && emailValidation.test(editContact.email));
    let isValidPhone = (editContact.phone && phoneValidation.test(editContact.phone));
    setErrors({phoneError: !isValidPhone, emailError: !isValidEmail});
    return (isValidEmail && isValidPhone);
  }

  const submitEdits = () => {
    if(validateForm(editContact.email, editContact.phone)){
      fetch(`https://front-end.oudemo.com/api/address/update`, {
        method: 'POST',
        body: JSON.stringify({
          apikey: process.env.REACT_APP_API_KEY,
          id: selectedContact.id,
          ...editContact
        })
      })
      .then(res => res.json())
      .then(data => {console.log(data); getContactList(); setSubmitted(true)})
      .catch(err => console.log(err))
    }
  }

  return(
    <>
    <div className='edit-button' onClick={handleShow}><FaEdit/></div>
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      {submitted 
      ?(<>
          <Modal.Body>
          <p style={{fontWeight:'500'}}>Contact has been edited</p>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Okay
          </Button>
          </Modal.Footer>
        </>)
      :(<>
          <Modal.Body>
          <Form id='editForm'>
            {FIELDS.map((field, i)=>(
              <Form.Group key={`${i}-${field}-form-edit`}>
                <Form.Control 
                  defaultValue={editContact[field]} 
                  className ='' 
                  placeholder={parseString(field)} 
                  onChange={(e) => setEditContact({...editContact, [field]: e.target.value})}
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
          <Button variant="primary" className='' type='submit' onClick={function () {submitEdits();}}>Submit</Button>
          </Modal.Footer>
        </>)
      }
    </Modal>
    </>
  )
}

export default EditMenu