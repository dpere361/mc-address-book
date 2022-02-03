import React from 'react';
import './../assets/styles/DeleteButton.css';
import { FaTrash } from 'react-icons/fa'
import {API_KEY} from '../variables' // Make an ENV variable

const DeleteButton = ({deleting, setDeleting, deleteList, setDeleteList, getContactList}) => {

  const confirmDelete = () => {
    deleteList.map((deleteId)=>{
      fetch(`https://front-end.oudemo.com/api/address/delete`, {
        method: 'POST',
        body: JSON.stringify({
          apikey: API_KEY,
          id: deleteId
        })
      })
      .then(res => res.json())
      .then(data => {console.log(data); getContactList()})
      .catch(err => console.log(err))
    })
  }

  const cancelDelete = () => {
    setDeleting(false);
    setDeleteList([]);
  }

  return(
    <>
      {deleting ? <div className='cancel-button' onClick={() => cancelDelete()}>Cancel</div> : null}
      <div 
        style={{marginRight: '25px'}} 
        className={`delete-icon ${deleting ? 'deleting' : ''}`} 
        onClick={()=>(deleting ? confirmDelete() : setDeleting(true))}
      ><FaTrash/></div>
    </>
  )
}

export default DeleteButton;